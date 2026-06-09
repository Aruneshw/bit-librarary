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
   * Diagnostic beep sound (quick, high-pitched ping, eDex-UI style)
   */
  playDiagnosticPing() {
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime); // softer volume
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);
    } catch (e) {
      // Quietly ignore audio playback errors
    }
  }

  /**
   * Rising power charging sound (eDex-UI style)
   * Sweeps up smoothly and triggers a clean, futuristic chime at the peak.
   */
  playPowerSweep() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 1.2;

      // 1. Low frequency bass/sub build
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(60, now);
      subOsc.frequency.exponentialRampToValueAtTime(220, now + duration);
      
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.08, now + duration * 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + duration);

      // 2. Resonant sweep
      const midOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const midGain = this.ctx.createGain();
      
      midOsc.type = 'triangle';
      midOsc.frequency.setValueAtTime(120, now);
      midOsc.frequency.exponentialRampToValueAtTime(440, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + duration);
      filter.Q.setValueAtTime(3.0, now); // resonance for filter sweep texture

      midGain.gain.setValueAtTime(0.001, now);
      midGain.gain.linearRampToValueAtTime(0.04, now + duration * 0.7);
      midGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      midOsc.connect(filter);
      filter.connect(midGain);
      midGain.connect(this.ctx.destination);
      midOsc.start(now);
      midOsc.stop(now + duration);

      // 3. Peak cyber-chime / chord (triggered near the end of the sweep, at 0.9s)
      const chimeTime = now + 0.9;
      // Play a beautiful major 9th chord voicing (E5, F#5, B5, D#6)
      const pitches = [659.25, 739.99, 987.77, 1244.51];
      pitches.forEach((freq, idx) => {
        const chimeOsc = this.ctx!.createOscillator();
        const chimeGain = this.ctx!.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, chimeTime);

        // Stagger slightly for a strum/arpeggio effect
        const start = chimeTime + idx * 0.03;
        
        chimeGain.gain.setValueAtTime(0.001, start);
        chimeGain.gain.linearRampToValueAtTime(0.015, start + 0.03);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.ctx!.destination);

        chimeOsc.start(start);
        chimeOsc.stop(start + 0.6);
      });
    } catch (e) {
      // Quietly handle errors
    }
  }

  /**
   * Fast click/telemetry sound for typewriter output (eDex-UI mechanical style)
   */
  playTypeClick() {
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      // High frequency and extremely tight decay
      const baseFreq = 2200 + Math.random() * 300;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.007, this.ctx.currentTime); // quieter, more subtle
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {
      // Quietly handle errors
    }
  }

  /**
   * Soothing modern digital rain flow sound effect.
   * Generates a soft background rain wash (using filtered pink noise)
   * layered with gentle, randomized crystalline raindrop pings.
   */
  playModernRainFlow() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 3.5;

      // 1. Create Pink Noise for the soft rain flow background wash
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise filter variables
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.05; // lower amplitude for gentleness
        b6 = white * 0.115926;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // Filter the noise to make it sound like a soft rain shower
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, now);
      // Modulate filter frequency to simulate a gentle breeze/swell
      noiseFilter.frequency.linearRampToValueAtTime(1100, now + 1.5);
      noiseFilter.frequency.linearRampToValueAtTime(750, now + 3.0);
      noiseFilter.Q.setValueAtTime(1.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.06, now + 0.5); // soft swell
      noiseGain.gain.linearRampToValueAtTime(0.06, now + 2.5);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseNode.start(now);

      // 2. Add randomized soft crystalline pings (digital raindrops)
      const raindropCount = 12;
      for (let i = 0; i < raindropCount; i++) {
        const startTime = now + (i * 0.28) + (Math.random() * 0.1);
        const dropDuration = 0.2 + Math.random() * 0.25;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        // Sparkling high frequencies
        const freq = 1800 + Math.random() * 1200;
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Soft volume with quick decay
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.015, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dropDuration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dropDuration);
      }
    } catch (e) {
      // Quietly handle errors
    }
  }
}

export const audioService = new AudioService();
