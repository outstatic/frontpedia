import { FEED_SORT } from "@/lib/feed-pagination";
import { getFeedQuery } from "@/lib/feed-query";
import { load } from "outstatic/server";

export const PUBLIC_COLLECTIONS = [
  "inspiration",
  "resources",
  "people",
] as const;

export type PublicCollection = (typeof PUBLIC_COLLECTIONS)[number];

export type PublicContentEntry = {
  author?: {
    name?: string;
  };
  collection: PublicCollection;
  coverImage?: string;
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
  videoCover?: string;
};

const PUBLIC_CONTENT_PROJECTION = [
  "author",
  "collection",
  "coverImage",
  "description",
  "publishedAt",
  "slug",
  "title",
  "videoCover",
] as const;

export const getPublicContentEntries = async (): Promise<PublicContentEntry[]> => {
  const db = await load();

  return (await db
    .find(getFeedQuery() as any)
    .project([...PUBLIC_CONTENT_PROJECTION])
    .sort(FEED_SORT)
    .toArray()) as PublicContentEntry[];
};
