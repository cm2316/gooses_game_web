import createMiddleware from "next-intl/middleware";
import { support_locales, default_locale } from "./locales";

export default createMiddleware({
  locales: support_locales,
  defaultLocale: default_locale,
  localeDetection: false,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
