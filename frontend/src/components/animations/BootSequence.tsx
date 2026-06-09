'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_LINES, type BootStep } from '@/types';
import { audioService } from '@/lib/audioService';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState<BootStep>('void');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Step transitions
  useEffect(() => {
    if (step === 'void') {
      const timer = setTimeout(() => setStep('point'), 1000);
      return () => clearTimeout(timer);
    }
    if (step === 'point') {
      audioService.playDiagnosticPing();
      const timer = setTimeout(() => setStep('reactor'), 400);
      return () => clearTimeout(timer);
    }
    if (step === 'reactor') {
      audioService.playPowerSweep();
      const timer = setTimeout(() => setStep('terminal'), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Typewriter effect
  const typeNextLine = useCallback(() => {
    if (step !== 'terminal') return;
    if (currentLineIndex >= BOOT_LINES.length) {
      setTimeout(() => {
        setStep('transition');
        setTimeout(onComplete, 600);
      }, 600);
      return;
    }

    const line = BOOT_LINES[currentLineIndex];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex <= line.text.length) {
        setCurrentLineText(line.text.slice(0, charIndex));
        charIndex++;
        audioService.playTypeClick();
        setTimeout(typeChar, 60);
      } else {
        // Line complete — add to finished lines
        setTerminalLines((prev) => [...prev, line.text]);
        setCurrentLineText('');
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, line.pauseMs);
      }
    };

    typeChar();
  }, [step, currentLineIndex, onComplete]);

  useEffect(() => {
    if (step === 'terminal') {
      typeNextLine();
    }
  }, [step, currentLineIndex, typeNextLine]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Step 1: Void */}
        {step === 'void' && (
          <motion.div
            key="void"
            className="absolute inset-0 bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Step 2: Point */}
        {step === 'point' && (
          <motion.div
            key="point"
            className="w-2 h-2 rounded-full bg-arc-blue"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 217, 255, 0.4)' }}
          />
        )}

        {/* Step 3: Reactor */}
        {(step === 'reactor' || step === 'terminal' || step === 'transition') && (
          <motion.div
            key="reactor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8"
          >
            {/* CSS ARC Reactor */}
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-arc-blue/40"
                style={{
                  animation: 'spin-counter 8s linear infinite',
                  boxShadow: '0 0 15px rgba(0,217,255,0.3), inset 0 0 15px rgba(0,217,255,0.1)',
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-3 rounded-full border border-arc-blue/60"
                style={{
                  animation: 'spin-clockwise 6s linear infinite',
                  boxShadow: '0 0 10px rgba(0,217,255,0.4)',
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute inset-6 rounded-full border border-arc-blue/80"
                style={{
                  animation: 'spin-counter 4s linear infinite',
                  boxShadow: '0 0 8px rgba(0,217,255,0.5)',
                }}
              />
              {/* Core glow */}
              <div
                className="absolute inset-10 rounded-full bg-arc-blue/20"
                style={{
                  boxShadow: '0 0 30px rgba(0,217,255,0.6), 0 0 60px rgba(0,217,255,0.3)',
                  animation: 'pulse-glow-blue 2s ease-in-out infinite',
                }}
              />
              {/* Center dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-arc-blue"
                style={{
                  boxShadow: '0 0 12px rgba(0,217,255,0.8)',
                }}
              />
              {/* Radial lines */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute top-1/2 left-1/2 w-px h-12 md:h-16 bg-gradient-to-b from-arc-blue/60 to-transparent origin-top"
                  style={{ transform: `translate(-50%, 0) rotate(${deg}deg)` }}
                />
              ))}
            </div>

            {/* Terminal text */}
            {(step === 'terminal' || step === 'transition') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md px-4"
              >
                <div className="font-mono text-xs md:text-sm text-terminal-green space-y-1">
                  {terminalLines.map((line, i) => (
                    <div key={i} className="opacity-60">{line}</div>
                  ))}
                  {currentLineText && (
                    <div>
                      {currentLineText}
                      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
                    </div>
                  )}
                  {!currentLineText && currentLineIndex < BOOT_LINES.length && (
                    <div>
                      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade out */}
      {step === 'transition' && (
        <motion.div
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      )}
    </div>
  );
}
