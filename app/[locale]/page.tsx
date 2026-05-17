'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import NormalizationTool from '@/components/normalization-tool';
import SovereignCard from '@/components/sovereign-card';
import AdminTable from '@/components/admin-table';
import { useNameStandardizer } from '@/hooks/use-name-standardizer';

export default function Home() {
  const t = useTranslations('tool');
  const {
    inputValue,
    setInputValue,
    isLoading,
    result,
    error,
    adminRecords,
    isListening,
    setIsListening,
    submitName,
    copyToClipboard,
    requestAdminValidation,
    updateAdminStatus,
  } = useNameStandardizer();

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <div className="flex flex-col items-center px-4 pt-36 sm:pt-44 pb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-2 text-xs text-[#70757a] font-medium tracking-wider uppercase"
        >
          SovereignID AI
        </motion.p>

        <NormalizationTool
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          isListening={isListening}
          setIsListening={setIsListening}
          onSubmit={submitName}
        />

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 w-full max-w-xl"
            >
              <div className="rounded-2xl border border-red-500/15 bg-red-500/5 px-5 py-3.5 text-center text-xs text-red-500/80">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 22,
                mass: 1,
              }}
              className="w-full max-w-xl mt-2"
            >
              <SovereignCard
                original={result.original}
                standardized={result.standardized}
                confidence={result.confidence}
                onApprove={requestAdminValidation}
                onEdit={() => {
                  setInputValue(result.original);
                  document.getElementById('normalization-tool')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AdminTable
        records={adminRecords}
        onUpdateStatus={updateAdminStatus}
      />
    </main>
  );
}
