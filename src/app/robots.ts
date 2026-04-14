import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getSiteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/outstatic/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteOrigin(),
  };
}
