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
      className="mx-auto mt-2 rounded-3xl border border-[#DADCE0] bg-white p-6 shadow-md md:p-10"
    >
      <div className="mb-5 flex items-center gap-3 border-b border-[#DADCE0]/50 pb-5">
        <div className="rounded-xl bg-[#1A73E8]/10 p-2">
          <ShieldCheck className="h-5 w-5 text-[#1A73E8]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#202124] md:text-lg">
            {t('title')}
          </h3>
          <p className="text-xs text-[#70757a]">{t('verified')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex-1 space-y-5">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#70757a]">
              {t('original')}
            </p>
            <p className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] px-4 py-3 text-sm text-[#70757a]">
              {original}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#70757a]">
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
              className="text-2xl font-bold text-[#1A73E8] md:text-3xl"
            >
              {standardized}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ConfidenceRing value={confidence} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-[#DADCE0]/50 pt-5 sm:flex-row">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#DADCE0] bg-white px-5 py-3 text-xs font-medium text-[#70757a] transition-all duration-200 hover:border-[#1A73E8]/30 hover:text-[#202124] md:text-sm"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[#1A73E8]" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? t('copied') : t('copy')}
        </button>
        <button
          onClick={onRequestAdmin}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#1A73E8]/20 bg-[#1A73E8]/5 px-5 py-3 text-xs font-medium text-[#1A73E8] transition-all duration-200 hover:bg-[#1A73E8]/10 md:text-sm"
        >
          <ShieldCheck className="h-4 w-4" />
          {t('admin_request')}
          <ArrowUpRight className="h-3 w-3 opacity-60" />
        </button>
      </div>
    </motion.div>
  );
}
