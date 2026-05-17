'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ShieldCheck, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
        <div className="rounded-lg bg-sovereign-emerald/10 p-2">
          <ShieldCheck className="h-5 w-5 text-sovereign-emerald" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Standardization Result
          </h3>
          <p className="text-sm text-zinc-500">
            Verified against the national administrative registry
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Original Input
            </p>
            <p className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-lg text-zinc-400">
              {original}
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Standardized Output
            </p>
            <p className="text-3xl font-bold text-sovereign-emerald">
              {standardized}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <ConfidenceRing value={confidence} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-white/10"
        >
          {copied ? (
            <Check className="h-5 w-5 text-sovereign-emerald" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={onRequestAdmin}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sovereign-emerald/30 bg-sovereign-emerald/10 px-6 py-3 font-medium text-sovereign-emerald transition-all duration-200 hover:bg-sovereign-emerald/20"
        >
          <ShieldCheck className="h-5 w-5" />
          Request Admin Validation
        </button>
      </div>
    </motion.div>
  );
}
