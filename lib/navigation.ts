import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export const { usePathname, useRouter, redirect, Link, getPathname } =
  createNavigation(routing);
