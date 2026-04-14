import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    OUTSTATIC_API_KEY: z.string().optional(),
    OST_GITHUB_ID: z.string().optional(),
    OST_GITHUB_SECRET: z.string().optional(),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
    GOOGLE_PRIVATE_KEY: z.string().optional(),
    GOOGLE_SPREADSHEET_ID: z.string().optional(),
    RECAPTCHA_SECRET_KEY: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_SEGMENT_ID: z.string().optional(),
    OWNER_EMAIL: z.email().optional(),
    FROM_EMAIL: z.email().optional(),
  },
  client: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_PUBLIC_EMAIL_LIST_ENABLED: z.enum(["true", "false"]).optional(),
    NEXT_PUBLIC_SUBMIT_CONTENT_ENABLED: z
      .enum(["true", "false"])
      .optional(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
    NEXT_PUBLIC_UMAMI_DISABLE_LOCALHOST_TRACKING: z.string().optional(),
  },
  runtimeEnv: {
    OUTSTATIC_API_KEY: process.env.OUTSTATIC_API_KEY,
    OST_GITHUB_ID: process.env.OST_GITHUB_ID,
    OST_GITHUB_SECRET: process.env.OST_GITHUB_SECRET,
    OST_TOKEN_SECRET: process.env.OST_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_EMAIL_LIST_ENABLED:
      process.env.NEXT_PUBLIC_EMAIL_LIST_ENABLED,
    NEXT_PUBLIC_SUBMIT_CONTENT_ENABLED:
      process.env.NEXT_PUBLIC_SUBMIT_CONTENT_ENABLED,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_SEGMENT_ID: process.env.RESEND_SEGMENT_ID,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    NEXT_PUBLIC_UMAMI_HOST: process.env.NEXT_PUBLIC_UMAMI_HOST,
    NEXT_PUBLIC_UMAMI_HOST_URL: process.env.NEXT_PUBLIC_UMAMI_HOST_URL,
    NEXT_PUBLIC_UMAMI_DISABLE_LOCALHOST_TRACKING: process.env.NEXT_PUBLIC_UMAMI_DISABLE_LOCALHOST_TRACKING,
  },
});
