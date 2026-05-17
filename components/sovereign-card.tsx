'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Check, Pencil } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ConfidenceRing from './confidence-ring';

interface SovereignCardProps {
  original: string;
  standardized: string;
  confidence: number;
  onApprove: () => void;
  onEdit: () => void;
}

export default function SovereignCard({
  original,
  standardized,
  confidence,
  onApprove,
  onEdit,
}: SovereignCardProps) {
  const t = useTranslations('result');
  const locale = useLocale();
  const isRtl = locale === 'ar';

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

      <div
        className={`mt-6 flex gap-4 border-t border-[#DADCE0]/50 pt-5 ${
          isRtl ? 'justify-start' : 'justify-end'
        }`}
      >
        <button
          onClick={onEdit}
          className="group flex items-center gap-2 rounded-full border border-[#DADCE0] bg-transparent px-5 py-2.5 text-sm font-medium text-[#1A73E8] transition-all duration-200 hover:border-[#1A73E8]/30 hover:bg-[#1A73E8]/5"
        >
          <Pencil className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-8deg]" />
          {t('edit')}
        </button>

        <motion.button
          onClick={onApprove}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1A73E8] to-[#1557B0] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1A73E8]/30 transition-all duration-200 hover:shadow-[#1A73E8]/40"
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                'inset 0 0 0 0 rgba(255,255,255,0)',
                'inset 0 0 20px 4px rgba(255,255,255,0.1)',
                'inset 0 0 0 0 rgba(255,255,255,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Check className="h-4 w-4" />
          {t('approve')}
        </motion.button>
      </div>
    </motion.div>
  );
}
