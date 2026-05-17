'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Text, ArrowRight, Loader2 } from 'lucide-react';
import VoiceVisualizer from './voice-visualizer';

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
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
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;

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
        .map((r) => r[0].transcript)
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
    <section
      id="normalization-tool"
      className="scroll-mt-16 px-6 pb-12 pt-12 md:pt-24"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Name Standardization Engine
          </h2>
          <p className="mt-3 text-zinc-500">
            Enter a name below to normalize it against the national registry.
          </p>
        </div>

        {/* Input Mode Toggle */}
        <div className="mb-10 flex justify-center">
          <div className="relative rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="absolute left-1 top-1 z-0 rounded-full bg-gradient-to-r from-sovereign-emerald to-sovereign-accent"
              style={{
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                translateX: inputMode === 'text' ? '0%' : 'calc(100% + 8px)',
              }}
            />
            <div className="relative z-10 flex">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  inputMode === 'text' ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Text className="h-4 w-4" />
                Text Input
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  inputMode === 'voice' ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Mic className="h-4 w-4" />
                Voice Input
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <AnimatePresence mode="wait">
          {inputMode === 'text' ? (
            <motion.div
              key="text-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Sheikh Mohamed Bin Zayed"
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-lg text-white backdrop-blur-xl placeholder:text-zinc-600 focus:border-sovereign-emerald/50 focus:ring-2 focus:ring-sovereign-emerald/20 focus:outline-none transition-all duration-300"
              />
            </motion.div>
          ) : (
            <motion.div
              key="voice-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-16 backdrop-blur-xl"
            >
              <VoiceVisualizer isActive={isListening} />
              <p className="text-sm text-zinc-500">
                {isListening ? 'Listening...' : 'Tap the microphone to begin'}
              </p>
              {inputValue && (
                <p className="max-w-lg text-center text-lg text-white">
                  {inputValue}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Controls */}
        {inputMode === 'voice' && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={toggleListening}
              className={`rounded-full p-4 transition-all duration-300 ${
                isListening
                  ? 'border border-red-500/30 bg-red-500/20 text-red-400'
                  : 'border border-sovereign-emerald/30 bg-sovereign-emerald/20 text-sovereign-emerald hover:bg-sovereign-emerald/30'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: buttonOffset.x, y: buttonOffset.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            onClick={onSubmit}
            disabled={isLoading || !inputValue.trim()}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-sovereign-emerald to-sovereign-accent px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-sovereign-emerald/25 transition-shadow duration-300 hover:shadow-sovereign-emerald/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  AI is analyzing...
                </>
              ) : (
                <>
                  Standardize Name
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-sovereign-emerald/0 via-white/15 to-sovereign-emerald/0 opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:opacity-100" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
