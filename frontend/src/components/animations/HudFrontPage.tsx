'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HudFrontPageProps {
  onEnter: () => void;
}

// ── Hex data generator ──
function randomHex(len: number) {
  const chars = '0123456789ABCDEF';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * 16)];
  return s;
}

// ── Status labels ──
const STATUS_LABELS = [
  'SYSTEM STATUS: ACTIVE',
  'ENCRYPTION: AES-256',
  'SECURE CONNECTION',
  'FIREWALL: ENABLED',
  'NODE SYNC: 98.7%',
  'UPLINK: STABLE',
  'DECRYPTION MATRIX: READY',
  'KNOWLEDGE DB: ONLINE',
  'QUANTUM LINK: VERIFIED',
  'AUTH PROTOCOL: v4.2',
];

// ── Digital Rain Column ──
function DigitalRainColumn({ speed, left, height }: { speed: number; left: string; height: string }) {
  const [chars, setChars] = useState<string[]>([]);
  const rainChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    const count = 12 + Math.floor(Math.random() * 8);
    const initial = Array.from({ length: count }, () =>
      rainChars[Math.floor(Math.random() * rainChars.length)]
    );
    setChars(initial);

    const interval = setInterval(() => {
      setChars(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = rainChars[Math.floor(Math.random() * rainChars.length)];
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return (
    <div
      className="absolute top-0 font-mono text-[10px] leading-[14px] text-terminal-green/60 select-none pointer-events-none"
      style={{
        left,
        height,
        animation: `hud-rain-fall ${4 + Math.random() * 4}s linear infinite`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      {chars.map((c, i) => (
        <div key={i} style={{ opacity: 0.3 + (i / chars.length) * 0.7 }}>
          {c}
        </div>
      ))}
    </div>
  );
}

// ── Scrolling Hex Log ──
function HexLog({ side }: { side: 'left' | 'right' }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 8 }, () => `0x${randomHex(8)}`);
    setLines(initial);

    const interval = setInterval(() => {
      setLines(prev => {
        const next = [...prev.slice(1), `0x${randomHex(8)}`];
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute top-1/4 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} font-mono text-[10px] md:text-xs text-terminal-green/50 select-none pointer-events-none space-y-1 hidden sm:block`}
    >
      {lines.map((line, i) => (
        <div key={`${i}-${line}`} style={{ opacity: 0.3 + (i / lines.length) * 0.7 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

// ── Waveform ──
function Waveform() {
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
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin((x + frame) * 0.04) * 12 +
          Math.sin((x + frame) * 0.08) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second wave
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.25)';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.cos((x + frame * 1.3) * 0.05) * 10 +
          Math.sin((x + frame * 0.7) * 0.1) * 5;
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

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className="hidden md:block"
    />
  );
}

// ── Progress Bar ──
function ProgressBar({ label, targetPercent }: { label: string; targetPercent: number }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= targetPercent) return targetPercent;
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [targetPercent]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between font-mono text-[9px] md:text-[10px] text-terminal-green/60">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-[3px] bg-terminal-green/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-terminal-green/50 rounded-full transition-all duration-100"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// ██ MAIN HUD FRONT PAGE COMPONENT
// ══════════════════════════════════════════════════
export default function HudFrontPage({ onEnter }: HudFrontPageProps) {
  const [statusIdx, setStatusIdx] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Rotate status labels
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % STATUS_LABELS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

  // Stagger content reveal
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Generate rain columns
  const rainColumns = useCallback(() => {
    const cols = [];
    for (let i = 0; i < 20; i++) {
      cols.push(
        <DigitalRainColumn
          key={i}
          speed={100 + Math.random() * 200}
          left={`${(i / 20) * 100}%`}
          height={`${60 + Math.random() * 40}%`}
        />
      );
    }
    return cols;
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden select-none">
      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Digital rain background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {rainColumns()}
      </div>

      {/* ── Corner brackets ── */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-arc-blue/40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-arc-blue/40" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-arc-blue/40" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-arc-blue/40" />

      {/* ── Top status bar ── */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4 md:px-8 border-b border-arc-blue/10 z-20">
        <div className="font-mono text-[10px] md:text-xs text-arc-blue/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          <span>{STATUS_LABELS[statusIdx]}</span>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-arc-blue/40">
          {timeStr}
        </div>
      </div>

      {/* ── Hex data columns ── */}
      <HexLog side="left" />
      <HexLog side="right" />

      {/* ── CENTRAL HUD ── */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Radar / Central HUD Circle */}
            <div className="relative w-52 h-52 md:w-72 md:h-72 mb-6">
              {/* Outer ring — slow counter-clockwise */}
              <div
                className="absolute inset-0 rounded-full border-2 border-arc-blue/25"
                style={{
                  animation: 'spin-counter 12s linear infinite',
                  boxShadow: '0 0 20px rgba(0,217,255,0.15), inset 0 0 20px rgba(0,217,255,0.05)',
                }}
              />
              {/* Dashed ring */}
              <div
                className="absolute inset-3 rounded-full border border-dashed border-terminal-green/20"
                style={{ animation: 'spin-clockwise 20s linear infinite' }}
              />
              {/* Middle ring — clockwise */}
              <div
                className="absolute inset-6 rounded-full border border-arc-blue/40"
                style={{
                  animation: 'spin-clockwise 8s linear infinite',
                  boxShadow: '0 0 12px rgba(0,217,255,0.25)',
                }}
              />
              {/* Inner ring — counter-clockwise fast */}
              <div
                className="absolute inset-10 md:inset-12 rounded-full border border-arc-blue/60"
                style={{
                  animation: 'spin-counter 5s linear infinite',
                  boxShadow: '0 0 8px rgba(0,217,255,0.4)',
                }}
              />
              {/* Core glow */}
              <div
                className="absolute inset-16 md:inset-20 rounded-full bg-arc-blue/10"
                style={{
                  boxShadow: '0 0 40px rgba(0,217,255,0.4), 0 0 80px rgba(0,217,255,0.15)',
                  animation: 'pulse-glow-blue 3s ease-in-out infinite',
                }}
              />
              {/* Center dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-arc-blue"
                style={{ boxShadow: '0 0 16px rgba(0,217,255,0.9)' }}
              />

              {/* Radar sweep line */}
              <div
                className="absolute top-1/2 left-1/2 w-px origin-bottom"
                style={{
                  height: '50%',
                  transform: 'translate(-50%, -100%)',
                  animation: 'spin-clockwise 3s linear infinite',
                  background: 'linear-gradient(to top, rgba(0,217,255,0.6), transparent)',
                }}
              />

              {/* Radial lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-arc-blue/30 to-transparent origin-top"
                  style={{
                    height: '42%',
                    transform: `translate(-50%, 0) rotate(${deg}deg)`,
                  }}
                />
              ))}

              {/* Cross-hair marks */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-terminal-green/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-terminal-green/40" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-terminal-green/40" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-px bg-terminal-green/40" />
            </div>

            {/* Title */}
            <motion.h1
              className="font-orbitron text-2xl md:text-4xl font-bold text-arc-blue tracking-[0.2em] md:tracking-[0.3em] mb-2 text-center"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                textShadow: '0 0 20px rgba(0,217,255,0.6), 0 0 40px rgba(0,217,255,0.3)',
              }}
            >
              BIT LIBRARY
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-rajdhani text-xs md:text-sm text-text-white/40 uppercase tracking-[6px] md:tracking-[8px] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              ACADEMIC NEXUS
            </motion.p>

            {/* Waveform visualization */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Waveform />
            </motion.div>

            {/* Progress bars */}
            <motion.div
              className="w-48 md:w-64 space-y-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <ProgressBar label="KNOWLEDGE DB" targetPercent={98} />
              <ProgressBar label="NEURAL LINK" targetPercent={87} />
              <ProgressBar label="CORE SYSTEMS" targetPercent={100} />
            </motion.div>

            {/* ENTER Button */}
            <motion.button
              id="hud-enter-button"
              onClick={onEnter}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-lg border border-arc-blue/20 group-hover:border-arc-blue/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]" />

              {/* Button body */}
              <div className="relative px-8 py-3 md:px-12 md:py-4 font-orbitron text-sm md:text-base font-bold tracking-[0.3em] text-arc-blue border border-arc-blue/40 rounded-md bg-arc-blue/5 group-hover:bg-arc-blue/15 transition-all duration-300"
                style={{
                  textShadow: '0 0 10px rgba(0,217,255,0.5)',
                  boxShadow: '0 0 15px rgba(0,217,255,0.1), inset 0 0 15px rgba(0,217,255,0.05)',
                }}
              >
                ENTER SYSTEM
              </div>

              {/* Energy pulse on hover */}
              <div className="absolute -inset-6 rounded-xl border border-arc-blue/0 group-hover:border-arc-blue/10 transition-all duration-700 group-hover:animate-energy-pulse" />
            </motion.button>

            {/* Bottom label */}
            <motion.div
              className="mt-8 font-mono text-[9px] md:text-[10px] text-text-white/20 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              BIT SATHY • BANNARI AMMAN INSTITUTE OF TECHNOLOGY
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom status bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-4 md:px-8 border-t border-arc-blue/10 z-20">
        <div className="font-mono text-[9px] md:text-[10px] text-terminal-green/40">
          SYS.v4.2.0 // QUANTUM CORE ACTIVE
        </div>
        <div className="font-mono text-[9px] md:text-[10px] text-arc-blue/30">
          ■ ■ ■ ■ ■ NODES: ONLINE
        </div>
      </div>
    </div>
  );
}
