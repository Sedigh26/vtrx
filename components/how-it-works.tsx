'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { AlertTriangle, Brain, ShieldCheck } from 'lucide-react';

const cards = [
  { key: 'challenge', Icon: AlertTriangle },
  { key: 'engine', Icon: Brain },
  { key: 'result', Icon: ShieldCheck },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="w-full px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center text-2xl font-bold text-[#202124] md:text-3xl"
        >
          {t('title')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map(({ key, Icon }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="group rounded-2xl border border-white/20 bg-white/60 p-7 shadow-lg shadow-black/[0.02] backdrop-blur-2xl transition-all duration-300 hover:border-[#1A73E8]/20 hover:shadow-[#1A73E8]/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A73E8]/10 text-[#1A73E8] transition-colors duration-300 group-hover:bg-[#1A73E8]/15">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#202124]">
                {t(`${key}.title`)}
              </h3>
              <p
                className={`text-sm leading-relaxed text-[#70757a] ${
                  isRtl ? 'text-right' : 'text-left'
                }`}
              >
                {t(`${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
