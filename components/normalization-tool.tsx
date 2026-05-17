'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Text, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import VoiceVisualizer from './voice-visualizer';
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
  inputMode: 'text' | 'voice';
  setInputMode: (mode: 'text' | 'voice') => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  onSubmit: () => void;
}

export default function NormalizationTool({
  inputMode,
  setInputMode,
  inputValue,
  setInputValue,
  isLoading,
  isListening,
  setIsListening,
  onSubmit,
}: NormalizationToolProps) {
  const t = useTranslations('tool');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.12,
      y: (e.clientY - rect.top - rect.height / 2) * 0.12,
    });
  };

  const handleMouseLeave = () => setButtonOffset({ x: 0, y: 0 });

  const toggleListening = () => {
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

    if (!SpeechRecognitionAPI) {
      setInputMode('text');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'ar-MR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r: SpeechRecognitionResult) => r[0].transcript)
        .join('');
      setInputValue(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  return (
    <section id="normalization-tool" className="scroll-mt-28 px-4 pb-24">
      <div className="mx-auto max-w-xl">
        {/* Control Center Card */}
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {t('title')}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600">{t('description')}</p>
          </div>

          {/* Input Mode Toggle */}
          <div className="mb-6 flex justify-center">
            <div className="relative rounded-full border border-white/[0.06] bg-white/[0.03] p-0.5">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute left-[3px] top-[3px] z-0 rounded-full bg-gradient-to-r from-sovereign-emerald to-sovereign-accent"
                style={{
                  width: 'calc(50% - 6px)',
                  height: 'calc(100% - 6px)',
                  translateX:
                    inputMode === 'text' ? '0%' : 'calc(100% + 12px)',
                }}
              />
              <div className="relative z-10 flex">
                <button
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-colors md:text-sm ${
                    inputMode === 'text'
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <Text className="h-3.5 w-3.5" />
                  {t('text_input')}
                </button>
                <button
                  onClick={() => setInputMode('voice')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-colors md:text-sm ${
                    inputMode === 'voice'
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <Mic className="h-3.5 w-3.5" />
                  {t('voice_input')}
                </button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <AnimatePresence mode="wait">
            {inputMode === 'text' ? (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('placeholder')}
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-base text-white backdrop-blur-xl placeholder:text-zinc-700 transition-all duration-300 focus:border-sovereign-emerald/40 focus:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)] focus:ring-2 focus:ring-sovereign-emerald/15 focus:outline-none"
                />
              </motion.div>
            ) : (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-14 backdrop-blur-xl"
              >
                <VoiceVisualizer isActive={isListening} />
                <p className="text-xs text-zinc-600">
                  {isListening ? t('listening') : t('tap_mic')}
                </p>
                {inputValue && (
                  <p className="max-w-md text-center text-sm text-white">
                    {inputValue}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Controls */}
          {inputMode === 'voice' && (
            <div className="mt-5 flex justify-center">
              <button
                onClick={toggleListening}
                className={`rounded-full p-3.5 transition-all duration-300 ${
                  isListening
                    ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                    : 'border border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:border-sovereign-emerald/30 hover:text-sovereign-emerald'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: buttonOffset.x, y: buttonOffset.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              onClick={onSubmit}
              disabled={isLoading || !inputValue.trim()}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-sovereign-emerald to-sovereign-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sovereign-emerald/20 transition-shadow duration-300 hover:shadow-sovereign-emerald/30 disabled:cursor-not-allowed disabled:opacity-40 md:w-auto md:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                {isLoading ? (
                  <>
                    <SovereignPulse />
                    {t('loading')}
                  </>
                ) : (
                  <>
                    {t('submit')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:opacity-100" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
