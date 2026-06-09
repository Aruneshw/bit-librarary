'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_LINES } from '@/types';
import { audioService } from '@/lib/audioService';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'assembled' | 'transition'>('loading');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Equalizer ladders values
  const [leftLadder, setLeftLadder] = useState<number[]>([3, 5, 2, 6, 4, 7, 3, 5]);
  const [rightLadder, setRightLadder] = useState<number[]>([4, 2, 7, 5, 3, 6, 2, 4]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Initial sound on load
  useEffect(() => {
    audioService.playDiagnosticPing();
    const soundTimer = setTimeout(() => {
      audioService.playPowerSweep();
    }, 600);
    return () => clearTimeout(soundTimer);
  }, []);

  // Equalizer animation once loading finishes
  useEffect(() => {
    if (phase === 'assembled') {
      const interval = setInterval(() => {
        setLeftLadder(Array.from({ length: 8 }, () => Math.floor(Math.random() * 8) + 1));
        setRightLadder(Array.from({ length: 8 }, () => Math.floor(Math.random() * 8) + 1));
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Loading progress counter
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = Math.floor(Math.random() * 8) + 3; // Increment by 3-10%
        const next = Math.min(prev + step, 100);

        if (next < 100) {
          // Play subtle typewriter tick sound on progress ticks
          if (Math.random() > 0.3) {
            audioService.playTypeClick();
          }
        } else {
          // Finished loading
          clearInterval(interval);
          audioService.playDiagnosticPing();
          setTimeout(() => {
            setPhase('assembled');
            // Allow the 3D HUD to show assembled state for 2 seconds
            setTimeout(() => {
              setPhase('transition');
              setTimeout(onComplete, 800);
            }, 2200);
          }, 400);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  // Typewriter lines synchronized with progress
  const typeNextLine = useCallback(() => {
    if (currentLineIndex >= BOOT_LINES.length) return;

    const line = BOOT_LINES[currentLineIndex];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex <= line.text.length) {
        setCurrentLineText(line.text.slice(0, charIndex));
        charIndex++;
        // Very soft telemetry tick on line characters
        if (Math.random() > 0.5) {
          audioService.playTypeClick();
        }
        setTimeout(typeChar, 45);
      } else {
        // Line complete
        setTerminalLines((prev) => [...prev, line.text]);
        setCurrentLineText('');
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, line.pauseMs);
      }
    };

    typeChar();
  }, [currentLineIndex]);

  // Trigger next line based on index
  useEffect(() => {
    typeNextLine();
  }, [currentLineIndex, typeNextLine]);

  // Blocks details
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none font-mono">
      <AnimatePresence mode="wait">
        {phase !== 'transition' && (
          <motion.div
            key="hud-display"
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 12, rotateY: -10 }}
            exit={{ opacity: 0, scale: 1.1, rotateX: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[340px] md:w-[680px] h-[360px] md:h-[450px] border border-arc-blue/20 rounded-2xl flex flex-col items-center justify-between p-6 overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              boxShadow: '0 0 40px rgba(0, 217, 255, 0.05), inset 0 0 40px rgba(0, 217, 255, 0.02)',
              background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.03) 0%, transparent 80%)'
            }}
          >
            {/* Holographic grid layer */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                transform: 'translateZ(-20px)'
              }}
            />

            {/* Glowing HUD corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-arc-blue/60" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-arc-blue/60" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-arc-blue/60" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-arc-blue/60" />

            {/* Header Telemetry */}
            <div className="w-full flex justify-between items-center text-[8px] md:text-[10px] text-arc-blue/50 border-b border-arc-blue/10 pb-2">
              <div className="flex gap-4">
                <span>SYS_INIT: ONLINE</span>
                <span>SEC_DOMAIN: ACTIVE</span>
              </div>
              <div className="font-bold tracking-widest text-arc-blue">
                ARC_OS // KERNEL v2.4
              </div>
              <div className="flex gap-4">
                <span>SECTOR: 7_AL</span>
                <span>CHARGE: {progress}%</span>
              </div>
            </div>

            {/* Left/Right Honeycomb Side Meshes */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block opacity-20 hover:opacity-35 transition-opacity duration-300" style={{ transform: 'translateZ(10px)' }}>
              <svg width="100" height="200">
                <defs>
                  <pattern id="hex-left" width="16" height="27.71" patternUnits="userSpaceOnUse">
                    <path d="M8 0 L16 4.62 L16 13.86 L8 18.48 L0 13.86 L0 4.62 Z M8 27.71 L16 32.33 L16 41.57 L8 46.19 L0 41.57 L0 32.33 Z" fill="none" stroke="#00d9ff" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100" height="200" fill="url(#hex-left)" />
              </svg>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block opacity-20 hover:opacity-35 transition-opacity duration-300" style={{ transform: 'translateZ(10px)' }}>
              <svg width="100" height="200">
                <defs>
                  <pattern id="hex-right" width="16" height="27.71" patternUnits="userSpaceOnUse">
                    <path d="M8 0 L16 4.62 L16 13.86 L8 18.48 L0 13.86 L0 4.62 Z M8 27.71 L16 32.33 L16 41.57 L8 46.19 L0 41.57 L0 32.33 Z" fill="none" stroke="#00d9ff" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100" height="200" fill="url(#hex-right)" />
              </svg>
            </div>

            {/* Middle Section: Center Rings & Hexagon assembly */}
            <div className="relative flex-1 w-full flex items-center justify-center">
              
              {/* Notched outer rings (slow rotation) */}
              <div 
                className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-dashed border-arc-blue/30 animate-[spin-clockwise_24s_linear_infinite]"
                style={{ transform: 'translateZ(-10px)' }}
              />
              
              {/* Reverse notched ring */}
              <div 
                className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-double border-arc-blue/20 animate-[spin-counter_16s_linear_infinite]"
                style={{ transform: 'translateZ(5px)' }}
              />

              {/* Dynamic Equalizer Ladders next to core */}
              {phase === 'assembled' && (
                <>
                  {/* Left Ladder */}
                  <div className="absolute left-[80px] md:left-[180px] flex gap-1 h-20 items-end">
                    {leftLadder.map((val, idx) => (
                      <div key={idx} className="w-1 md:w-1.5 flex flex-col gap-0.5">
                        {Array.from({ length: 8 }).map((_, segmentIdx) => (
                          <div
                            key={segmentIdx}
                            className={`h-1.5 rounded-sm transition-all duration-100 ${
                              segmentIdx < val 
                                ? 'bg-arc-blue shadow-[0_0_4px_#00d9ff]' 
                                : 'bg-arc-blue/10'
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Right Ladder */}
                  <div className="absolute right-[80px] md:right-[180px] flex gap-1 h-20 items-end">
                    {rightLadder.map((val, idx) => (
                      <div key={idx} className="w-1 md:w-1.5 flex flex-col gap-0.5">
                        {Array.from({ length: 8 }).map((_, segmentIdx) => (
                          <div
                            key={segmentIdx}
                            className={`h-1.5 rounded-sm transition-all duration-100 ${
                              segmentIdx < val 
                                ? 'bg-arc-blue shadow-[0_0_4px_#00d9ff]' 
                                : 'bg-arc-blue/10'
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Central Hexagon assembly */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center" style={{ transform: 'translateZ(25px)' }}>
                {/* Glowing Hexagon outline */}
                <svg className="absolute w-full h-full text-arc-blue animate-[pulse_2s_infinite]" viewBox="0 0 100 100">
                  <polygon
                    points="50,5 92,28 92,72 50,95 8,72 8,28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.7))' }}
                  />
                </svg>

                {/* Inside core content */}
                <AnimatePresence mode="wait">
                  {phase === 'loading' ? (
                    <motion.div
                      key="loading-text"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <span className="font-orbitron text-xl md:text-2xl font-bold text-arc-blue" style={{ textShadow: '0 0 10px rgba(0, 217, 255, 0.5)' }}>
                        {progress}%
                      </span>
                      <span className="text-[7px] md:text-[8px] text-arc-blue/60 tracking-widest mt-1 uppercase animate-pulse">
                        CHARGING
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hazard-symbol"
                      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 360, scale: 1.05 }}
                      transition={{ duration: 1.0, ease: 'easeOut' }}
                      className="w-14 h-14 md:w-20 md:h-20 text-arc-blue flex items-center justify-center animate-[spin-clockwise_10s_linear_infinite]"
                    >
                      {/* Detailed vector hazard logo */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <g transform="translate(50, 50)">
                          <circle cx="0" cy="0" r="7" fill="currentColor" style={{ filter: 'drop-shadow(0 0 3px rgba(0,217,255,0.8))' }} />
                          <path d="M-6,-12 L6,-12 L10,-32 L-10,-32 Z" fill="currentColor" />
                          <path d="M-6,-12 L6,-12 L10,-32 L-10,-32 Z" fill="currentColor" transform="rotate(120)" />
                          <path d="M-6,-12 L6,-12 L10,-32 L-10,-32 Z" fill="currentColor" transform="rotate(240)" />
                          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        </g>
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Section: Progress Bar or Active Telemetry */}
            <div className="w-full flex flex-col items-center gap-3">
              <AnimatePresence mode="wait">
                {phase === 'loading' ? (
                  <motion.div
                    key="progress-bar-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="relative px-2 py-1.5 border border-arc-blue/30 rounded-xl flex items-center bg-arc-blue/5 shadow-[inset_0_0_10px_rgba(0,217,255,0.05)]"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {/* Progress Fill Blocks */}
                    <div className="flex">
                      {Array.from({ length: totalBlocks }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2.5 md:w-3.5 h-4 md:h-5 skew-x-12 mx-[2px] md:mx-[3px] transition-all duration-150 ${
                            idx < filledBlocks
                              ? 'bg-arc-blue shadow-[0_0_6px_rgba(0,217,255,0.8)]'
                              : 'bg-arc-blue/10 border border-arc-blue/20'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="core-ready-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-0.5 text-arc-blue text-[9px] md:text-[11px] font-bold tracking-widest"
                  >
                    <span className="shadow-[0_0_15px_rgba(0,217,255,0.3)] bg-arc-blue/10 px-3 py-1 border border-arc-blue/30 rounded">
                      CORE INITIALIZATION SUCCESSFUL
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terminal code logs at bottom */}
              <div className="w-full min-h-[50px] flex flex-col items-start px-2 py-1.5 border border-arc-blue/10 bg-black/60 rounded-xl text-left">
                <div className="font-mono text-[8px] md:text-[9px] text-terminal-green/80 space-y-0.5 w-full overflow-hidden">
                  {terminalLines.map((line, i) => (
                    <div key={i} className="opacity-65 truncate">{line}</div>
                  ))}
                  {currentLineText && (
                    <div className="truncate">
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen flash transition */}
      {phase === 'transition' && (
        <motion.div
          className="absolute inset-0 bg-arc-blue z-50 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0] }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
