import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Eye, Calendar } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { WEDDING_DATA } from '../config/weddingData';

export const WeddingScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasTriggeredCelebration = useRef(false);

  // Initialize Canvas Gold Foil Layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use actual display resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // 1. Base Metallic Gold Foil Gradient
    const goldGradient = ctx.createLinearGradient(0, 0, w, h);
    goldGradient.addColorStop(0, '#B88E3E');
    goldGradient.addColorStop(0.25, '#D8B570');
    goldGradient.addColorStop(0.5, '#FFF2D6');
    goldGradient.addColorStop(0.75, '#C5A059');
    goldGradient.addColorStop(1, '#8E6828');

    ctx.fillStyle = goldGradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle decorative mandala/circular pattern in center
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.25, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Gold filigree frame
    ctx.strokeStyle = 'rgba(94, 18, 27, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // 4. Instructions text on the gold foil
    ctx.fillStyle = '#3F0A10';
    ctx.font = '600 13px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ LUXURY WEDDING REVEAL ✦', w / 2, h / 2 - 28);

    ctx.fillStyle = '#2A241F';
    ctx.font = 'bold 15px "Cinzel", serif';
    ctx.fillText('SCRATCH TO REVEAL DATE', w / 2, h / 2);

    ctx.fillStyle = '#5A4620';
    ctx.font = 'italic 12px "Cormorant Garamond", serif';
    ctx.fillText('Touch & rub with your finger or mouse', w / 2, h / 2 + 26);

    setIsScratched(false);
    setScratchPercent(0);
    hasTriggeredCelebration.current = false;
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isScratched) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isScratched]);

  // Check scratch percentage
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      // Sample a scaled down grid for speed
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalSampled = pixels.length / 16; // sample every 4th pixel

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
      setScratchPercent(percent);

      if (percent >= 35 && !hasTriggeredCelebration.current) {
        hasTriggeredCelebration.current = true;
        setIsScratched(true);
        triggerGoldCelebration();
      }
    } catch {
      // Safe fallback
    }
  };

  const triggerGoldCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D8B570', '#C5A059', '#FAF7F2', '#B88E3E', '#8E6828'],
      shapes: ['circle'],
    });
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22 * dpr, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Touch Handlers for Mobile (critical for WhatsApp mobile users!)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches.length > 0) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleRevealAll = () => {
    setIsScratched(true);
    setScratchPercent(100);
    triggerGoldCelebration();
  };

  const handleReset = () => {
    initCanvas();
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#B88E3E]/30 text-[#916B27] mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
            Interactive Wedding Surprise
          </span>
        </div>
        <h3 className="font-display-cinzel text-2xl sm:text-3xl font-bold text-[#2A241F] tracking-wide">
          Scratch Card Reveal
        </h3>
        <p className="font-serif-cormorant italic text-sm sm:text-base text-[#6B6258] mt-1">
          Rub below to reveal the sacred wedding dates of Priyanshu & Rupal
        </p>
      </div>

      {/* Card Envelope Frame */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#B88E3E]/50 shadow-luxury bg-[#FAF7F2]"
      >
        {/* UNDERNEATH LAYER (The Revealed Wedding Date) */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white via-[#FAF7F2] to-[#F5EFE6]">
          {/* Subtle watermarked monogram */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#B88E3E]/40 mb-2 shadow-inner">
            <img
              src={ASSETS.weddingLogo}
              alt="Priyanshu & Rupal Monogram"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="font-serif-cormorant text-xs tracking-[0.25em] text-[#916B27] uppercase font-semibold">
            SAVE THE SACRED DATES
          </p>

          <h4 className="font-display-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-gold-gradient tracking-wide mt-1">
            25 & 26 NOVEMBER 2026
          </h4>

          <p className="font-serif-cormorant italic text-base sm:text-lg text-[#2A241F] font-medium mt-1">
            Priyanshu Kocher & Rupal Jain
          </p>

          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#6B6258] font-sans">
            <Calendar className="w-3.5 h-3.5 text-[#B88E3E]" />
            <span>Raipur Greens, Cherrikherri, Raipur</span>
          </div>

          {isScratched && (
            <div className="mt-3 animate-bounce inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 text-xs font-semibold">
              <span>✨ You are cordially invited to celebrate with us! ✨</span>
            </div>
          )}
        </div>

        {/* TOP SCRATCHABLE CANVAS LAYER */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      {/* Progress & Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          {!isScratched ? (
            <span className="text-xs font-sans text-[#7A6E62]">
              Scratched: <strong className="text-[#916B27]">{scratchPercent}%</strong>
            </span>
          ) : (
            <span className="text-xs font-semibold text-emerald-700">
              ✓ Date Successfully Revealed!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isScratched ? (
            <button
              onClick={handleRevealAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 hover:bg-[#FAF7F2] border border-[#B88E3E]/40 text-[#2A241F] text-xs font-medium transition-colors shadow-sm focus:outline-none"
            >
              <Eye className="w-3.5 h-3.5 text-[#916B27]" />
              <span>Reveal Now</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 hover:bg-[#FAF7F2] border border-[#B88E3E]/40 text-[#2A241F] text-xs font-medium transition-colors shadow-sm focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#916B27]" />
              <span>Scratch Again</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
