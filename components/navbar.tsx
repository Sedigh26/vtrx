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
      <div className="flex w-full max-w-2xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 shadow-2xl shadow-black/50 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sovereign-emerald to-sovereign-accent">
            <span className="text-xs font-bold text-white">SI</span>
          </div>
          <span className="hidden text-sm font-medium text-white sm:block">
            SovereignID AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-zinc-500" />
          <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5">
            <button
              onClick={() => switchLocale('fr')}
              className={`px-4 py-1 text-xs font-medium transition-colors ${
                locale === 'fr'
                  ? 'bg-sovereign-emerald text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('ar')}
              className={`px-4 py-1 text-xs font-medium transition-colors ${
                locale === 'ar'
                  ? 'bg-sovereign-emerald text-white'
                  : 'text-zinc-400 hover:text-white'
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
