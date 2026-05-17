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
      <div className="flex w-72 items-center justify-between rounded-full border border-white/20 bg-white/70 px-4 py-2 shadow-lg shadow-black/[0.03] backdrop-blur-2xl">
        <img
          src="/images/logo.jpeg"
          alt="N-ID"
          className="h-8 w-8 rounded-lg object-cover"
        />

        <div className="flex items-center gap-1.5">
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
    </nav>
  );
}
