import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "../../env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export const submitPost = async (request: Request) => {
  const { values, token } = await request.json();

  if (!values?.postType || !token) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const fromEmail = env.FROM_EMAIL;
  const ownerEmail = env.OWNER_EMAIL;

  if (!fromEmail || !ownerEmail) {
    return NextResponse.json(
      { error: "Submit content is not configured." },
      { status: 503 }
    );
  }

  try {
    return fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${token || ""}`,
    })
      .then((reCaptchaRes) => reCaptchaRes.json())
      .then(async (reCaptchaRes) => {
        if (reCaptchaRes?.score > 0.5) {
          const rows: Record<string, string> = {
            date: new Date().toLocaleString().replace(",", ""),
          };

          Object.keys(values).forEach((key) => {
            if (values[key] && key !== "postType") {
              rows[key] = values[key];
            }
          });

          const details = Object.entries(rows)
            .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
            .join("");

          await resend.emails.send({
            from: fromEmail,
            to: ownerEmail,
            subject: `New submission: ${values.postType}`,
            html: `<h2>New ${values.postType} submission</h2><ul>${details}</ul>`,
          });

          return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ error: "Captcha failed." }, { status: 400 });
      });
  } catch (error) {
    return NextResponse.json(
      { error: "Error submitting your request. Please, try again later." },
      { status: 500 }
    );
  }
};
