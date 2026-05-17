'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '@/components/hero-section';
import NormalizationTool from '@/components/normalization-tool';
import SovereignCard from '@/components/sovereign-card';
import AdminTable from '@/components/admin-table';
import { useNameStandardizer } from '@/hooks/use-name-standardizer';

export default function Home() {
  const t = useTranslations('tool');
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
  } = useNameStandardizer(t('error'));

  return (
    <main className="min-h-screen">
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
        <div className="mx-auto mt-4 max-w-xl px-4">
          <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] px-5 py-3.5 text-center text-xs text-red-400/80 backdrop-blur-xl">
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
