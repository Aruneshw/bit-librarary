'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Dynamic telemetry values that change rapidly to look authentic and complex
  const [voltage, setVoltage] = useState('1.205V');
  const [temp, setTemp] = useState('42.8°C');
  const [dataStream, setDataStream] = useState<string[]>([]);

  // Equalizer ladders values
  const [leftLadder, setLeftLadder] = useState<number[]>([3, 5, 2, 6, 4, 7, 3, 5]);
  const [rightLadder, setRightLadder] = useState<number[]>([4, 2, 7, 5, 3, 6, 2, 4]);

  // Ref to track typing timer
  const typeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 450);
    return () => clearInterval(interval);
  }, []);

  // Rapidly updating telemetry values
  useEffect(() => {
    const interval = setInterval(() => {
      setVoltage((1.18 + Math.random() * 0.05).toFixed(3) + 'V');
      setTemp((41.5 + Math.random() * 2.5).toFixed(1) + '°C');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Scrolling hex data stream on the margins
  useEffect(() => {
    const interval = setInterval(() => {
      const hexChars = '0123456789ABCDEF';
      let line = '';
      for (let i = 0; i < 4; i++) {
        line += hexChars[Math.floor(Math.random() * 16)] + hexChars[Math.floor(Math.random() * 16)] + ' ';
      }
      setDataStream((prev) => [line, ...prev.slice(0, 12)]);
    }, 150);
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
      }, 70);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Loading progress counter (staggered to take exactly 10 seconds total)
  // Progress takes ~6.5 seconds, Assembled takes ~2.5 seconds, Transition takes 1.0 second.
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Increment by small steps to span ~6.5 seconds (6500ms / 100ms = 65 steps)
        const step = Math.floor(Math.random() * 2) + 1.2; // average 1.5% per tick
        const next = Math.min(prev + step, 100);

        const roundedNext = Math.floor(next);

        if (roundedNext < 100) {
          if (Math.random() > 0.4) {
            audioService.playTypeClick();
          }
        } else {
          // Finished loading
          clearInterval(interval);
          audioService.playDiagnosticPing();
          setTimeout(() => {
            setPhase('assembled');
            setTimeout(() => {
              setPhase('transition');
              setTimeout(onComplete, 1000);
            }, 2500); // 2.5 seconds assembled phase
          }, 300);
        }
        return next;
      });
    }, 100);

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
        if (Math.random() > 0.55) {
          audioService.playTypeClick();
        }
        typeTimerRef.current = setTimeout(typeChar, 45);
      } else {
        setTerminalLines((prev) => [...prev, line.text]);
        setCurrentLineText('');
        typeTimerRef.current = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, line.pauseMs);
      }
    };

    typeChar();
  }, [currentLineIndex]);

  useEffect(() => {
    typeNextLine();
    return () => {
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
    };
  }, [currentLineIndex, typeNextLine]);

  // Progress Bar Slanted Blocks
  const totalBlocks = 24;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const renderSlantedBlocks = () => {
    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
      const xTop = 240 + i * 23;
      const xBottom = xTop - 34;

      const isFilled = i < filledBlocks;
      blocks.push(
        <polygon
          key={i}
          points={`${xTop},458 ${xTop + 14},458 ${xBottom + 14},542 ${xBottom},542`}
          fill={isFilled ? '#00d9ff' : 'none'}
          stroke={isFilled ? 'none' : 'rgba(0, 217, 255, 0.22)'}
          strokeWidth={isFilled ? 0 : 1.2}
          style={{
            filter: isFilled ? 'drop-shadow(0 0 7px rgba(0, 217, 255, 0.95))' : 'none',
            transition: 'fill 0.12s ease, stroke 0.12s ease'
          }}
        />
      );
    }
    return blocks;
  };

  // Curved grid density
  const renderSphericalGrid = () => {
    const lines = [];
    const resolution = 28; // Higher density for more complex detail
    for (let i = 1; i < resolution; i++) {
      const ratio = i / resolution;
      const pos = ratio * 1000;
      
      const controlY = pos + (ratio - 0.5) * -190;
      lines.push(
        <path
          key={`h-${i}`}
          d={`M 30,${pos} Q 500,${controlY} 970,${pos}`}
          stroke="rgba(0, 217, 255, 0.08)"
          strokeWidth="0.6"
          fill="none"
        />
      );

      const controlX = pos + (ratio - 0.5) * -190;
      lines.push(
        <path
          key={`v-${i}`}
          d={`M ${pos},30 Q ${controlX},500 ${pos},970`}
          stroke="rgba(0, 217, 255, 0.08)"
          strokeWidth="0.6"
          fill="none"
        />
      );
    }
    return lines;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black overflow-hidden select-none font-mono p-4 md:p-8">
      {/* Dynamic scanlines & rotations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes scan-radar {
          0% { transform: translateY(-100vh); opacity: 0; }
          15% { opacity: 0.45; }
          85% { opacity: 0.45; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulse-glowing {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
      `}} />

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-40 opacity-25" />

      {/* Laser Radar Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-arc-blue/35 shadow-[0_0_20px_#00d9ff] pointer-events-none z-30" style={{ animation: 'scan-radar 7s linear infinite' }} />

      {/* CRT Vignette/Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] z-20" />

      {/* Fullscreen Canvas Wrapper */}
      <div className="relative w-full h-full max-w-[1450px] max-h-[950px] flex flex-col items-center justify-between z-10">
        
        {/* TOP STATUS SYSTEM BAR */}
        <div className="w-full flex justify-between items-center text-[8px] md:text-[10px] text-arc-blue/50 border-b border-arc-blue/15 pb-2.5">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-arc-blue animate-pulse"></span>ARC_SYS: CHARGING</span>
            <span>CORE_VOLT: {voltage}</span>
            <span>TEMP: {temp}</span>
          </div>
          <div className="font-bold tracking-[0.2em] text-arc-blue text-[10px] md:text-[12px] animate-pulse">
            ARC_OS // DETAILED DIAGNOSTICS SCREEN
          </div>
          <div className="flex gap-6 items-center">
            <span>CHARGE: {Math.floor(progress)}%</span>
            <span>CYCLES: 4328Hz</span>
            <span>SECURE_LINK</span>
          </div>
        </div>

        {/* HUD CONTENT CANVAS */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          
          {/* Scrolling hex code streams on far margins for high complexity */}
          <div className="absolute left-2 top-1/4 bottom-1/4 hidden xl:flex flex-col text-[7px] text-arc-blue/25 text-left select-none overflow-hidden h-[300px]">
            {dataStream.map((line, idx) => (
              <div key={idx} className="font-mono tracking-wider">{line}</div>
            ))}
          </div>
          <div className="absolute right-2 top-1/4 bottom-1/4 hidden xl:flex flex-col text-[7px] text-arc-blue/25 text-right select-none overflow-hidden h-[300px]">
            {dataStream.map((line, idx) => (
              <div key={idx} className="font-mono tracking-wider">{line}</div>
            ))}
          </div>

          <svg 
            className="w-full h-full max-w-[900px] max-h-[650px] text-arc-blue"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. Curved CRT Spherical Grid */}
            <g mask="url(#grid-mask-fs)">
              {renderSphericalGrid()}
            </g>

            <defs>
              <radialGradient id="grid-glow-fs" cx="50%" cy="50%" r="50%">
                <stop offset="35%" stopColor="white" stopOpacity="0.9" />
                <stop offset="85%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="grid-mask-fs">
                <circle cx="500" cy="500" r="480" fill="url(#grid-glow-fs)" />
              </mask>
            </defs>

            {/* Floating micro target crosshairs for complexity */}
            <path d="M 200,250 L 210,250 M 205,245 L 205,255" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="205" cy="250" r="8" stroke="rgba(0, 217, 255, 0.12)" strokeWidth="0.5" />
            <path d="M 790,250 L 800,250 M 795,245 L 795,255" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="795" cy="250" r="8" stroke="rgba(0, 217, 255, 0.12)" strokeWidth="0.5" />

            {/* 2. Lens Bounding Frame */}
            <path
              d="M 80,500 Q 500,140 920,500 Q 500,860 80,500 Z"
              stroke="rgba(0, 217, 255, 0.2)"
              strokeWidth="1"
              fill="none"
            />
            {/* Secondary concentric lens outline */}
            <path
              d="M 94,500 Q 500,160 906,500 Q 500,840 94,500 Z"
              stroke="rgba(0, 217, 255, 0.12)"
              strokeWidth="0.8"
              fill="none"
            />

            {/* Vertex triangles on the far edges */}
            <polygon points="90,495 90,505 98,500" fill="rgba(0, 217, 255, 0.6)" />
            <polygon points="910,495 910,505 902,500" fill="rgba(0, 217, 255, 0.6)" />

            {/* Decorative ticks on top/bottom of lens */}
            <path d="M 500,172 L 525,182 M 500,172 L 475,182" stroke="rgba(0, 217, 255, 0.45)" strokeWidth="1.5" />
            <path d="M 500,828 L 525,818 M 500,828 L 475,818" stroke="rgba(0, 217, 255, 0.45)" strokeWidth="1.5" />

            {/* 3. Skewed Loading Bar Container (0-99% progress) */}
            <g style={{ display: phase === 'loading' ? 'block' : 'none' }}>
              
              {/* Outer stadium outline */}
              <polygon
                points="218,446 782,446 816,554 184,554"
                stroke="rgba(0, 217, 255, 0.35)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Inner stadium outline */}
              <polygon
                points="224,452 776,452 808,548 192,548"
                stroke="#00d9ff"
                strokeWidth="1.8"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.5))' }}
              />

              {/* Slanted Blocks */}
              {renderSlantedBlocks()}

              {/* Hexagon core mask container */}
              <polygon
                points="500,432 555,465 555,535 500,568 445,535 445,465"
                fill="black"
                stroke="#00d9ff"
                strokeWidth="2.5"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.75))' }}
              />
              
              {/* Charging text */}
              <text
                x="500"
                y="505"
                fill="#00d9ff"
                fontSize="24"
                fontWeight="900"
                textAnchor="middle"
                style={{
                  fontFamily: 'Orbitron, monospace',
                  textShadow: '0 0 10px rgba(0, 217, 255, 0.65)'
                }}
              >
                {Math.floor(progress)}
              </text>
              <text
                x="500"
                y="521"
                fill="rgba(0, 217, 255, 0.5)"
                fontSize="7.5"
                fontWeight="bold"
                letterSpacing="2"
                textAnchor="middle"
              >
                CORE CHARGING
              </text>
            </g>

            {/* 4. Highly Complex Concentric Dial Assembly (Assembled Phase) */}
            <g style={{ display: phase !== 'loading' ? 'block' : 'none' }}>
              
              {/* Outermost dotted circular boundary */}
              <circle
                cx="500"
                cy="500"
                r="240"
                stroke="rgba(0, 217, 255, 0.12)"
                strokeWidth="0.8"
                strokeDasharray="4 8"
              />

              {/* Compass ticks circle */}
              <circle
                cx="500"
                cy="500"
                r="225"
                stroke="rgba(0, 217, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="2 38"
                style={{ transformOrigin: '500px 500px', animation: 'spin-clockwise 30s linear infinite' }}
              />

              {/* Concentric Circle 1: Notched Dial */}
              <circle
                cx="500"
                cy="500"
                r="215"
                stroke="rgba(0, 217, 255, 0.18)"
                strokeWidth="1.2"
                strokeDasharray="140 40 12 40"
                style={{ transformOrigin: '500px 500px', animation: 'spin-clockwise 20s linear infinite' }}
              />

              {/* Concentric Circle 2: Fine ruler scales */}
              <circle
                cx="500"
                cy="500"
                r="192"
                stroke="rgba(0, 217, 255, 0.28)"
                strokeWidth="1"
                strokeDasharray="2 4"
                style={{ transformOrigin: '500px 500px', animation: 'spin-counter 15s linear infinite' }}
              />

              {/* Top/Bottom Segment Arcs */}
              <path
                d="M 330,366 A 184,184 0 0,1 670,366"
                stroke="#00d9ff"
                strokeWidth="3.5"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0, 217, 255, 0.6))' }}
              />
              <path
                d="M 330,634 A 184,184 0 0,0 670,634"
                stroke="#00d9ff"
                strokeWidth="3.5"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0, 217, 255, 0.6))' }}
              />

              {/* Inner dials */}
              <circle
                cx="500"
                cy="500"
                r="160"
                stroke="rgba(0, 217, 255, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="70 15 15 15"
                style={{ transformOrigin: '500px 500px', animation: 'spin-clockwise 12s linear infinite' }}
              />

              <circle
                cx="500"
                cy="500"
                r="140"
                stroke="rgba(0, 217, 255, 0.12)"
                strokeWidth="0.8"
              />

              {/* Triangles surrounding dials */}
              <polygon points="500,324 493,313 507,313" fill="#00d9ff" />
              <polygon points="500,676 493,687 507,687" fill="#00d9ff" />
              <polygon points="324,500 313,493 313,507" fill="#00d9ff" />
              <polygon points="676,500 687,493 687,507" fill="#00d9ff" />

              {/* ROTATING HAZARD SYMBOL CORE */}
              <g 
                style={{ transformOrigin: '500px 500px' }}
                className="animate-[spin-clockwise_18s_linear_infinite]"
              >
                {/* Core solid center node */}
                <circle 
                  cx="500" 
                  cy="500" 
                  r="13" 
                  fill="#00d9ff" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.95))' }}
                />

                {/* Highly-accurate nuclear wedges */}
                <g fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.85))' }}>
                  <path d="M 490,468 L 510,468 L 522,406 L 478,406 Z" />
                  <path d="M 490,468 L 510,468 L 522,406 L 478,406 Z" transform="rotate(120, 500, 500)" />
                  <path d="M 490,468 L 510,468 L 522,406 L 478,406 Z" transform="rotate(240, 500, 500)" />
                </g>

                {/* Nested safety ring */}
                <circle 
                  cx="500" 
                  cy="500" 
                  r="25" 
                  stroke="#00d9ff" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />
              </g>

              {/* NUK3D Core Tag Overlay */}
              <g transform="translate(500, 596)">
                <rect 
                  x="-35" 
                  y="-9" 
                  width="70" 
                  height="18" 
                  fill="#00d9ff" 
                  rx="3" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.8))' }}
                />
                <text 
                  x="0" 
                  y="3.5" 
                  fill="black" 
                  fontSize="9" 
                  fontWeight="bold" 
                  textAnchor="middle" 
                  letterSpacing="2"
                >
                  NUK3D
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* BOTTOM SECTION: CONSOLE LOGGER AND DATA LADDERS */}
        <div className="w-full max-w-[850px] flex flex-col items-center gap-4">
          
          {/* Dynamic Music/Telemetry Equalizer Ladders next to Core */}
          {phase === 'assembled' && (
            <div className="flex gap-24 justify-center items-center h-8 z-25">
              {/* Left Ladder */}
              <div className="flex gap-1 h-6 items-end">
                {leftLadder.map((val, idx) => (
                  <div key={idx} className="w-2 flex flex-col gap-0.5">
                    {Array.from({ length: 8 }).map((_, segmentIdx) => (
                      <div
                        key={segmentIdx}
                        className={`h-1 rounded-sm transition-all duration-100 ${
                          segmentIdx < val 
                            ? 'bg-arc-blue shadow-[0_0_5px_#00d9ff]' 
                            : 'bg-arc-blue/10'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Status Header Badge */}
              <span className="shadow-[0_0_15px_rgba(0,217,255,0.4)] bg-arc-blue/15 px-4 py-1.5 border border-arc-blue/30 rounded-xl text-arc-blue text-[9px] md:text-[11px] font-bold tracking-[0.25em] animate-pulse">
                CORE STATUS: FULLY ASSEMBLED
              </span>

              {/* Right Ladder */}
              <div className="flex gap-1 h-6 items-end">
                {rightLadder.map((val, idx) => (
                  <div key={idx} className="w-2 flex flex-col gap-0.5">
                    {Array.from({ length: 8 }).map((_, segmentIdx) => (
                      <div
                        key={segmentIdx}
                        className={`h-1 rounded-sm transition-all duration-100 ${
                          segmentIdx < val 
                            ? 'bg-arc-blue shadow-[0_0_5px_#00d9ff]' 
                            : 'bg-arc-blue/10'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Console Box */}
          <div className="w-full flex gap-4 items-end justify-between">
            <div className="hidden md:flex flex-col gap-1 items-start text-left text-[8px] text-arc-blue/35 tracking-wider">
              <span>VOLTAGE: {voltage}</span>
              <span>GRID_CYCLES: 4328Hz</span>
            </div>

            {/* Typewriter Code Terminal */}
            <div className="flex-1 max-w-[500px] min-h-[66px] flex flex-col items-start px-4.5 py-2.5 border border-arc-blue/15 bg-black/85 rounded-2xl text-left shadow-[0_0_15px_rgba(0,217,255,0.015)]">
              <div className="font-mono text-[9px] md:text-[10px] text-terminal-green/80 space-y-0.5 w-full overflow-hidden">
                {terminalLines.map((line, i) => (
                  <div key={i} className="opacity-60 truncate">{line}</div>
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

            <div className="hidden md:flex flex-col gap-1 items-end text-right text-[8px] text-arc-blue/35 tracking-wider">
              <span>PERSPECTIVE: TILT_10D</span>
              <span>WIDGET_CODE: NUK3D_FS</span>
            </div>
          </div>

        </div>

      </div>

      {/* Screen flash transition warp */}
      {phase === 'transition' && (
        <motion.div
          className="absolute inset-0 bg-arc-blue z-50 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0] }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
