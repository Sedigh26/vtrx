'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');

  return (
    <section className="flex flex-col items-center justify-center px-6 pt-32 pb-12">
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
          className="mx-auto max-w-xl text-base leading-relaxed text-zinc-500"
        >
          {t('description')}
        </motion.p>
      </motion.div>
    </section>
  );
}
