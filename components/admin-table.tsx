'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShieldAlert, TimerReset } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { AdminRecord } from '@/hooks/use-name-standardizer';

interface AdminTableProps {
  records: AdminRecord[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
}

function StatusBadge({ record }: { record: AdminRecord }) {
  const t = useTranslations('admin');

  if (record.status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[#1A73E8]/20 bg-[#1A73E8]/5 px-2.5 py-0.5 text-[11px] font-medium text-[#1A73E8]">
        <Check className="h-3 w-3" />
        {t('approved')}
      </span>
    );
  }

  if (record.status === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-[11px] font-medium text-red-500">
        <X className="h-3 w-3" />
        {t('rejected')}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/5 px-2.5 py-0.5 text-[11px] font-medium text-amber-600">
      <TimerReset className="h-3 w-3" />
      {t('pending')}
    </span>
  );
}

function ConfidencePill({ value }: { value: number }) {
  const color =
    value >= 80
      ? 'border-[#1A73E8]/20 bg-[#1A73E8]/5 text-[#1A73E8]'
      : value >= 50
        ? 'border-amber-500/20 bg-amber-500/5 text-amber-600'
        : 'border-red-500/20 bg-red-500/5 text-red-500';

  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${color}`}
    >
      {Math.round(value)}%
    </span>
  );
}

export default function AdminTable({
  records,
  onUpdateStatus,
}: AdminTableProps) {
  const t = useTranslations('admin');

  if (records.length === 0) return null;

  const pendingCount = records.filter((r) => r.status === 'pending').length;

  return (
    <section className="px-4 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-[#1A73E8]" />
          <h2 className="text-lg font-semibold text-[#202124] md:text-xl">
            {t('title')}
          </h2>
          {pendingCount > 0 && (
            <span className="rounded-full border border-[#1A73E8]/20 bg-[#1A73E8]/5 px-2.5 py-0.5 text-[11px] text-[#1A73E8]">
              {t('pending_count', { count: pendingCount })}
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#DADCE0] bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DADCE0]/50">
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-[#70757a]">
                    {t('input_name')}
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-[#70757a]">
                    {t('ai_suggestion')}
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-[#70757a]">
                    {t('confidence')}
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-[#70757a]">
                    {t('status')}
                  </th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-medium uppercase tracking-wider text-[#70757a]">
                    {t('action')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {records.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-[#DADCE0]/30 transition-colors last:border-0 ${
                        record.status === 'approved'
                          ? 'bg-[#1A73E8]/[0.02]'
                          : record.status === 'rejected'
                            ? 'bg-red-500/[0.02]'
                            : index % 2 === 0
                              ? 'bg-[#F8F9FA]'
                              : ''
                      }`}
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 text-sm text-[#202124]">
                        {record.input}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-[#1A73E8]">
                        {record.suggestion}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <ConfidencePill value={record.confidence} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <StatusBadge record={record} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        {record.status === 'pending' ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() =>
                                onUpdateStatus(record.id, 'approved')
                              }
                              className="rounded-lg border border-[#1A73E8]/20 bg-[#1A73E8]/5 p-1.5 text-[#1A73E8] transition-all hover:bg-[#1A73E8]/10"
                              title={t('approved')}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                onUpdateStatus(record.id, 'rejected')
                              }
                              className="rounded-lg border border-red-500/20 bg-red-500/5 p-1.5 text-red-500 transition-all hover:bg-red-500/10"
                              title={t('rejected')}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-[#DADCE0]">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#70757a]">
          {t('total', { count: records.length })}
        </p>
      </div>
    </section>
  );
}
