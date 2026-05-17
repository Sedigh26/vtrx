'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollToTool = () => {
    document
      .getElementById('normalization-tool')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sovereign-darkGray via-sovereign-black to-sovereign-darkGray" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sovereign-emerald/8 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-xl"
        >
          <span className="h-2 w-2 rounded-full bg-sovereign-emerald" />
          Republic of Mauritania — Ministry of Interior
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          SovereignID AI:{' '}
          <span className="bg-gradient-to-r from-sovereign-emerald to-sovereign-accent bg-clip-text text-transparent">
            National Identity Standardization
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          Converting phonetic and misspelled inputs into official
          administrative records with high-precision AI.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          onClick={scrollToTool}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-sovereign-emerald to-sovereign-accent px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-sovereign-emerald/25 transition-shadow duration-300 hover:shadow-sovereign-emerald/40"
        >
          <span className="relative z-10">Begin Standardization</span>
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-sovereign-emerald/0 via-white/20 to-sovereign-emerald/0 opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:opacity-100" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sovereign-black to-transparent" />
    </section>
  );
}
