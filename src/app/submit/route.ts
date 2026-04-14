import { isSubmitContentEnabled } from "@/config/site";
import { submitPost } from "@/lib/submit-post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isSubmitContentEnabled) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return await submitPost(request);
}
