import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (images, fonts, etc.)
  // - Next.js internals
  // - Sanity Studio
  matcher: [
    // Match all pathnames except for:
    // - API routes (/api/...)
    // - Static files (/_next/static/..., /images/..., etc.)
    // - Sanity Studio (/studio/...)
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
};
