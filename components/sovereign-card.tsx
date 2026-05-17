'use client';

import { motion } from 'framer-motion';
import { Check, Pencil } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface SovereignCardProps {
  original: string;
  standardized: string;
  confidence: number;
  onApprove: () => void;
  onEdit: () => void;
}

function ConfidenceLine({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const color =
    clamped >= 90
      ? 'bg-emerald-500'
      : clamped >= 70
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#70757a]">Confiance</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs font-semibold text-[#202124]"
        >
          {Math.round(clamped)}% Match
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-[#F0F1F3]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
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
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 22,
        mass: 1,
      }}
      className="rounded-3xl border border-[#DADCE0] bg-white p-6 shadow-md md:p-8"
    >
      <div className="space-y-5">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#70757a]">
            {t('original')}
          </p>
          <p className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] px-4 py-3 text-sm text-[#70757a]">
            {original}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-px w-8 bg-[#DADCE0]" />
          <svg className="mx-2 h-4 w-4 text-[#70757a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <div className="h-px w-8 bg-[#DADCE0]" />
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

      <div className="mt-6 border-t border-[#DADCE0]/50 pt-5">
        <ConfidenceLine value={confidence} />
      </div>

      <div
        className={`mt-5 flex gap-3 ${
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
