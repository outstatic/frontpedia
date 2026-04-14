import Script from "next/script";

function GoogleAnalytics({ trackingId }: { trackingId: string }) {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
}

function UmamiAnalytics({ websiteId }: { websiteId: string }) {
  const host = process.env.NEXT_PUBLIC_UMAMI_HOST;
  const hostUrl = process.env.NEXT_PUBLIC_UMAMI_HOST_URL;
  const scriptSrc = host || "/stats/script.js";

  return (
    <Script
      async
      defer
      src={scriptSrc}
      data-website-id={websiteId}
      {...(hostUrl ? { "data-host-url": hostUrl } : {})}
      strategy="afterInteractive"
    />
  );
}

export function Analytics() {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <>
      {gaTrackingId ? (
        <GoogleAnalytics trackingId={gaTrackingId} />
      ) : umamiWebsiteId ? (
        <UmamiAnalytics websiteId={umamiWebsiteId} />
      ) : null}
    </>
  );
}
