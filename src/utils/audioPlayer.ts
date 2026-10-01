/**
 * Audio System for Wedding Background Music
 * - Uses HTML5 Audio element for custom MP3 (configured in ASSETS.backgroundMusic)
 * - Has an authentic Indian Classical Synth fallback (Raag Yaman sitar/flute drone)
 *   so the music plays reliably even before a user places their custom MP3 file!
 */

import { ASSETS } from '../config/assets';

class WeddingAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private isSynthPlaying = false;
  private isHtmlAudioPlaying = false;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private melodyInterval: number | null = null;

  constructor() {
    // We defer AudioContext and HTMLAudioElement creation until user interaction
  }

  public subscribe(listener: (isPlaying: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.isPlaying();
    this.listeners.forEach((fn) => fn(state));
  }

  public isPlaying(): boolean {
    return this.isHtmlAudioPlaying || this.isSynthPlaying;
  }

  public async startMusic(): Promise<boolean> {
    if (this.isPlaying()) return true;

    // First attempt to play HTML5 audio
    try {
      if (!this.audioElement) {
        this.audioElement = new Audio(ASSETS.backgroundMusic);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.45;

        this.audioElement.addEventListener('playing', () => {
          this.isHtmlAudioPlaying = true;
          this.notify();
        });

        this.audioElement.addEventListener('pause', () => {
          this.isHtmlAudioPlaying = false;
          this.notify();
        });

        this.audioElement.addEventListener('error', () => {
          // If the custom mp3 is not found, fallback to Web Audio Indian Raag synth
          console.info('Custom audio file not found, activating classical wedding synth.');
          this.isHtmlAudioPlaying = false;
          this.startIndianWeddingSynth();
        });
      }

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isHtmlAudioPlaying = true;
        this.notify();
        return true;
      }
    } catch {
      // Autoplay blocked or media error, fallback to synth if user explicitly clicked
      return this.startIndianWeddingSynth();
    }

    return false;
  }

  public pauseMusic() {
    if (this.audioElement && this.isHtmlAudioPlaying) {
      this.audioElement.pause();
      this.isHtmlAudioPlaying = false;
    }
    if (this.isSynthPlaying) {
      this.stopIndianWeddingSynth();
    }
    this.notify();
  }

  public async toggleMusic(): Promise<boolean> {
    if (this.isPlaying()) {
      this.pauseMusic();
      return false;
    } else {
      return await this.startMusic();
    }
  }

  /**
   * Soothing Indian Classical ambient synth (Raag Yaman notes: Sa, Ga, Pa, Dha, Ni)
   * Creates an enchanting, royal atmosphere using soft tanpura drone and meditative bell harmonics.
   */
  private startIndianWeddingSynth(): boolean {
    if (this.isSynthPlaying) return true;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return false;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.2, this.audioCtx.currentTime + 1.5);
      masterGain.connect(this.audioCtx.destination);
      this.synthGain = masterGain;

      // Base Tanpura Drone Frequencies (Root C#3 = ~138.59 Hz, Pa = 207.65 Hz)
      const droneFreqs = [138.59, 207.65, 277.18];
      droneFreqs.forEach((freq, idx) => {
        if (!this.audioCtx || !this.synthGain) return;
        const osc = this.audioCtx.createOscillator();
        const droneGain = this.audioCtx.createGain();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        droneGain.gain.value = 0.08 / (idx + 1);
        osc.connect(droneGain);
        droneGain.connect(this.synthGain);
        osc.start();
      });

      // Gentle melodic acoustic bell/chime sequence (Raag Yaman notes: C#4, D#4, F4, G#4, A#4, C5)
      const yamanScale = [277.18, 311.13, 349.23, 415.3, 466.16, 523.25, 554.37];
      let step = 0;

      const playMelodyNote = () => {
        if (!this.audioCtx || !this.isSynthPlaying || !this.synthGain) return;
        const noteFreq = yamanScale[step % yamanScale.length];
        step = (step + 1 + Math.floor(Math.random() * 2)) % yamanScale.length;

        const noteOsc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(noteFreq, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.06, now + 0.15);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        noteOsc.connect(noteGain);
        noteGain.connect(this.synthGain);

        noteOsc.start(now);
        noteOsc.stop(now + 2.6);
      };

      // Play note every ~2.4 seconds with slight organic variation
      this.isSynthPlaying = true;
      playMelodyNote();
      this.melodyInterval = window.setInterval(playMelodyNote, 2400);

      this.notify();
      return true;
    } catch (e) {
      console.warn('Web Audio playback error:', e);
      return false;
    }
  }

  private stopIndianWeddingSynth() {
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }

    if (this.audioCtx && this.synthGain) {
      try {
        const now = this.audioCtx.currentTime;
        this.synthGain.gain.setValueAtTime(this.synthGain.gain.value, now);
        this.synthGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          if (this.audioCtx && this.audioCtx.state === 'running') {
            this.audioCtx.suspend();
          }
        }, 500);
      } catch {
        // Safe tear down
      }
    }

    this.isSynthPlaying = false;
    this.notify();
  }
}

export const weddingAudio = new WeddingAudioController();
