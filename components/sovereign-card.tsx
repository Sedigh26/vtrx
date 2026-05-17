'use client';

import { motion } from 'framer-motion';
import { Check, BadgeCheck, Pencil } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface SovereignCardProps {
  original: string;
  standardized: string;
  confidence: number;
  onApprove: () => void;
  onEdit: () => void;
}

function ConfidenceBar({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const color =
    clamped >= 90
      ? 'bg-emerald-500'
      : clamped >= 70
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Standardization Confidence
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs font-bold text-[#202124]"
        >
          {Math.round(clamped)}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100">
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
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md"
    >
      <div className="bg-gradient-to-r from-[#1A73E8] to-[#1557B0] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/logo.jpeg"
              alt="N-ID"
              className="h-7 w-7 rounded-md object-cover opacity-90"
            />
            <span className="text-sm font-bold text-white/90">N-ID</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span className="text-[11px] font-medium text-white/90">
              {t('verified')}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-4">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            {t('original')}
          </p>
          <p className="text-sm text-zinc-500">{original}</p>
        </div>

        <div className="mb-1">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
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

      <div className="border-t border-zinc-100 px-6 py-4">
        <ConfidenceBar value={confidence} />
      </div>

      <div
        className={`flex gap-3 border-t border-zinc-100 px-6 py-4 ${
          isRtl ? 'justify-start' : 'justify-end'
        }`}
      >
        <button
          onClick={onEdit}
          className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-transparent px-5 py-2 text-sm font-medium text-[#1A73E8] transition-all duration-200 hover:border-[#1A73E8]/30 hover:bg-[#1A73E8]/5"
        >
          <Pencil className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-8deg]" />
          {t('edit')}
        </button>

        <motion.button
          onClick={onApprove}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1A73E8] to-[#1557B0] px-6 py-2 text-sm font-bold text-white shadow-lg shadow-[#1A73E8]/25 transition-all duration-200 hover:shadow-[#1A73E8]/35"
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
