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

  // Loading progress counter
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = Math.floor(Math.random() * 6) + 3; // Increment by 3-8%
        const next = Math.min(prev + step, 100);

        if (next < 100) {
          // Play subtle typewriter click sound on progress ticks
          if (Math.random() > 0.35) {
            audioService.playTypeClick();
          }
        } else {
          // Finished loading
          clearInterval(interval);
          audioService.playDiagnosticPing();
          // Short delay before transitioning to assembled core HUD
          setTimeout(() => {
            setPhase('assembled');
            // Allow assembled state to showcase details for 2.6 seconds
            setTimeout(() => {
              setPhase('transition');
              setTimeout(onComplete, 800);
            }, 2600);
          }, 300);
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
        if (Math.random() > 0.5) {
          audioService.playTypeClick();
        }
        setTimeout(typeChar, 40);
      } else {
        setTerminalLines((prev) => [...prev, line.text]);
        setCurrentLineText('');
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, line.pauseMs);
      }
    };

    typeChar();
  }, [currentLineIndex]);

  useEffect(() => {
    typeNextLine();
  }, [currentLineIndex, typeNextLine]);

  // Spherical grid generator
  const renderSphericalGrid = () => {
    const lines = [];
    const resolution = 20;
    for (let i = 1; i < resolution; i++) {
      const ratio = i / resolution;
      const pos = ratio * 1000;
      
      // Curved horizontal grid lines
      const controlY = pos + (ratio - 0.5) * -160;
      lines.push(
        <path
          key={`h-${i}`}
          d={`M 50,${pos} Q 500,${controlY} 950,${pos}`}
          stroke="rgba(0, 217, 255, 0.09)"
          strokeWidth="0.8"
          fill="none"
        />
      );

      // Curved vertical grid lines
      const controlX = pos + (ratio - 0.5) * -160;
      lines.push(
        <path
          key={`v-${i}`}
          d={`M ${pos},50 Q ${controlX},500 ${pos},950`}
          stroke="rgba(0, 217, 255, 0.09)"
          strokeWidth="0.8"
          fill="none"
        />
      );
    }
    return lines;
  };

  // Progress Bar Slanted Blocks
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const renderSlantedBlocks = () => {
    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
      // Slanted blocks that fit inside the container
      const xTop = 270 + i * 23;
      const xBottom = xTop - 32;

      const isFilled = i < filledBlocks;
      blocks.push(
        <polygon
          key={i}
          points={`${xTop},462 ${xTop + 14},462 ${xBottom + 14},538 ${xBottom},538`}
          fill={isFilled ? '#00d9ff' : 'none'}
          stroke={isFilled ? 'none' : 'rgba(0, 217, 255, 0.25)'}
          strokeWidth={isFilled ? 0 : 1.2}
          style={{
            filter: isFilled ? 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.85))' : 'none',
            transition: 'fill 0.15s ease, stroke 0.15s ease'
          }}
        />
      );
    }
    return blocks;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none font-mono">
      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes sweep-line {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}} />

      {/* Futuristic Scanline Layer */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[size:100%_4px] z-40 opacity-20" />

      {/* Continuous Laser Radar Sweep */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-arc-blue/35 shadow-[0_0_15px_#00d9ff] pointer-events-none z-30" style={{ animation: 'sweep-line 6s linear infinite' }} />

      {/* Main Fullscreen HUD Canvas */}
      <div className="relative w-full h-full max-w-[1400px] max-h-[900px] flex flex-col items-center justify-between p-6 md:p-8">
        
        {/* TOP STATUS BAR */}
        <div className="w-full flex justify-between items-center text-[9px] md:text-[11px] text-arc-blue/50 border-b border-arc-blue/15 pb-3 z-10">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-arc-blue animate-pulse"></span>SYS_READY</span>
            <span>SEC: MAIN_FRAME</span>
          </div>
          <div className="font-bold tracking-widest text-arc-blue/80 text-[11px] md:text-[13px]">
            ARC_OS // HUD INTERFACE v3.2
          </div>
          <div className="flex gap-6 items-center">
            <span>CHARGE: {progress}%</span>
            <span>GRID: SPHERICAL_ON</span>
          </div>
        </div>

        {/* HUD CONTENT AREA */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          
          {/* Main Fullscreen Vector Graphics SVG */}
          <svg 
            className="w-full h-full max-w-[850px] max-h-[600px] text-arc-blue"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. Curved Spherical CRT Grid Background */}
            <g mask="url(#grid-mask)">
              {renderSphericalGrid()}
            </g>

            {/* Radial Gradient mask for curved grid fadeout at borders */}
            <defs>
              <radialGradient id="grid-glow" cx="50%" cy="50%" r="50%">
                <stop offset="40%" stopColor="#white" stopOpacity="1" />
                <stop offset="90%" stopColor="#white" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#white" stopOpacity="0" />
              </radialGradient>
              <mask id="grid-mask">
                <circle cx="500" cy="500" r="480" fill="url(#grid-glow)" />
              </mask>
            </defs>

            {/* 2. Outer Lens-Shaped Bounding Outline */}
            <path
              d="M 100,500 Q 500,160 900,500 Q 500,840 100,500 Z"
              stroke="rgba(0, 217, 255, 0.25)"
              strokeWidth="1.2"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 217, 255, 0.15))' }}
            />

            {/* Outer Lens decorative bracket corner notches */}
            <path d="M 500,190 L 520,200 M 500,190 L 480,200" stroke="rgba(0, 217, 255, 0.5)" strokeWidth="1.5" />
            <path d="M 500,810 L 520,800 M 500,810 L 480,800" stroke="rgba(0, 217, 255, 0.5)" strokeWidth="1.5" />

            {/* Vertex triangles on the far edges */}
            <polygon points="110,496 110,504 118,500" fill="rgba(0, 217, 255, 0.6)" />
            <polygon points="890,496 890,504 882,500" fill="rgba(0, 217, 255, 0.6)" />

            {/* 3. Progress Bar Phase (0-99% progress) */}
            <g style={{ display: phase === 'loading' ? 'block' : 'none' }}>
              {/* Outer stadium progress border */}
              <polygon
                points="248,446 752,446 786,554 214,554"
                stroke="rgba(0, 217, 255, 0.4)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Inner stadium progress border */}
              <polygon
                points="254,452 746,452 778,548 222,548"
                stroke="#00d9ff"
                strokeWidth="2"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.45))' }}
              />

              {/* Slanted Blocks */}
              {renderSlantedBlocks()}

              {/* Hexagon core frame blocking blocks behind it */}
              <polygon
                points="500,432 555,465 555,535 500,568 445,535 445,465"
                fill="black"
                stroke="#00d9ff"
                strokeWidth="2.5"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.65))' }}
              />
              
              {/* Progress text inside hexagon */}
              <text
                x="500"
                y="506"
                fill="#00d9ff"
                fontSize="24"
                fontWeight="900"
                textAnchor="middle"
                style={{
                  fontFamily: 'Orbitron, monospace',
                  textShadow: '0 0 10px rgba(0, 217, 255, 0.6)'
                }}
              >
                {progress}
              </text>
              <text
                x="500"
                y="522"
                fill="rgba(0, 217, 255, 0.5)"
                fontSize="7"
                fontWeight="bold"
                letterSpacing="1.5"
                textAnchor="middle"
              >
                CHARGING
              </text>
            </g>

            {/* 4. Concentric Dials & Hazard Core (Assembled Phase) */}
            <g style={{ display: phase !== 'loading' ? 'block' : 'none' }}>
              
              {/* Large Outermost Notched Circle */}
              <circle
                cx="500"
                cy="500"
                r="220"
                stroke="rgba(0, 217, 255, 0.18)"
                strokeWidth="1"
                strokeDasharray="160 40 10 40"
                style={{ transformOrigin: '500px 500px', animation: 'spin-clockwise 24s linear infinite' }}
              />

              {/* Micro Scale Tick Circle */}
              <circle
                cx="500"
                cy="500"
                r="195"
                stroke="rgba(0, 217, 255, 0.28)"
                strokeWidth="1.2"
                strokeDasharray="2 4"
                style={{ transformOrigin: '500px 500px', animation: 'spin-counter 18s linear infinite' }}
              />

              {/* Top and Bottom Arcs */}
              <path
                d="M 330,370 A 180,180 0 0,1 670,370"
                stroke="#00d9ff"
                strokeWidth="3.5"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0, 217, 255, 0.6))' }}
              />
              <path
                d="M 330,630 A 180,180 0 0,0 670,630"
                stroke="#00d9ff"
                strokeWidth="3.5"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0, 217, 255, 0.6))' }}
              />

              {/* Triangles on top / bottom of center rings */}
              <polygon points="500,328 493,317 507,317" fill="#00d9ff" />
              <polygon points="500,672 493,683 507,683" fill="#00d9ff" />

              {/* Inner Double Ring Dial */}
              <circle
                cx="500"
                cy="500"
                r="155"
                stroke="rgba(0, 217, 255, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="60 14 12 14"
                style={{ transformOrigin: '500px 500px', animation: 'spin-clockwise 10s linear infinite' }}
              />

              {/* Inner Solid Border Ring */}
              <circle
                cx="500"
                cy="500"
                r="135"
                stroke="rgba(0, 217, 255, 0.15)"
                strokeWidth="1"
              />

              {/* CORE HAZARD SYMBOL ASSEMBLY (Pulsing and rotating) */}
              <g 
                style={{ transformOrigin: '500px 500px' }}
                className="animate-[spin-clockwise_16s_linear_infinite]"
              >
                {/* Center dot */}
                <circle 
                  cx="500" 
                  cy="500" 
                  r="12" 
                  fill="#00d9ff" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.95))' }}
                />

                {/* Nuclear hazard warning blades */}
                <g fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.85))' }}>
                  <path d="M 490,470 L 510,470 L 520,410 L 480,410 Z" />
                  <path d="M 490,470 L 510,470 L 520,410 L 480,410 Z" transform="rotate(120, 500, 500)" />
                  <path d="M 490,470 L 510,470 L 520,410 L 480,410 Z" transform="rotate(240, 500, 500)" />
                </g>

                {/* Inner core safety dash line */}
                <circle 
                  cx="500" 
                  cy="500" 
                  r="24" 
                  stroke="#00d9ff" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />
              </g>

              {/* NUK3D Core Tag Overlay */}
              <g transform="translate(500, 600)">
                <rect 
                  x="-40" 
                  y="-10" 
                  width="80" 
                  height="20" 
                  fill="#00d9ff" 
                  rx="3" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.8))' }}
                />
                <text 
                  x="0" 
                  y="4" 
                  fill="black" 
                  fontSize="9.5" 
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

        {/* BOTTOM HUD SECTION (LOGS & ACTIVE TERMINAL) */}
        <div className="w-full max-w-[800px] flex flex-col items-center gap-4 z-10">
          
          <AnimatePresence>
            {phase === 'assembled' && (
              <motion.div
                key="system-ready-tag"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-arc-blue text-[10px] md:text-[12px] font-bold tracking-[0.25em]"
              >
                <span className="shadow-[0_0_20px_rgba(0,217,255,0.45)] bg-arc-blue/10 px-6 py-2 border-2 border-arc-blue/45 rounded-xl animate-pulse">
                  SYSTEM CORE CHARGING COMPLETE // STABLE
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex gap-4 items-end justify-between">
            {/* Left corner mini statuses */}
            <div className="hidden md:flex flex-col gap-1 items-start text-left text-[8px] text-arc-blue/35 tracking-wider">
              <span>CRT_WARP: 16%_SPHERICAL</span>
              <span>GRID_MAP: CYCLIC_ON</span>
            </div>

            {/* Typewriter Code Terminal */}
            <div className="flex-1 max-w-[500px] min-h-[64px] flex flex-col items-start px-4 py-2.5 border border-arc-blue/15 bg-black/80 rounded-2xl text-left shadow-[0_0_15px_rgba(0,217,255,0.02)]">
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

            {/* Right corner mini statuses */}
            <div className="hidden md:flex flex-col gap-1 items-end text-right text-[8px] text-arc-blue/35 tracking-wider">
              <span>PERSPECTIVE: TILT_10D</span>
              <span>TACTICAL: HUD_ONLINE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Screen flash warp transition */}
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
