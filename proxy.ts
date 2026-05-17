import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const handler = createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export function proxy(request: NextRequest) {
  return handler(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
