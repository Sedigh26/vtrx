'use client';

import { usePathname, useRouter } from '@/lib/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Languages, MoveRight } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const currentLocale = useLocale();
  const isRtl = currentLocale === 'ar';
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  const links = [
    { key: 'work', href: '#work' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="flex w-full max-w-4xl items-center justify-between rounded-full border border-white/20 bg-white/70 px-5 py-2.5 shadow-lg shadow-black/[0.03] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.jpeg"
            alt="N-ID"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-sm font-bold text-[#202124]">N-ID</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-[#70757a] transition-colors duration-200 hover:text-[#202124]"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-full bg-[#1A73E8] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1557B0] sm:flex">
            {t('letsTalk')}
            <MoveRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5 border-l border-[#DADCE0] pl-3">
            <Languages className="h-4 w-4 text-[#70757a]" />
            <div className="flex overflow-hidden rounded-full border border-[#DADCE0] bg-[#F8F9FA]">
              <button
                onClick={() => switchLocale('fr')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  locale === 'fr'
                    ? 'bg-[#1A73E8] text-white'
                    : 'text-[#70757a] hover:text-[#202124]'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLocale('ar')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  locale === 'ar'
                    ? 'bg-[#1A73E8] text-white'
                    : 'text-[#70757a] hover:text-[#202124]'
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
