import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const mdxOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "dracula",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["hash-anchor"],
          },
        },
      ],
    ],
  },
};
