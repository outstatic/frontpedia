import { PostType } from "@/@types/post";
import { Feed } from "@/components/feed";
import { FloatingMenu } from "@/components/floating-menu";
import { Post } from "@/components/post";
import { siteConfig } from "@/config/site";
import { getPublicContentEntries } from "@/lib/content";
import {
  getFeedPage,
} from "@/lib/feed-pagination";
import { getSeoImageUrl } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDocumentBySlug, load } from "outstatic/server";

export const revalidate = 86400; // 24 hours

type SlugPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length !== 2) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const post = getDocumentBySlug(slug[0], slug[1], [
    "title",
    "slug",
    "description",
    "coverImage",
    "videoCover",
    "author",
    "publishedAt",
  ]) as unknown as PostType;

  if (!post) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${slug[0]}/${post.slug}`;
  const socialImageUrl = getSeoImageUrl(post);

  return {
    title: post.title,
    description: post.description || siteConfig.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${post.title} | Frontpedia`,
      description: post.description || siteConfig.description,
      type: "article",
      url: absoluteUrl(canonicalPath),
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: slug[0],
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} | Frontpedia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Frontpedia`,
      description: post.description || siteConfig.description,
      images: [socialImageUrl],
      creator: siteConfig.creator.handle,
    },
  };
}

export async function generateStaticParams() {
  const paths = await getPublicContentEntries();

  return paths.map((path) => ({
    slug: [path.collection, path.slug],
  }));
}

export default async function SinglePage({ params }: SlugPageProps) {
  const { slug } = await params;
  if (!slug || slug.length !== 2) notFound();

  const db = await load();
  const post = getDocumentBySlug(slug[0], slug[1], [
    "title",
    "slug",
    "coverImage",
    "description",
    "websiteUrl",
    "author",
    "publishedAt",
    "videoCover",
    "content",
  ]) as unknown as PostType;
  if (!post) notFound();

  const relatedFeedPage = await getFeedPage(db, {
    excludeSlug: post.slug,
    publishedBefore: post.publishedAt,
  });
  const isFallbackToAllFeed = relatedFeedPage.posts.length === 0;
  const feedPage = isFallbackToAllFeed
    ? await getFeedPage(db, {
      excludeSlug: post.slug,
    })
    : relatedFeedPage;
  const posts = feedPage.posts;

  return (
    <>
      <div className="container max-w-5xl space-y-6 md:space-y-24 pb-16 relative mx-auto">
        <section className="">
          <Post post={post} />
        </section>
      </div>
      <div className="container mx-auto pb-16">
        {posts.length > 0 ? (
          <Feed
            title="You might also like"
            initialPosts={posts}
            initialCursor={feedPage.nextCursor}
            initialHasMore={feedPage.hasMore}
            slug={post.slug}
            publishedBefore={
              isFallbackToAllFeed ? undefined : post.publishedAt
            }
          />
        ) : null}
      </div>
      <FloatingMenu url={post.websiteUrl} />
    </>
  );
}
