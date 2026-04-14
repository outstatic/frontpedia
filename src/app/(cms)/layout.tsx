import type { Metadata } from "next";

interface CmsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsLayout({ children }: CmsLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body id="outstatic">{children}</body>
    </html>
  );
}
