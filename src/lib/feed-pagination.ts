import { PostType } from "@/@types/post";
import { getFeedQueryFilters } from "./feed-query";

type FeedCursor = {
  publishedAt: PostType["publishedAt"];
  slug: PostType["slug"];
};

export type FeedPageResponse = {
  posts: PostType[];
  nextCursor: string | null;
  hasMore: boolean;
};

type FeedQueryOptions = {
  cursor?: FeedCursor | null;
  excludeSlug?: string;
  publishedBefore?: string;
};

type FeedPageOptions = {
  cursor?: string | null;
  excludeSlug?: string;
  publishedBefore?: string;
};

export const FEED_PAGE_SIZE = 18;

export const FEED_SORT = {
  publishedAt: -1,
  slug: 1,
} as const;

export const FEED_PROJECTION: string[] = [
  "collection",
  "title",
  "slug",
  "coverImage",
  "description",
  "publishedAt",
  "videoCover",
];

const getFeedCursor = (
  post?: Pick<PostType, "publishedAt" | "slug"> | null,
): FeedCursor | null => {
  if (!post) {
    return null;
  }

  return {
    publishedAt: post.publishedAt,
    slug: post.slug,
  };
};

export const encodeFeedCursor = (
  post?: Pick<PostType, "publishedAt" | "slug"> | null,
): string | null => {
  const cursor = getFeedCursor(post);

  if (!cursor) {
    return null;
  }

  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
};

const decodeFeedCursor = (cursor?: string | null): FeedCursor | null => {
  if (!cursor) {
    return null;
  }

  try {
    const decodedCursor = JSON.parse(
      Buffer.from(cursor, "base64url").toString("utf8"),
    ) as Partial<FeedCursor>;

    if (
      typeof decodedCursor?.publishedAt !== "string" ||
      typeof decodedCursor?.slug !== "string"
    ) {
      return null;
    }

    return {
      publishedAt: decodedCursor.publishedAt,
      slug: decodedCursor.slug,
    };
  } catch {
    return null;
  }
};

export const buildFeedQuery = ({
  cursor,
  excludeSlug,
  publishedBefore,
}: FeedQueryOptions = {}) => {
  const queryFilters: Record<string, unknown>[] = [...getFeedQueryFilters()];

  if (excludeSlug) {
    queryFilters.push({ slug: { $ne: excludeSlug } });
  }

  if (publishedBefore) {
    queryFilters.push({ publishedAt: { $lt: publishedBefore } });
  }

  if (cursor) {
    queryFilters.push({
      $or: [
        { publishedAt: { $lt: cursor.publishedAt } },
        { publishedAt: cursor.publishedAt, slug: { $gt: cursor.slug } },
      ],
    });
  }

  return { $and: queryFilters };
};

export const getFeedPage = async (
  db: {
    find: (query: Record<string, unknown>) => {
      project: (projection: string[]) => {
        sort: (sort: typeof FEED_SORT) => {
          limit: (limit: number) => {
            toArray: () => Promise<unknown[]>;
          };
        };
      };
    };
  },
  { cursor, excludeSlug, publishedBefore }: FeedPageOptions = {},
): Promise<FeedPageResponse> => {
  const content = (await db
    .find(
      buildFeedQuery({
        cursor: decodeFeedCursor(cursor),
        excludeSlug,
        publishedBefore,
      }),
    )
    .project(FEED_PROJECTION)
    .sort(FEED_SORT)
    .limit(FEED_PAGE_SIZE + 1)
    .toArray()) as PostType[];

  const posts = content.slice(0, FEED_PAGE_SIZE);
  const hasMore = content.length > FEED_PAGE_SIZE;

  return {
    posts,
    nextCursor: hasMore ? encodeFeedCursor(posts[posts.length - 1]) : null,
    hasMore,
  };
};
