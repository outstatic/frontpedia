import { isEmailListEnabled } from "@/config/site";
import { subscribe } from "@/lib/subscribe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isEmailListEnabled) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return await subscribe(request);
}
