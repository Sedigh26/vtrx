'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NormalizationTool from '@/components/normalization-tool';
import SovereignCard from '@/components/sovereign-card';
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
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl flex flex-col items-center">
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
                className="w-full mt-3"
              >
                <SovereignCard
                  original={result.original}
                  standardized={result.standardized}
                  confidence={result.confidence}
                  onApprove={requestAdminValidation}
                  onEdit={() => {
                    editName();
                    setTimeout(() => {
                      document.getElementById('normalization-tool')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AdminTable
        records={adminRecords}
        onUpdateStatus={updateAdminStatus}
      />
    </main>
  );
}
