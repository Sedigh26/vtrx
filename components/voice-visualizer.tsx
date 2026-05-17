'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const BAR_COUNT = 9;

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function VoiceVisualizer({
  isActive,
}: {
  isActive: boolean;
}) {
  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }).map((_, i) => {
        const seed = i * 100;
        const baseHeight = 20;
        const heights = [0, 1, 2, 3].map(
          (step) => pseudoRandom(seed + step) * 55 + baseHeight,
        );
        return {
          heights: isActive ? heights : [16, 16, 16, 16],
          duration: 0.6 + pseudoRandom(seed + 99) * 0.4,
          delay: i * 0.08,
        };
      }),
    [isActive],
  );

  return (
    <div className="flex items-end gap-[3px] h-20">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          animate={{ height: bar.heights }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
          className="w-[3px] rounded-full bg-gradient-to-t from-sovereign-emerald to-sovereign-accent opacity-70"
        />
      ))}
    </div>
  );
}
