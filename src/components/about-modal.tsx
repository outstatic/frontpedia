import { mdxComponents } from "@/components/mdx/mdx-component";
import { mdxOptions } from "@/lib/mdx-server";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getSingletonBySlug } from "outstatic/server";
import AboutModalClient from "./about-modal-client";

function getData() {
  return getSingletonBySlug("about-frontpedia", ["title", "content"] as const);
}

export default function AboutModal() {
  const about = getData();

  if (!about) {
    return null;
  }

  return (
    <AboutModalClient title={about.title}>
      {about.content ? (
        <div className="prose prose-sm max-w-none">
          <MDXRemote
            source={about.content}
            components={mdxComponents}
            options={mdxOptions}
          />
        </div>
      ) : null}
    </AboutModalClient>
  );
}
