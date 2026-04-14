export type PostType = {
  collection: string;
  slug: string;
  title: string;
  coverImage: string;
  description: string;
  content?: string;
  websiteUrl: string;
  author?: {
    name: string;
  };
  publishedAt: string;
  videoCover?: string;
};
