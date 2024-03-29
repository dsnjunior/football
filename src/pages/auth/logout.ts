import { auth } from "@/lib/auth";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const session = await context.locals.auth.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  context.locals.auth.setSession(null);
  context.locals.posthog.client.capture({
    event: 'logout',
    distinctId: context.locals.posthog.distinctId,
  })
  return context.redirect('/', 302);
};
