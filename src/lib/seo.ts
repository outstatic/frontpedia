import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

const getCloudinaryPoster = (videoUrl: string) =>
  videoUrl
    .replace("/upload", "/upload/c_fit,h_630,w_1200")
    .replace(/\.mp4(\?.*)?$/i, ".jpg$1");

export const getSiteOrigin = () => new URL(siteConfig.url).origin;

export const getSeoImageUrl = (
  post?: {
    coverImage?: string;
    videoCover?: string;
  } | null,
) => {
  if (post?.videoCover) {
    return getCloudinaryPoster(post.videoCover);
  }

  if (post?.coverImage) {
    return absoluteUrl(post.coverImage);
  }

  return absoluteUrl("/images/og-image.png");
};
