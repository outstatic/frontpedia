import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { env } from "../../env.mjs";

export const submitPost = async (request: Request) => {
  const verification = await checkBotId();
  const { values } = await request.json();

  if (verification.isBot) {
    return NextResponse.json({ error: "Bot detected." }, { status: 403 });
  }

  if (!values?.postType) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const fromEmail = env.FROM_EMAIL;
  const ownerEmail = env.OWNER_EMAIL;

  if (
    !fromEmail ||
    !ownerEmail ||
    !env.RESEND_API_KEY
  ) {
    return NextResponse.json(
      { error: "Submit content is not configured." },
      { status: 503 }
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Error submitting your request. Please, try again later." },
      { status: 500 }
    );
  }
};
