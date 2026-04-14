import { env } from "@/../env.mjs";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const CaptchaProvider = ({ children }) => {
  return (
    <ReCaptchaProvider reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      {children}
    </ReCaptchaProvider>
  );
};
