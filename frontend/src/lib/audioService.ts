'use client';

class AudioService {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  constructor() {
    // Proactively register listeners to unlock audio on user gesture
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.init();
        if (this.ctx && this.ctx.state === 'running') {
          this.isUnlocked = true;
          window.removeEventListener('click', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('touchstart', unlock);
        }
      };
      window.addEventListener('click', unlock);
      window.addEventListener('keydown', unlock);
      window.addEventListener('touchstart', unlock);
    }
  }

  private init() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn('Failed to initialize AudioContext:', e);
    }
  }

  /**
   * Diagnostic beep sound (quick, high-pitched ping)
   */
  playDiagnosticPing() {
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {
      // Quietly ignore audio playback errors (e.g. context not allowed to start)
    }
  }

  /**
   * Rising power charging sound (simulates an ARC reactor charging)
   */
  playPowerSweep() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 1.2;

      const oscSaw = this.ctx.createOscillator();
      const oscSine = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      // Sawtooth oscillator for mechanical texture
      oscSaw.type = 'sawtooth';
      oscSaw.frequency.setValueAtTime(50, now);
      oscSaw.frequency.exponentialRampToValueAtTime(350, now + duration);

      // Sine oscillator for pure low frequency reinforcement
      oscSine.type = 'sine';
      oscSine.frequency.setValueAtTime(100, now);
      oscSine.frequency.exponentialRampToValueAtTime(700, now + duration);

      // Low pass filter to make the sawtooth smooth and futuristic
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(900, now + duration);

      // Gain swell and fade
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + duration * 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscSaw.connect(filter);
      oscSine.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      oscSaw.start(now);
      oscSine.start(now);
      oscSaw.stop(now + duration);
      oscSine.stop(now + duration);
    } catch (e) {
      // Quietly handle errors
    }
  }

  /**
   * Fast click/telemetry sound for typewriter output
   */
  playTypeClick() {
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      // Slight pitch variation for a natural mechanical feel
      const baseFreq = 1600 + Math.random() * 600;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Quietly handle errors
    }
  }

  /**
   * Cascading digital rain sound effect (like CMatrix green rain fall)
   */
  playCmatrixRain() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const totalDuration = 3.2;
      const raindropCount = 14;

      // 1. Trigger cascading digital raindrops (descending frequency sweeps)
      for (let i = 0; i < raindropCount; i++) {
        // Staggered start times
        const startTime = now + (i * 0.2) + (Math.random() * 0.05);
        const duration = 0.45 + Math.random() * 0.35;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Use triangle waves for a retro digital computer feel
        osc.type = Math.random() > 0.4 ? 'triangle' : 'sine';

        // Downward sweep: high frequency to low frequency
        const startFreq = 900 + Math.random() * 900;
        const endFreq = 90 + Math.random() * 120;
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

        // Dynamic lowpass filter to sweep along with the oscillator
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, startTime);
        filter.frequency.exponentialRampToValueAtTime(250, startTime + duration);

        // Envelope
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.04, startTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
      }

      // 2. Low mainframe drone/hum to pull the soundscape together
      const droneOsc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(55, now); // A1 note
      droneOsc.frequency.linearRampToValueAtTime(50, now + totalDuration);

      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.035, now + 0.4);
      droneGain.gain.linearRampToValueAtTime(0.035, now + totalDuration - 0.6);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + totalDuration);

      droneOsc.connect(droneGain);
      droneGain.connect(this.ctx.destination);

      droneOsc.start(now);
      droneOsc.stop(now + totalDuration + 0.05);
    } catch (e) {
      // Quietly handle errors
    }
  }
}

export const audioService = new AudioService();
