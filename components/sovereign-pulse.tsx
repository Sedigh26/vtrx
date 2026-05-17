'use client';

import { motion } from 'framer-motion';

export default function SovereignPulse() {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#1A73E8]"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#1A73E8]"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <span className="relative h-2 w-2 rounded-full bg-[#1A73E8]" />
    </div>
  );
}
