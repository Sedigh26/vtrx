'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, MicOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import SovereignPulse from './sovereign-pulse';

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface NormalizationToolProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  onSubmit: () => void;
}

export default function NormalizationTool({
  inputValue,
  setInputValue,
  isLoading,
  isListening,
  setIsListening,
  onSubmit,
}: NormalizationToolProps) {
  const t = useTranslations('tool');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionAPI =
      (window as unknown as {
        SpeechRecognition?: new () => SpeechRecognition;
        webkitSpeechRecognition?: new () => SpeechRecognition;
      }).SpeechRecognition ||
      (window as unknown as {
        SpeechRecognition?: new () => SpeechRecognition;
        webkitSpeechRecognition?: new () => SpeechRecognition;
      }).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'ar-MR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      setInputValue(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [isListening, setIsListening, setInputValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className={[
          'relative flex items-center w-full',
          'rounded-full',
          'bg-white/[0.05] backdrop-blur-2xl',
          'border transition-all duration-300',
          'px-4 sm:px-6 py-2 sm:py-3',
          'shadow-2xl shadow-black/50',
          isListening
            ? 'border-sovereign-emerald animate-sovereign-pulse'
            : isFocused
              ? 'border-sovereign-emerald/70'
              : 'border-white/10',
        ].join(' ')}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <Search
          className={[
            'h-5 w-5 shrink-0',
            isFocused ? 'text-sovereign-emerald' : 'text-zinc-500',
            'transition-colors duration-300',
          ].join(' ')}
        />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('placeholder')}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading && inputValue.trim()) {
              onSubmit();
            }
          }}
          className="flex-1 bg-transparent px-3 sm:px-4 py-2 text-white placeholder:text-zinc-600 focus:outline-none text-base disabled:opacity-50"
          style={{
            fontFamily: isRtl ? 'var(--font-tajawal)' : 'var(--font-jakarta)',
          }}
        />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleListening}
            disabled={isLoading}
            className={[
              'rounded-full p-2 sm:p-2.5 transition-all duration-300',
              isListening
                ? 'text-red-400 bg-red-500/10'
                : 'text-zinc-500 hover:text-sovereign-emerald hover:bg-white/5',
              isLoading ? 'opacity-40 cursor-not-allowed' : '',
            ].join(' ')}
          >
            {isListening ? (
              <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>

          <motion.button
            onClick={onSubmit}
            disabled={isLoading || !inputValue.trim()}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={[
              'rounded-full bg-sovereign-emerald p-2.5 sm:p-3',
              'text-white shadow-lg shadow-sovereign-emerald/25',
              'hover:bg-sovereign-accent hover:shadow-sovereign-emerald/35',
              'transition-all duration-300',
              'disabled:opacity-40 disabled:cursor-not-allowed',
            ].join(' ')}
          >
            {isLoading ? (
              <SovereignPulse />
            ) : (
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
