'use client';

import { useState, useCallback } from 'react';
import { standardizeName, type StandardizeResponse } from '@/lib/api';

export interface AdminRecord {
  id: string;
  input: string;
  suggestion: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
}

export function useNameStandardizer() {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StandardizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adminRecords, setAdminRecords] = useState<AdminRecord[]>([]);
  const [isListening, setIsListening] = useState(false);

  const submitName = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await standardizeName(trimmed);
      setResult(data);
    } catch {
      setError('Failed to connect to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputValue]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }, []);

  const requestAdminValidation = useCallback(() => {
    if (!result) return;

    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const record: AdminRecord = {
      id,
      input: result.original,
      suggestion: result.standardized,
      confidence: result.confidence,
      status: 'pending',
    };
    setAdminRecords((prev) => [record, ...prev]);
  }, [result]);

  const updateAdminStatus = useCallback(
    (id: string, status: 'approved' | 'rejected') => {
      setAdminRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      );
    },
    [],
  );

  return {
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
  };
}
