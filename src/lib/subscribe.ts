import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { env } from "../../env.mjs";
import { isEmailListEnabled } from "@/config/site";

export const subscribe = async (request: Request) => {
  if (!isEmailListEnabled) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (
    !env.RESEND_API_KEY
  ) {
    return NextResponse.json(
      { error: "Email list is not configured." },
      { status: 503 }
    );
  }

  if (!env.RESEND_SEGMENT_ID) {
    return NextResponse.json(
      { error: "Email list is not configured." },
      { status: 503 }
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const verification = await checkBotId();

  const { values } = await request.json();

  if (verification.isBot) {
    return NextResponse.json({ error: "Bot detected." }, { status: 403 });
  }

  if (!values.email || Object.keys(values).length > 1) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  try {
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
