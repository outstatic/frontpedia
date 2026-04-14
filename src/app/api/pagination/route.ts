import { NextResponse } from "next/server";
// Keep metadata in the module graph; production tracing is configured in next.config.mjs.
import "@/../outstatic/content/metadata.json";
import { FeedPageResponse, getFeedPage } from "@/lib/feed-pagination";
import { load } from "outstatic/server";

export const dynamic = "force-dynamic";

export const revalidate = 86400; // 24 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const cursor = searchParams.get("cursor");
  const publishedBefore = searchParams.get("publishedBefore") || undefined;
  const db = await load();

  const response = (await getFeedPage(db, {
    cursor,
    excludeSlug: slug,
    publishedBefore,
  })) as FeedPageResponse;

  return NextResponse.json(response);
}
