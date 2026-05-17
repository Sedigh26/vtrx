'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ShieldCheck, Check, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ConfidenceRing from './confidence-ring';

interface SovereignCardProps {
  original: string;
  standardized: string;
  confidence: number;
  onCopy: () => void;
  onRequestAdmin: () => void;
}

export default function SovereignCard({
  original,
  standardized,
  confidence,
  onCopy,
  onRequestAdmin,
}: SovereignCardProps) {
  const t = useTranslations('result');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 22,
        mass: 1,
      }}
      className="mx-auto mt-2 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-10"
    >
      <div className="mb-5 flex items-center gap-3 border-b border-white/[0.04] pb-5">
        <div className="rounded-xl bg-sovereign-emerald/10 p-2">
          <ShieldCheck className="h-5 w-5 text-sovereign-emerald" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white md:text-lg">
            {t('title')}
          </h3>
          <p className="text-xs text-zinc-600">{t('verified')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex-1 space-y-5">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              {t('original')}
            </p>
            <p className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 text-sm text-zinc-400">
              {original}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              {t('standardized')}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
              className="text-2xl font-bold text-sovereign-emerald md:text-3xl"
            >
              {standardized}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ConfidenceRing value={confidence} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.04] pt-5 sm:flex-row">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/10 hover:text-white md:text-sm"
        >
          {copied ? (
            <Check className="h-4 w-4 text-sovereign-emerald" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? t('copied') : t('copy')}
        </button>
        <button
          onClick={onRequestAdmin}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sovereign-emerald/20 bg-sovereign-emerald/[0.04] px-5 py-3 text-xs font-medium text-sovereign-emerald transition-all duration-200 hover:bg-sovereign-emerald/10 md:text-sm"
        >
          <ShieldCheck className="h-4 w-4" />
          {t('admin_request')}
          <ArrowUpRight className="h-3 w-3 opacity-60" />
        </button>
      </div>
    </motion.div>
  );
}
