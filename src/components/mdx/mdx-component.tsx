import Image from "next/image";
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import type { ImgHTMLAttributes } from "react";
import { CustomCode, Pre } from "./custom-code";
import CustomLink from "./custom-link";

export const mdxComponents: MDXComponents = {
  a: CustomLink,
  Image,
  img: ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="border rounded-lg" {...props} />
  ),
  pre: Pre,
  code: CustomCode,
};
