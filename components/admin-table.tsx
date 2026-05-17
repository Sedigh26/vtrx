'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShieldAlert, TimerReset } from 'lucide-react';
import type { AdminRecord } from '@/hooks/use-name-standardizer';

interface AdminTableProps {
  records: AdminRecord[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
}

function StatusBadge({ record }: { record: AdminRecord }) {
  if (record.status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-sovereign-emerald/30 bg-sovereign-emerald/10 px-3 py-1 text-xs font-medium text-sovereign-emerald">
        <Check className="h-3 w-3" />
        Approved
      </span>
    );
  }

  if (record.status === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
        <X className="h-3 w-3" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
      <TimerReset className="h-3 w-3" />
      Pending
    </span>
  );
}

function ConfidencePill({ value }: { value: number }) {
  const color =
    value >= 80
      ? 'border-sovereign-emerald/30 bg-sovereign-emerald/10 text-sovereign-emerald'
      : value >= 50
        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
        : 'border-red-500/30 bg-red-500/10 text-red-400';

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${color}`}
    >
      {Math.round(value)}%
    </span>
  );
}

export default function AdminTable({
  records,
  onUpdateStatus,
}: AdminTableProps) {
  if (records.length === 0) return null;

  const pendingCount = records.filter((r) => r.status === 'pending').length;

  return (
    <section className="px-6 pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-sovereign-emerald" />
          <h2 className="text-2xl font-bold text-white">
            Admin Validation Queue
          </h2>
          {pendingCount > 0 && (
            <span className="rounded-full border border-sovereign-emerald/30 bg-sovereign-emerald/10 px-3 py-1 text-sm text-sovereign-emerald">
              {pendingCount} pending
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                    Input Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                    AI Suggestion
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                    Confidence
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-zinc-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {records.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ delay: index * 0.04 }}
                      className={`border-b border-white/5 transition-colors ${
                        record.status === 'approved'
                          ? 'bg-sovereign-emerald/[0.02]'
                          : record.status === 'rejected'
                            ? 'bg-red-500/[0.02]'
                            : index % 2 === 0
                              ? 'bg-white/[0.015]'
                              : ''
                      }`}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-white">
                        {record.input}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-sovereign-emerald">
                        {record.suggestion}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <ConfidencePill value={record.confidence} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge record={record} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        {record.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                onUpdateStatus(record.id, 'approved')
                              }
                              className="rounded-lg border border-sovereign-emerald/30 bg-sovereign-emerald/10 p-2 text-sovereign-emerald transition-all hover:bg-sovereign-emerald/20"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                onUpdateStatus(record.id, 'rejected')
                              }
                              className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition-all hover:bg-red-500/20"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-zinc-600">
                            &mdash;
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {records.length > 0 && (
          <p className="mt-4 text-center text-xs text-zinc-600">
            {records.length} total record{records.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </section>
  );
}
