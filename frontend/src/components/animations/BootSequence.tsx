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
            // Allow the 3D HUD to show assembled state for 2.2 seconds
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
  const totalBlocks = 28;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black overflow-hidden select-none font-mono p-6 md:p-8">
      {/* Global CSS animations for full-screen scanning HUD */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sweep {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes spin-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
      `}} />

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-40 opacity-25" />

      {/* Laser Scanning Sweep Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-arc-blue/40 shadow-[0_0_20px_#00d9ff] pointer-events-none z-30" style={{ animation: 'sweep 5s linear infinite' }} />

      {/* Full-screen Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <AnimatePresence mode="wait">
        {phase !== 'transition' && (
          <motion.div
            key="hud-display-fullscreen"
            initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 10, rotateY: -8 }}
            exit={{ opacity: 0, scale: 1.05, rotateX: -20, filter: 'blur(15px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex flex-col justify-between items-center"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1200px',
            }}
          >
            {/* Outer HUD Corner Frame Borders (Fullscreen framing) */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-arc-blue/50" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-arc-blue/50" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-arc-blue/50" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-arc-blue/50" />

            {/* Left & Right Boundary Bracket Accents */}
            <div className="absolute top-1/4 bottom-1/4 left-2 w-2 border-t border-b border-l border-arc-blue/30" />
            <div className="absolute top-1/4 bottom-1/4 right-2 w-2 border-t border-b border-r border-arc-blue/30" />

            {/* TOP HEADER TELEMETRY */}
            <div className="w-full flex justify-between items-center text-[9px] md:text-[11px] text-arc-blue/60 border-b border-arc-blue/15 pb-3 z-10">
              <div className="flex gap-6 items-center">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-arc-blue animate-pulse"></span>SYS_ONLINE</span>
                <span>GRID: 3D_MATRIX_ACTIVE</span>
                <span>SEC_CHAN: STABLE</span>
              </div>
              <div className="font-bold tracking-widest text-arc-blue text-[11px] md:text-[13px] hover:text-white transition-colors duration-300">
                ARC_OS // TACTICAL INTERFACE
              </div>
              <div className="flex gap-6 items-center">
                <span>COORD: S_07_AL</span>
                <span>INITIALIZING: {progress}%</span>
              </div>
            </div>

            {/* MAIN CENTRAL PANEL WITH HONEYCOMB SIDE MODULES */}
            <div className="relative flex-1 w-full flex items-center justify-center">
              
              {/* Left Honeycomb Overlay */}
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none" 
                style={{ transform: 'translateZ(15px)', animation: 'pulse-glow 4s ease-in-out infinite' }}
              >
                <svg width="150" height="300">
                  <defs>
                    <pattern id="hex-left-fs" width="20" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
                      <path d="M10 0 L20 5.77 L20 17.32 L10 23.09 L0 17.32 L0 5.77 Z M10 34.64 L20 40.41 L20 51.96 L10 57.73 L0 51.96 L0 40.41 Z" fill="none" stroke="#00d9ff" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="150" height="300" fill="url(#hex-left-fs)" />
                </svg>
                <div className="text-[8px] text-arc-blue/40 mt-2 tracking-widest">HONEYCOMB_MATRIX_L</div>
              </div>

              {/* Right Honeycomb & Tactical Radar Overlay */}
              <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none" 
                style={{ transform: 'translateZ(15px)', animation: 'pulse-glow 4s ease-in-out infinite' }}
              >
                <svg width="150" height="300">
                  <defs>
                    <pattern id="hex-right-fs" width="20" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
                      <path d="M10 0 L20 5.77 L20 17.32 L10 23.09 L0 17.32 L0 5.77 Z M10 34.64 L20 40.41 L20 51.96 L10 57.73 L0 51.96 L0 40.41 Z" fill="none" stroke="#00d9ff" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="150" height="300" fill="url(#hex-right-fs)" />
                </svg>
                <div className="text-[8px] text-arc-blue/40 mt-2 tracking-widest text-right">HONEYCOMB_MATRIX_R</div>
              </div>

              {/* Center Concentric Gauge & Core Ring Assembly */}
              <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
                
                {/* Outermost circle with notches */}
                <div 
                  className="absolute inset-0 rounded-full border border-arc-blue/20 animate-[spin-clockwise_28s_linear_infinite]"
                  style={{ 
                    borderStyle: 'solid', 
                    borderWidth: '1px', 
                    borderTopColor: '#00d9ff', 
                    borderBottomColor: '#00d9ff',
                    transform: 'translateZ(-20px)'
                  }}
                />

                {/* Concentric Circle 2: Dash Array */}
                <svg className="absolute w-[92%] h-[92%] text-arc-blue/30 animate-[spin-counter_20s_linear_infinite]" viewBox="0 0 100 100" style={{ transform: 'translateZ(-10px)' }}>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" />
                </svg>

                {/* Concentric Circle 3: Double border line */}
                <div 
                  className="absolute w-[80%] h-[80%] rounded-full border-2 border-double border-arc-blue/15 animate-[spin-clockwise_15s_linear_infinite]"
                  style={{ transform: 'translateZ(0px)' }}
                />

                {/* Concentric Circle 4: Thick notched inner ring */}
                <svg className="absolute w-[68%] h-[68%] text-arc-blue/40 animate-[spin-counter_12s_linear_infinite]" viewBox="0 0 100 100" style={{ transform: 'translateZ(10px)' }}>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40 12 8 12" />
                </svg>

                {/* Dynamic Music/Telemetry Equalizer Ladders next to Core */}
                {phase === 'assembled' && (
                  <>
                    {/* Left Ladder */}
                    <div className="absolute left-[20px] md:left-[55px] flex gap-1 h-24 items-end z-25" style={{ transform: 'translateZ(15px)' }}>
                      {leftLadder.map((val, idx) => (
                        <div key={idx} className="w-1.5 md:w-2 flex flex-col gap-0.5">
                          {Array.from({ length: 8 }).map((_, segmentIdx) => (
                            <div
                              key={segmentIdx}
                              className={`h-2 rounded-sm transition-all duration-100 ${
                                segmentIdx < val 
                                  ? 'bg-arc-blue shadow-[0_0_6px_#00d9ff]' 
                                  : 'bg-arc-blue/10'
                              }`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Right Ladder */}
                    <div className="absolute right-[20px] md:right-[55px] flex gap-1 h-24 items-end z-25" style={{ transform: 'translateZ(15px)' }}>
                      {rightLadder.map((val, idx) => (
                        <div key={idx} className="w-1.5 md:w-2 flex flex-col gap-0.5">
                          {Array.from({ length: 8 }).map((_, segmentIdx) => (
                            <div
                              key={segmentIdx}
                              className={`h-2 rounded-sm transition-all duration-100 ${
                                segmentIdx < val 
                                  ? 'bg-arc-blue shadow-[0_0_6px_#00d9ff]' 
                                  : 'bg-arc-blue/10'
                              }`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Central Core Holographic Hexagon */}
                <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center z-30" style={{ transform: 'translateZ(40px)' }}>
                  
                  {/* Glowing Core Hexagon border */}
                  <svg className="absolute w-full h-full text-arc-blue animate-[pulse_1.5s_infinite]" viewBox="0 0 100 100">
                    <polygon
                      points="50,4 92,27 92,73 50,96 8,73 8,27"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.75))' }}
                    />
                  </svg>

                  {/* Dynamic internal state switcher */}
                  <AnimatePresence mode="wait">
                    {phase === 'loading' ? (
                      <motion.div
                        key="progress-display"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <span className="font-orbitron text-2xl md:text-3xl font-extrabold text-arc-blue" style={{ textShadow: '0 0 12px rgba(0, 217, 255, 0.6)' }}>
                          {progress}%
                        </span>
                        <span className="text-[7px] md:text-[9px] text-arc-blue/60 tracking-[0.25em] mt-1 uppercase animate-pulse">
                          CHARGING CORE
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hazard-logo-assembly"
                        initial={{ opacity: 0, rotate: -270, scale: 0.4 }}
                        animate={{ opacity: 1, rotate: 360, scale: 1.1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-16 h-16 md:w-24 md:h-24 text-arc-blue flex items-center justify-center animate-[spin-clockwise_12s_linear_infinite]"
                      >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <g transform="translate(50, 50) scale(1.05)">
                            <circle cx="0" cy="0" r="7" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 217, 255, 0.8))' }} />
                            <path d="M-5,-10 L5,-10 L9,-30 L-9,-30 Z" fill="currentColor" />
                            <path d="M-5,-10 L5,-10 L9,-30 L-9,-30 Z" fill="currentColor" transform="rotate(120)" />
                            <path d="M-5,-10 L5,-10 L9,-30 L-9,-30 Z" fill="currentColor" transform="rotate(240)" />
                            <circle cx="0" cy="0" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                          </g>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: SLEEK WIDE PROGRESS BAR AND INTEGRATED CONSOLE */}
            <div className="w-full max-w-[900px] flex flex-col items-center gap-6 z-10 pb-4">
              
              {/* Stadium Block-filled Progress Bar */}
              <AnimatePresence mode="wait">
                {phase === 'loading' ? (
                  <motion.div
                    key="progress-bar-fs"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4 }}
                    className="relative px-3 py-2 border border-arc-blue/35 rounded-2xl flex items-center bg-arc-blue/5 shadow-[0_0_25px_rgba(0,217,255,0.06)]"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {/* Glowing outer progress bar brackets */}
                    <div className="absolute top-[-4px] bottom-[-4px] left-[10px] right-[10px] border-l border-r border-arc-blue/30 pointer-events-none" />

                    <div className="flex">
                      {Array.from({ length: totalBlocks }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-[8px] md:w-[18px] h-5 md:h-6 skew-x-12 mx-[2px] md:mx-[3.5px] transition-all duration-150 rounded-sm ${
                            idx < filledBlocks
                              ? 'bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.85)]'
                              : 'bg-arc-blue/10 border border-arc-blue/15'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-glow"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-1 font-bold tracking-[0.3em] text-arc-blue text-[11px] md:text-[13px]"
                  >
                    <span className="shadow-[0_0_20px_rgba(0,217,255,0.4)] bg-arc-blue/10 px-5 py-1.5 border-2 border-arc-blue/40 rounded-xl animate-pulse">
                      CORE INITIALIZATION SUCCESS
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Integrated terminal output logs at bottom */}
              <div className="w-full flex gap-4 items-end justify-between">
                
                {/* Left corner console status */}
                <div className="hidden md:flex flex-col gap-1 items-start text-left text-[8px] text-arc-blue/40 tracking-wider">
                  <span>PERSPECTIVE_ROT: Y_MINUS_8_DEG</span>
                  <span>SYSTEM_CORES: INTEL_ARC_QUANTUM</span>
                  <span>SYS_MEMORY: 100%_ALLOCATED</span>
                </div>

                {/* Central Console Terminal */}
                <div className="flex-1 max-w-[560px] min-h-[60px] flex flex-col items-start px-4 py-2 border border-arc-blue/15 bg-black/70 rounded-2xl text-left shadow-[0_0_15px_rgba(0,200,255,0.02)]">
                  <div className="font-mono text-[9px] md:text-[10px] text-terminal-green/80 space-y-0.5 w-full overflow-hidden">
                    {terminalLines.map((line, i) => (
                      <div key={i} className="opacity-65 truncate">{line}</div>
                    ))}
                    {currentLineText && (
                      <div className="truncate text-arc-blue/90">
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

                {/* Right corner console status */}
                <div className="hidden md:flex flex-col gap-1 items-end text-right text-[8px] text-arc-blue/40 tracking-wider">
                  <span>WIDGET_CODE: NUK3D_TACTICAL</span>
                  <span>INTERFACE_LEVEL: MASTER_Z</span>
                  <span>STATUS: SECURE_LINK</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full screen flash transition */}
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
