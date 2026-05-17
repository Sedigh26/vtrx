'use client';

import HeroSection from '@/components/hero-section';
import NormalizationTool from '@/components/normalization-tool';
import SovereignCard from '@/components/sovereign-card';
import AdminTable from '@/components/admin-table';
import { useNameStandardizer } from '@/hooks/use-name-standardizer';

export default function Home() {
  const {
    inputMode,
    setInputMode,
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
    <main className="flex-1 bg-sovereign-black text-white">
      <HeroSection />

      <NormalizationTool
        inputMode={inputMode}
        setInputMode={setInputMode}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isLoading={isLoading}
        isListening={isListening}
        setIsListening={setIsListening}
        onSubmit={submitName}
      />

      {error && (
        <div className="mx-auto max-w-3xl px-6 pb-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-center text-red-400 backdrop-blur-xl">
            {error}
          </div>
        </div>
      )}

      {result && (
        <div className="pb-4">
          <SovereignCard
            original={result.original}
            standardized={result.standardized}
            confidence={result.confidence}
            onCopy={() => copyToClipboard(result.standardized)}
            onRequestAdmin={requestAdminValidation}
          />
        </div>
      )}

      <AdminTable
        records={adminRecords}
        onUpdateStatus={updateAdminStatus}
      />
    </main>
  );
}
