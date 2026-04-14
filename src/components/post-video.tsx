"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type PostVideoProps = {
  src: string;
};

export function PostVideo({ src }: PostVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);

  useLayoutEffect(() => {
    const frame = sessionStorage.getItem("vt-video-frame");
    if (frame) {
      setFrameUrl(frame);
      sessionStorage.removeItem("vt-video-frame");
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const storedTime = sessionStorage.getItem("vt-video-time");

    const activate = () => {
      if (cancelled) return;

      if (storedTime) {
        sessionStorage.removeItem("vt-video-time");
        video.currentTime = parseFloat(storedTime);
        video.addEventListener(
          "seeked",
          () => {
            if (cancelled) return;
            setReady(true);
            video.play().catch(() => { });
          },
          { once: true },
        );
      } else {
        setReady(true);
        video.play().catch(() => { });
      }
    };

    if (video.readyState >= 2) {
      activate();
    } else {
      video.addEventListener("loadeddata", activate, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className={`object-cover aspect-video w-full backdrop-blur-2xl transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={src.replace("/upload/", "/upload/c_fit,h_720,w_720/")} media="(max-width: 767px)" type="video/mp4" />
        <source src={src} type="video/mp4" />
      </video>
      {frameUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frameUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${ready ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        />
      ) : null}
    </>
  );
}
