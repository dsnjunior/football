import type { MiddlewareHandler } from "astro";

import { auth } from "@/lib/auth";
import { posthog, posthogApiKey } from "@/lib/posthog";
import { getLangFromUrl, useTranslations, useTranslatedPath } from "@/lib/i18n/utils";

export const onRequest: MiddlewareHandler = (context, next) => {
  context.locals.auth = auth.handleRequest(context);

  const lang = getLangFromUrl(context.url);
  context.locals.i18n = {
    lang: lang,
    t: useTranslations(lang),
    translatePath: useTranslatedPath(lang),
  };

  context.locals.posthog = {
    client: posthog,
    distinctId: context.cookies.get(`ph_${posthogApiKey}_posthog`)?.json().distinct_id ?? crypto.randomUUID(),
  };

  return next();
};
