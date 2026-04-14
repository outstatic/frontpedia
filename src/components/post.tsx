import { PostType } from "@/@types/post";
import { mdxComponents } from "@/components/mdx/mdx-component";
import { mdxOptions } from "@/lib/mdx-server";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { PostVideo } from "./post-video";
import { buttonVariants } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className="flex flex-col gap-6 md:gap-12">
      <div
        data-post-hero
        className="relative bg-slate-50 bg-cover bg-center aspect-video rounded-md md:rounded-2xl overflow-hidden border-2 border-slate-900 z-0"
        style={{
          viewTransitionName: "post-media",
          backgroundImage: post?.videoCover
            ? `url(${post.videoCover
              .replace("/upload", "/upload/c_fit,h_36,w_36")
              .replace("mp4", "jpg")})`
            : "",
        }}
      >
        {post?.videoCover ? (
          <PostVideo src={post.videoCover} />
        ) : (
          <Image
            className="object-cover aspect-video border"
            src={post.coverImage}
            alt={`Cover image of ${post.title}`}
            width={1600}
            height={900}
          />
        )}
        {post.websiteUrl ? (
          <Link
            href={`${post.websiteUrl}?ref=frontpedia.com`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${post.title}`}
          >
            <div
              className={buttonVariants({
                className:
                  "absolute bottom-2 right-2 md:hidden rounded-sm ring-2 ring-offset ring-white",
              })}
            >
              <ArrowUpRight aria-hidden="true" />
            </div>
            <span className="text-lg mr-2 font-bold text-zinc-700 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:w-full before:h-full" />
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 md:gap-12">
        <div className="flex justify-between items-start border-b">
          <div>
            <h1 className="font-serif text-2xl font-bold md:text-4xl mb-2">
              {post.title}
            </h1>
            <div className="hidden md:block md:mb-6 text-slate-600">
              Written on <DateFormatter dateString={post.publishedAt} /> by{" "}
              {post?.author?.name || ""}
            </div>
          </div>
          {post.websiteUrl ? (
            <div className="hidden lg:block">
              <Link
                href={`${post.websiteUrl}?ref=frontpedia.com`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants()}
              >
                Visit site
              </Link>
            </div>
          ) : null}
        </div>
        <div className="max-w-2xl mx-auto w-full">
          {post?.content ? (
            <div className="prose md:prose-md lg:prose-xl max-w-full">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={mdxOptions}
              />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};
