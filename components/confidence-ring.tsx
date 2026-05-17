'use client';

import { motion } from 'framer-motion';

interface ConfidenceRingProps {
  value: number;
}

export default function ConfidenceRing({ value }: ConfidenceRingProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  const color =
    clamped >= 80
      ? '#1A73E8'
      : clamped >= 50
        ? '#f59e0b'
        : '#ef4444';

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="5"
        />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#202124]">
          {Math.round(clamped)}%
        </span>
        <span className="text-[10px] text-[#70757a]">Confidence</span>
      </div>
    </div>
  );
}
