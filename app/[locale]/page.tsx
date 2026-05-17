'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NormalizationTool from '@/components/normalization-tool';
import SovereignCard from '@/components/sovereign-card';
import HowItWorks from '@/components/how-it-works';
import Footer from '@/components/footer';
import AdminTable from '@/components/admin-table';
import { useNameStandardizer } from '@/hooks/use-name-standardizer';

export default function Home() {
  const {
    inputValue,
    setInputValue,
    isLoading,
    result,
    adminRecords,
    isListening,
    setIsListening,
    submitName,
    requestAdminValidation,
    editName,
    updateAdminStatus,
  } = useNameStandardizer();

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-xl flex-col items-center">
          <NormalizationTool
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            isListening={isListening}
            setIsListening={setIsListening}
            onSubmit={submitName}
          />

          <AnimatePresence>
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                  mass: 1,
                }}
                className="mt-3 w-full"
              >
                <SovereignCard
                  original={result.original}
                  standardized={result.standardized}
                  confidence={result.confidence}
                  onApprove={requestAdminValidation}
                  onEdit={() => {
                    editName();
                    setTimeout(() => {
                      document
                        .getElementById('normalization-tool')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <HowItWorks />

      <AdminTable
        records={adminRecords}
        onUpdateStatus={updateAdminStatus}
      />

      <Footer />
    </main>
  );
}
