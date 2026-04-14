import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "../../env.mjs";
import { isEmailListEnabled } from "@/config/site";

const resend = new Resend(env.RESEND_API_KEY);

export const subscribe = async (request: Request) => {
  if (!isEmailListEnabled) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (!env.RESEND_SEGMENT_ID) {
    return NextResponse.json(
      { error: "Email list is not configured." },
      { status: 503 }
    );
  }

  const { values, token } = await request.json();

  if (!values.email || !token || Object.keys(values).length > 1) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    if (env.NODE_ENV === "production") {
      const reCaptchaRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${token || ""}`,
        }
      ).then((res) => res.json());

      if (!reCaptchaRes?.score || reCaptchaRes.score <= 0.5) {
        return NextResponse.json({ error: "Captcha failed." }, { status: 400 });
      }
    }

    const { data: contact, error: createError } =
      await resend.contacts.create({
        email: values.email,
      });

    if (createError || !contact) {
      throw new Error(createError?.message ?? "Failed to create contact");
    }

    const { error: segmentError } = await resend.contacts.segments.add({
      contactId: contact.id,
      segmentId: env.RESEND_SEGMENT_ID,
    });

    if (segmentError) {
      throw new Error(segmentError.message);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error submitting your request. Please, try again later." },
      { status: 500 }
    );
  }
};
