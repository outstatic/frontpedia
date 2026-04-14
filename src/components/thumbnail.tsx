"use client";

import { PostType } from "@/@types/post";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import Image from "next/image";
import { useState } from "react";
import Loading from "./loading";

type ThumbnailProps = {
  post: PostType;
};

const Thumbnail = ({ post }: ThumbnailProps) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoImage =
    post?.videoCover
      ?.replace("/upload/", "/upload/c_fit,h_2,w_2/")
      ?.replace(".mp4", ".jpg") || "/images/placeholder.png";

  const handleLoad = () => {
    setLoading(false);
    setVideoLoaded(true);
  };

  return (
    <div
      ref={ref}
      data-thumbnail
      className="relative aspect-video bg-slate-200 rounded-md border-2 border-slate-900 transition-all duration-300 ease-out overflow-hidden hover:scale-[1.025]"
    >
      {loading ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Loading />
        </div>
      ) : null}
      {post?.videoCover && (isIntersecting || videoLoaded) ? (
        <>
          <video
            src={post.videoCover.replace(
              "/upload/",
              "/upload/c_fit,h_720,w_720/"
            )}
            poster={videoImage}
            className="object-cover aspect-video w-full"
            crossOrigin="anonymous"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleLoad}
          />
        </>
      ) : (
        <Image
          src={post?.coverImage || videoImage}
          alt={`Preview of ${post.title}`}
          className="object-cover aspect-video"
          width={1600}
          height={900}
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
  );
};

export default Thumbnail;
