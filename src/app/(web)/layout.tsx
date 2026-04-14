import "@/styles/globals.css";
import { Analytics } from "@/components/analytics";
import { SubmitPostModal } from "@/components/submit-post-modal";
import { siteConfig } from "@/config/site";
import { fontSans, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Providers } from "@/lib/providers";
import SubscribeModal from "@/components/subscribe-modal";
import AboutModal from "@/components/about-modal";
import Link from "next/link";
import { getSeoImageUrl } from "@/lib/seo";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  ],
  creator: siteConfig.creator.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    url: "/",
    images: [getSeoImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [getSeoImageUrl()],
    creator: siteConfig.creator.handle,
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <Providers>
          <main className="relative overflow-hidden">
            {children}
            <footer className="container mx-auto py-32 text-center text-lg rounded-t-2xl bg-slate-100">
              This space was intentionally left blank
            </footer>
          </main>
          {siteConfig.features.submitContent ? <SubmitPostModal /> : null}
          {siteConfig.features.emailList ? <SubscribeModal /> : null}
          <AboutModal />
        </Providers>
      </body>
    </html>
  );
}
