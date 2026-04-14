export type SiteConfig = typeof siteConfig;

const FALLBACK_SITE_URL = "https://frontpedia.com";

const resolveFeatureFlag = (
  value: string | undefined,
  defaultValue: boolean
) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === "true";
};

const resolveSiteUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    FALLBACK_SITE_URL;

  try {
    return new URL(url).toString();
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const isEmailListEnabled = resolveFeatureFlag(
  process.env.NEXT_PUBLIC_EMAIL_LIST_ENABLED,
  false
);

export const isSubmitContentEnabled = resolveFeatureFlag(
  process.env.NEXT_PUBLIC_SUBMIT_CONTENT_ENABLED,
  false
);

export const siteConfig = {
  name: "Frontpedia",
  description:
    "Curated frontend inspiration, design references, UI patterns, and development resources for modern web teams.",
  creator: {
    name: "Andre Vitorio",
    handle: "@AndreVitorio",
    url: "https://x.com/AndreVitorio",
  },
  locale: "en_US",
  keywords: [
    "frontend inspiration",
    "web design inspiration",
    "ui patterns",
    "design systems",
    "frontend resources",
    "web development resources",
    "typography resources",
  ],
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  url: resolveSiteUrl(),
  links: {
    github: "https://github.com/outstatic/frontpedia",
    x: "https://x.com/AndreVitorio",
  },
  features: {
    emailList: isEmailListEnabled,
    submitContent: isSubmitContentEnabled,
  },
};
