'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HudFrontPageProps {
  onEnter: () => void;
}

// ── Random hex generator ──
function randomHex(len: number) {
  const chars = '0123456789ABCDEF';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * 16)];
  return s;
}

// ── Boot sequence lines ──
const BOOT_LINES = [
  '> SYSTEM BOOT INITIATED...',
  '> LOADING KERNEL v4.2.7...',
  '> INITIALIZING NEURAL INTERFACE...',
  '> CONNECTING TO KNOWLEDGE DATABASE...',
  '> DECRYPTION MATRIX: ONLINE',
  '> FIREWALL PROTOCOL: ACTIVE',
  '> QUANTUM ENCRYPTION: AES-512',
  '> NODE SYNCHRONIZATION: 99.2%',
  '> UPLINK STATUS: STABLE',
  '> SYSTEM READY.',
  '> AWAITING OPERATOR INPUT...',
];

// ── Matrix rain character set ──
const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

// ── Canvas-based Matrix Rain ──
function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is brighter
        if (drops[i] > 0) {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.9)';
          ctx.fillText(char, x, y);

          // Trail characters fade
          ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
          const prevChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          if (drops[i] > 1) ctx.fillText(prevChar, x, y - fontSize);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
}

// ── Terminal Boot Text ──
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= BOOT_LINES.length) {
      setTimeout(onComplete, 600);
      return;
    }

    const line = BOOT_LINES[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 15 + Math.random() * 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 80 + Math.random() * 120);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentChar]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-[11px] md:text-xs leading-relaxed text-terminal-green/80 overflow-hidden max-h-[180px] md:max-h-[220px]"
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap" style={{ opacity: 0.5 + (i / lines.length) * 0.5 }}>
          {line}
        </div>
      ))}
      {currentLine < BOOT_LINES.length && (
        <div className="whitespace-nowrap">
          {BOOT_LINES[currentLine].slice(0, currentChar)}
          <span className="animate-pulse text-terminal-green">█</span>
        </div>
      )}
    </div>
  );
}

// ── Scrolling Hex Data Panel ──
function HexDataPanel({ side, rows = 10 }: { side: 'left' | 'right'; rows?: number }) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: rows }, (_, i) =>
      `0x${randomHex(4)} ${randomHex(8)} ${randomHex(4)}`
    );
    setData(initial);

    const interval = setInterval(() => {
      setData(prev => [
        ...prev.slice(1),
        `0x${randomHex(4)} ${randomHex(8)} ${randomHex(4)}`,
      ]);
    }, 600 + Math.random() * 400);

    return () => clearInterval(interval);
  }, [rows]);

  return (
    <div
      className={`absolute top-20 ${side === 'left' ? 'left-3 md:left-6' : 'right-3 md:right-6'} font-mono text-[8px] md:text-[10px] text-terminal-green/40 select-none pointer-events-none space-y-[2px] hidden sm:block`}
    >
      <div className="text-terminal-green/60 mb-1 text-[7px] md:text-[9px] uppercase tracking-widest">
        {side === 'left' ? '[ DATA_STREAM_A ]' : '[ DATA_STREAM_B ]'}
      </div>
      {data.map((line, i) => (
        <div key={`${i}-${line}`} style={{ opacity: 0.3 + (i / data.length) * 0.7 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

// ── Waveform Display ──
function WaveformDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Green waveform
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin((x + frame) * 0.03) * 8 +
          Math.sin((x + frame * 1.5) * 0.07) * 5 +
          Math.cos((x + frame * 0.5) * 0.05) * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Cyan waveform
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.cos((x + frame * 1.2) * 0.04) * 6 +
          Math.sin((x + frame * 0.8) * 0.09) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      frame += 2;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={280} height={40} className="w-full max-w-[280px]" />;
}

// ── Status Readout Bar ──
function StatusBar({ label, value, color = 'green' }: { label: string; value: number; color?: 'green' | 'cyan' }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        if (prev >= value) return value;
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [value]);

  const barColor = color === 'green' ? 'rgba(0, 255, 65, 0.6)' : 'rgba(0, 217, 255, 0.6)';
  const bgColor = color === 'green' ? 'rgba(0, 255, 65, 0.08)' : 'rgba(0, 217, 255, 0.08)';
  const textColor = color === 'green' ? 'text-terminal-green/60' : 'text-arc-blue/60';

  return (
    <div className="space-y-[2px]">
      <div className={`flex justify-between font-mono text-[8px] md:text-[9px] ${textColor} uppercase tracking-wider`}>
        <span>{label}</span>
        <span>{current}%</span>
      </div>
      <div className="h-[2px] rounded-full overflow-hidden" style={{ background: bgColor }}>
        <div
          className="h-full rounded-full transition-all duration-75"
          style={{ width: `${current}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

// ── Rotating Status Labels ──
function RotatingStatus() {
  const labels = [
    'SYS CONNECTED', 'FIREWALL: ACTIVE', 'ENCRYPTION: ON',
    'NODE SYNC: 99.2%', 'UPLINK: STABLE', 'AUTH: VERIFIED',
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % labels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [labels.length]);

  return (
    <div className="font-mono text-[8px] md:text-[10px] text-terminal-green/50 tracking-widest flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
      <span key={idx}>{labels[idx]}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════
// ██ MAIN HUD FRONT PAGE COMPONENT
// ══════════════════════════════════════════════════
export default function HudFrontPage({ onEnter }: HudFrontPageProps) {
  const [phase, setPhase] = useState<'boot' | 'ready'>('boot');
  const [timeStr, setTimeStr] = useState('');

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBootComplete = useCallback(() => {
    setPhase('ready');
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden select-none">
      {/* ── Matrix Rain Background ── */}
      <MatrixRainCanvas />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── Scanline effect ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      {/* ── Corner brackets ── */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-terminal-green/30" />
      <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-terminal-green/30" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-terminal-green/30" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-terminal-green/30" />

      {/* ── Top status bar ── */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-3 md:px-6 border-b border-terminal-green/10 z-20">
        <RotatingStatus />
        <div className="font-mono text-[9px] md:text-[10px] text-terminal-green/40 tracking-widest tabular-nums">
          {timeStr}
        </div>
      </div>

      {/* ── Hex data streams ── */}
      <HexDataPanel side="left" rows={12} />
      <HexDataPanel side="right" rows={12} />

      {/* ── CENTRAL CONTENT ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Title block */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="font-mono text-[9px] md:text-[10px] text-terminal-green/30 tracking-[6px] md:tracking-[10px] uppercase mb-2">
            ─── SECURE TERMINAL ───
          </div>
          <h1
            className="font-orbitron text-xl sm:text-2xl md:text-4xl font-bold text-terminal-green tracking-[0.15em] md:tracking-[0.2em]"
            style={{
              textShadow: '0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2)',
            }}
          >
            BIT LIBRARY
          </h1>
          <div className="font-rajdhani text-[10px] md:text-xs text-terminal-green/30 uppercase tracking-[4px] md:tracking-[6px] mt-1">
            ACADEMIC KNOWLEDGE NEXUS
          </div>
        </motion.div>

        {/* Boot sequence terminal */}
        <motion.div
          className="w-full max-w-sm md:max-w-md border border-terminal-green/15 rounded bg-black/60 p-3 md:p-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            boxShadow: '0 0 30px rgba(0,255,65,0.05), inset 0 0 30px rgba(0,255,65,0.02)',
          }}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-terminal-green/10">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-terminal-green/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-terminal-green/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-terminal-green/10" />
            </div>
            <span className="font-mono text-[8px] md:text-[9px] text-terminal-green/30 tracking-widest uppercase">
              sys://bit-library/init
            </span>
          </div>
          <BootSequence onComplete={handleBootComplete} />
        </motion.div>

        {/* Waveform + status bars */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              className="flex flex-col items-center gap-4 w-full max-w-sm md:max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Waveform */}
              <div className="w-full border border-terminal-green/10 rounded p-2 bg-black/40">
                <div className="font-mono text-[7px] md:text-[8px] text-terminal-green/30 tracking-wider mb-1">
                  SIGNAL WAVEFORM
                </div>
                <WaveformDisplay />
              </div>

              {/* Status bars */}
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 border border-terminal-green/10 rounded p-3 bg-black/40">
                <StatusBar label="DATABASE" value={98} color="green" />
                <StatusBar label="NEURAL NET" value={87} color="cyan" />
                <StatusBar label="CORE SYS" value={100} color="green" />
                <StatusBar label="ENCRYPTION" value={95} color="cyan" />
              </div>

              {/* ENTER SYSTEM Button */}
              <motion.button
                id="hud-enter-button"
                onClick={onEnter}
                className="relative group cursor-pointer mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Outer border pulse */}
                <div className="absolute -inset-2 rounded border border-terminal-green/0 group-hover:border-terminal-green/30 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]" />

                {/* Button body */}
                <div
                  className="relative px-8 py-2.5 md:px-12 md:py-3 font-orbitron text-xs md:text-sm font-bold tracking-[0.25em] text-terminal-green border border-terminal-green/30 rounded bg-terminal-green/5 group-hover:bg-terminal-green/15 transition-all duration-300"
                  style={{
                    textShadow: '0 0 10px rgba(0,255,65,0.5)',
                    boxShadow: '0 0 15px rgba(0,255,65,0.08), inset 0 0 15px rgba(0,255,65,0.03)',
                  }}
                >
                  {'>'} ENTER SYSTEM
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer label */}
        <motion.div
          className="mt-6 font-mono text-[7px] md:text-[9px] text-terminal-green/15 tracking-[3px] md:tracking-[4px] uppercase text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          BIT SATHY • BANNARI AMMAN INSTITUTE OF TECHNOLOGY
        </motion.div>
      </div>

      {/* ── Bottom status bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-3 md:px-6 border-t border-terminal-green/10 z-20">
        <div className="font-mono text-[8px] md:text-[9px] text-terminal-green/25 tracking-widest">
          SYS.v4.2.0 // QUANTUM CORE ACTIVE
        </div>
        <div className="font-mono text-[8px] md:text-[9px] text-terminal-green/20 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="inline-block w-1 h-2 bg-terminal-green/30"
              style={{
                animation: `pulse-slow ${1 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          <span className="ml-1 tracking-wider">NODES: ONLINE</span>
        </div>
      </div>
    </div>
  );
}
