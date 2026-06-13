'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ArcReactorProps {
  size?: number;
  isCharging?: boolean;
}

export default function ArcReactor({ size = 180, isCharging = false }: ArcReactorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = size;
      canvas.height = size;
    };
    resize();

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (isCharging ? 2.5 : 1) + Math.random() * 1.5;
      const colors = ['#00D9FF', '#00FF41', '#FFFFFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Emit from a small inner radius
      const startRadius = 15;
      const x = size / 2 + Math.cos(angle) * startRadius;
      const y = size / 2 + Math.sin(angle) * startRadius;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 2 + 1,
        color
      });
    };

    let lastTime = performance.now();
    let particleAccumulator = 0;

    const draw = (activeDelta: number) => {
      ctx.clearRect(0, 0, size, size);

      // Frame-rate independent particle emission
      const emissionRate = isCharging ? 24 : 9; // particles per second
      particleAccumulator += activeDelta * emissionRate;
      
      while (particleAccumulator >= 1) {
        createParticle();
        particleAccumulator -= 1;
      }

      // Update and draw particles backwards to allow safe splicing
      const speedMultiplier = activeDelta * 30; // Scale standard 30fps movement
      const alphaDecay = (isCharging ? 0.012 : 0.018) * speedMultiplier;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.alpha -= alphaDecay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      if (deltaTime <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      // Limit delta to prevent jumps when tab is inactive
      const activeDelta = Math.min(deltaTime, 0.1);

      draw(activeDelta);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, isCharging]);

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Radial glow background */}
      <div 
        className="absolute inset-4 rounded-full bg-arc-blue/10 blur-xl animate-pulse-blue"
        style={{
          boxShadow: '0 0 35px rgba(0, 217, 255, 0.2), inset 0 0 35px rgba(0, 217, 255, 0.1)'
        }}
      />

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Concentric Rotating Rings & Tech Ticks Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
        {/* Outer Ring - Spins Counter-Clockwise */}
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(0, 217, 255, 0.4)"
          strokeWidth="0.8"
          strokeDasharray="20 8 6 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Segmented Middle Ring - Spins Clockwise */}
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(0, 255, 65, 0.5)"
          strokeWidth="1.2"
          strokeDasharray="30 12 4 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Inner Chamber with Markers */}
        <motion.circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="rgba(0, 217, 255, 0.6)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          animate={{ rotate: -180 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Decorative inner circles */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0, 217, 255, 0.1)" strokeWidth="0.25" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0, 255, 65, 0.1)" strokeWidth="0.25" />
      </svg>

      {/* Core Center Reactor Chamber */}
      <motion.div
        className="absolute w-[42%] h-[42%] rounded-full border border-arc-blue flex items-center justify-center z-20"
        animate={{
          scale: isCharging ? [1, 1.12, 1] : [1, 1.04, 1],
          boxShadow: isCharging 
            ? ['0 0 15px rgba(0,217,255,0.4)', '0 0 30px rgba(0,217,255,0.8)', '0 0 15px rgba(0,217,255,0.4)']
            : ['0 0 10px rgba(0,217,255,0.3)', '0 0 18px rgba(0,217,255,0.5)', '0 0 10px rgba(0,217,255,0.3)']
        }}
        transition={{
          repeat: Infinity,
          duration: isCharging ? 0.8 : 2,
          ease: 'easeInOut'
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.2) 0%, rgba(0,0,0,0.8) 80%)',
        }}
      >
        {/* Core Pulsing Triangle */}
        <div 
          className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-arc-blue drop-shadow-[0_0_6px_#00D9FF]"
          style={{ transform: 'translateY(-2px)' }}
        />
      </motion.div>
    </div>
  );
}
