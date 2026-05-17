'use client';

import { usePathname, useRouter } from '@/lib/navigation';
import { Languages } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="flex w-full max-w-2xl items-center justify-between rounded-full border border-[#DADCE0] bg-white px-6 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A73E8]">
            <span className="text-xs font-bold text-white">SI</span>
          </div>
          <span className="hidden text-sm font-medium text-[#202124] sm:block">
            SovereignID AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-[#70757a]" />
          <div className="flex overflow-hidden rounded-full border border-[#DADCE0] bg-[#F8F9FA]">
            <button
              onClick={() => switchLocale('fr')}
              className={`px-4 py-1 text-xs font-medium transition-colors ${
                locale === 'fr'
                  ? 'bg-[#1A73E8] text-white'
                  : 'text-[#70757a] hover:text-[#202124]'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('ar')}
              className={`px-4 py-1 text-xs font-medium transition-colors ${
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
    </nav>
  );
}
