declare global {
  interface Window {
    umami: {
      track: (
        event: string | Record<string, string>,
        properties?: Record<string, string>,
      ) => void;
    };
  }
}

const UMAMI_HOST = process.env.NEXT_PUBLIC_UMAMI_HOST;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_DISABLE_LOCALHOST_TRACKING =
  process.env.NEXT_PUBLIC_UMAMI_DISABLE_LOCALHOST_TRACKING;
const UMAMI_HOST_URL = process.env.NEXT_PUBLIC_UMAMI_HOST_URL;
const UMAMI_PROXY_SCRIPT_PATH = '/stats/script.js';
const UMAMI_CLOUD_SCRIPT_URL = 'https://cloud.umami.is/script.js';

/**
 * Create a Umami analytics service.
 */
export function createUmamiAnalyticsService(
  props: {
    host?: string;
    hostUrl?: string;
    websiteId?: string;
    disableLocalhostTracking?: boolean;
  } = {},
) {
  const host = resolveUmamiScriptSrc(props.host || UMAMI_HOST);
  const hostUrl = props.hostUrl || UMAMI_HOST_URL;
  const websiteId = props.websiteId || UMAMI_WEBSITE_ID;
  const disableLocalhostTracking =
    props.disableLocalhostTracking ??
    (UMAMI_DISABLE_LOCALHOST_TRACKING
      ? UMAMI_DISABLE_LOCALHOST_TRACKING === 'true'
      : false);

  if (!websiteId) {
    throw new Error(
      'UMAMI_WEBSITE_ID is not set. Please set the environment variable NEXT_PUBLIC_UMAMI_WEBSITE_ID.',
    );
  }

  return new UmamiAnalyticsService(
    host,
    hostUrl,
    websiteId,
    disableLocalhostTracking,
  );
}

function resolveUmamiScriptSrc(host?: string) {
  if (!host || host === UMAMI_CLOUD_SCRIPT_URL) {
    return UMAMI_PROXY_SCRIPT_PATH;
  }

  return host;
}

/**
 * Umami analytics service that sends events to Umami.
 */
class UmamiAnalyticsService {
  private userId: string | undefined;
  private initialized = false;

  constructor(
    private readonly host: string,
    private readonly hostUrl: string | undefined,
    private readonly websiteId: string,
    disableLocalhostTracking = false,
  ) {
    if (disableLocalhostTracking) {
      this.disableLocalhostTracking();
    }
  }

  private get umami() {
    return typeof window === 'undefined' || !window.umami
      ? {
          track: () => {
            // noop
          },
        }
      : window.umami;
  }

  private createUmamiScript() {
    if (typeof document === 'undefined') {
      return Promise.resolve();
    }

    const script = document.createElement('script');
    script.src = this.host;
    script.async = true;
    script.defer = true;

    script.setAttribute('data-website-id', this.websiteId);
    script.setAttribute(
      'data-host-url',
      this.hostUrl || window.location.origin,
    );

    document.head.appendChild(script);

    return new Promise<void>((resolve) => {
      script.onload = () => {
        resolve();
      };
    });
  }

  async initialize() {
    if (this.initialized) {
      return Promise.resolve();
    }

    return this.createUmamiScript().then(() => {
      this.initialized = true;
    });
  }

  async trackPageView() {
    // Umami does this automatically
  }

  async trackEvent(
    eventName: string,
    eventProperties: Record<string, string> = {},
  ) {
    await this.initialize();

    if (this.userId) {
      eventProperties.user_id = this.userId;
    }

    return this.umami.track(eventName, eventProperties);
  }

  async identify(userId: string) {
    await this.initialize();

    this.userId = userId;
  }

  private disableLocalhostTracking() {
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost') {
        localStorage.setItem('umami.disabled', '1');
      }
    }
  }
}
