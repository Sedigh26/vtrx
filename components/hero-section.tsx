'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');

  const scrollToTool = () => {
    document
      .getElementById('normalization-tool')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-sovereign-emerald/[0.03] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 text-xs text-zinc-500"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sovereign-emerald" />
          {tNav('ministry')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          {t('title')}
          <span className="block bg-gradient-to-r from-sovereign-emerald to-sovereign-accent bg-clip-text text-transparent">
            {t('subtitle')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-zinc-500"
        >
          {t('description')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          onClick={scrollToTool}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:border-sovereign-emerald/30 hover:text-white"
        >
          {t('cta')}
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
