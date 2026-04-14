"use client";
import { PostType } from "@/@types/post";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { FeedPageResponse } from "@/lib/feed-pagination";
import { useNavigateWithTransition } from "@/lib/providers/view-transition";
import DateFormatter from "./date-formatter";
import Loading from "./loading";
import Thumbnail from "./thumbnail";

type FeedProps = {
  title?: string;
  initialPosts: PostType[];
  initialCursor: string | null;
  initialHasMore: boolean;
  slug?: string;
  publishedBefore?: string;
};

export const Feed = ({
  title,
  initialPosts,
  initialCursor,
  initialHasMore,
  slug = "",
  publishedBefore,
}: FeedProps) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const cursorRef = useRef<string | null>(initialCursor);
  const isFetchingRef = useRef(false);

  const navigate = useNavigateWithTransition();
  const lastClickedRef = useRef<HTMLElement | null>(null);

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, post: PostType) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      e.stopPropagation();

      if (lastClickedRef.current) {
        lastClickedRef.current.style.viewTransitionName = "";
      }
      const thumbnail = e.currentTarget.querySelector("[data-thumbnail]");
      if (thumbnail instanceof HTMLElement) {
        thumbnail.style.viewTransitionName = "post-media";
        lastClickedRef.current = thumbnail;
      }

      const video = e.currentTarget.querySelector("video");
      if (video) {
        sessionStorage.setItem("vt-video-time", String(video.currentTime));
        video.pause();
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            sessionStorage.setItem(
              "vt-video-frame",
              canvas.toDataURL("image/jpeg", 0.7),
            );
          }
        } catch {
          sessionStorage.removeItem("vt-video-frame");
        }
      } else {
        sessionStorage.removeItem("vt-video-time");
        sessionStorage.removeItem("vt-video-frame");
      }

      navigate(`/${post.collection}/${post.slug}`);
    },
    [navigate],
  );

  const fetchPosts = async () => {
    const cursor = cursorRef.current;

    if (!hasMore || isFetchingRef.current || !cursor) {
      return;
    }

    isFetchingRef.current = true;

    try {
      const params = new URLSearchParams();

      if (slug) {
        params.set("slug", slug);
      }

      if (publishedBefore) {
        params.set("publishedBefore", publishedBefore);
      }

      params.set("cursor", cursor);

      const response = await fetch(`/api/pagination?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Pagination request failed with ${response.status}`);
      }

      const data = (await response.json()) as FeedPageResponse;

      if (data.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      }

      cursorRef.current = data.nextCursor;
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to fetch more posts", error);
      setHasMore(false);
      cursorRef.current = null;
    } finally {
      isFetchingRef.current = false;
    }
  };

  return (
    <section aria-labelledby={title ? "feed-heading" : "feed-heading-default"}>
      {title ? (
        <h2
          id="feed-heading"
          className="mb-8 text-2xl font-serif text-center bg-linear-to-tr from-primary via-zinc-950 to-stone-500 bg-clip-text w-max mx-auto text-transparent md:text-4xl leading-normal"
        >
          {title}
        </h2>
      ) : (
        <h2 id="feed-heading-default" className="sr-only">
          Latest Frontpedia entries
        </h2>
      )}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <div className="animate-pulse rounded-md bg-muted border-2 border-slate-500 aspect-video flex items-center justify-center">
            <Loading className="text-primary" />
          </div>
        }
        endMessage={
          <div className="rounded-md bg-muted border-2 border-slate-500 aspect-video flex items-center justify-center">
            The End
          </div>
        }
        style={{ overflow: "initial" }}
        className="w-full mx-auto grid gap-x-8 gap-y-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        {posts.map((post) => {
          const postHref = `/${post.collection}/${post.slug}`;
          const postTitleId = `post-title-${post.collection}-${post.slug}`;

          return (
            <article
              key={`${post.collection}-${post.slug}`}
              className="relative w-full lg:w-full group flex flex-col gap-4 cursor-pointer"
              onClickCapture={(e) => handleCardClick(e, post)}
            >
              <Link
                href={postHref}
                className="block"
                aria-labelledby={postTitleId}
              >
                <Thumbnail post={post} />
              </Link>
              <div className="space-x-2 flex">
                <h3
                  id={postTitleId}
                  className="text-lg font-bold text-zinc-700 text-balance"
                >
                  <Link
                    href={postHref}
                    className="transition-colors hover:text-zinc-900"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/60">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 font-bold capitalize text-gray-700">
                    {post.collection}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </InfiniteScroll>
    </section>
  );
};
