import { MetadataRoute } from "next";
import { getPublicContentEntries } from "@/lib/content";
import { getSeoImageUrl } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getPublicContentEntries();
  const latestPublishedAt = entries[0]?.publishedAt ?? new Date().toISOString();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPublishedAt,
      changeFrequency: "daily",
      priority: 1,
      images: [getSeoImageUrl()],
    },
    ...entries.map((entry) => ({
      url: absoluteUrl(`/${entry.collection}/${entry.slug}`),
      lastModified: entry.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [getSeoImageUrl(entry)],
    })),
  ];
}
