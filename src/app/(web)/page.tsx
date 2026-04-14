import { Logo } from "@/components/logo";
import { Background } from "@/components/ui/background";
import { Feed } from "@/components/feed";
import { FloatingMenu } from "@/components/floating-menu";
import { siteConfig } from "@/config/site";
import { getFeedPage } from "@/lib/feed-pagination";
import { getSeoImageUrl } from "@/lib/seo";
import { Metadata } from "next";
import { load } from "outstatic/server";

export const metadata: Metadata = {
  title: "Front-end Inspiration, Resources, and Design References",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Front-end Inspiration, Resources, and Design References | Frontpedia",
    description: siteConfig.description,
    url: "/",
    type: "website",
    images: [getSeoImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: "Front-end Inspiration, Resources, and Design References | Frontpedia",
    description: siteConfig.description,
    images: [getSeoImageUrl()],
  },
};

export const revalidate = 86400; // 24 hours

export default async function Index() {
  const db = await load();

  const feedPage = await getFeedPage(db);
  const posts = feedPage.posts;

  return (
    <>
      <Background />
      <div className="container mx-auto py-16 space-y-24 md:space-y-12">
        <section className="flex flex-col gap-6">
          <div className="relative pb-12">
            <div className="relative flex flex-col items-start md:ml-4 w-full z-10 gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="w-max">
                  <Logo size="md" />
                </h1>
                <p
                  className="text-base text-foreground/70"
                >
                  A collection of front-end and design resources
                  <br className="hidden min-[368px]:block" /><span className="inline min-[368px]:hidden">&nbsp;</span>
                  by <a href="https://x.com/AndreVitorio" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-slate-700">Andre Vitorio</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        {posts.length > 0 ? (
          <Feed
            initialPosts={posts}
            initialCursor={feedPage.nextCursor}
            initialHasMore={feedPage.hasMore}
          />
        ) : null}
      </div>
      <FloatingMenu />
    </>
  );
}
