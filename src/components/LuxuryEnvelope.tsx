import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../config/assets';
import { weddingAudio } from '../utils/audioPlayer';

interface LuxuryEnvelopeProps {
  onOpenComplete: () => void;
}

export const LuxuryEnvelope: React.FC<LuxuryEnvelopeProps> = ({ onOpenComplete }) => {
  const [openingState, setOpeningState] = useState<'sealed' | 'unsealing' | 'flapOpening' | 'cardRising' | 'transitioning' | 'completed'>('sealed');

  // Trigger celebration sparkles
  const launchGoldConfetti = () => {
    // Subtle, elegant gold & champagne sparkles
    const colors = ['#C5A059', '#EEDB9A', '#FAF7F2', '#B88E3E', '#8E6E2E'];

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.55 },
      colors,
      ticks: 180,
      gravity: 0.6,
      scalar: 0.85,
      shapes: ['circle'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 25,
        spread: 80,
        origin: { y: 0.5 },
        colors,
        ticks: 200,
        gravity: 0.5,
        scalar: 0.7,
        shapes: ['circle'],
      });
    }, 400);
  };

  const handleOpenEnvelope = () => {
    if (openingState !== 'sealed') return;

    // 1. Attempt to start background music immediately upon user interaction
    weddingAudio.startMusic();

    // 2. Begin choreographed opening sequence
    setOpeningState('unsealing');

    // Flap opens
    setTimeout(() => {
      setOpeningState('flapOpening');
      launchGoldConfetti();
    }, 600);

    // Card begins rising
    setTimeout(() => {
      setOpeningState('cardRising');
    }, 1300);

    // Smooth transition to main website
    setTimeout(() => {
      setOpeningState('transitioning');
    }, 2500);

    // Final completion callback
    setTimeout(() => {
      setOpeningState('completed');
      onOpenComplete();
    }, 3200);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenEnvelope();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${
        openingState === 'transitioning' || openingState === 'completed'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF7F2 60%, #EDE5D8 100%)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#B88E3E]/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-[480px] sm:max-w-[540px] flex flex-col items-center">
        
        {/* Subtle Pre-header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <p className="font-serif-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#916B27]">
            Royal Wedding Invitation
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-8 bg-[#B88E3E]/40" />
            <span className="text-[#B88E3E] text-xs">✦</span>
            <span className="h-[1px] w-8 bg-[#B88E3E]/40" />
          </div>
        </div>

        {/* 3D Envelope Object */}
        <div
          className="relative w-full aspect-[16/11] perspective-1000 cursor-pointer select-none"
          onClick={handleOpenEnvelope}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Wedding Invitation Envelope. Press Enter or click to break the wax seal and open the invitation."
        >
          {/* Shadow beneath envelope */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-[#2A241F]/15 blur-xl rounded-full" />

          {/* Envelope Main Body / Backing */}
          <div className="relative w-full h-full rounded-xl bg-[#F6F1E9] border border-[#B88E3E]/30 shadow-[0_20px_50px_-15px_rgba(58,42,26,0.18)] overflow-hidden">
            
            {/* Fine Paper Grain & Gold Border Filigree */}
            <div className="absolute inset-2 sm:inset-3 border border-[#B88E3E]/25 rounded-lg pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-[#B88E3E]/15 rounded-md pointer-events-none" />

            {/* Corner traditional filigree flourishes */}
            <svg className="absolute top-4 left-4 w-5 h-5 text-[#B88E3E]/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2h6v2H4v4H2V2zm0 20h6v-2H4v-4H2v6zm20 0h-6v-2h4v-4h2v6zm0-20h-6v2h4v4h2V2z" />
            </svg>
            <svg className="absolute top-4 right-4 w-5 h-5 text-[#B88E3E]/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2h-6v2h4v4h2V2zm0 20h-6v-2h4v-4h2v6zM2 22h6v-2H4v-4H2v6zM2 2h6v2H4v4H2V2z" />
            </svg>

            {/* Internal Card (Slides upward during unsealing) */}
            <div
              className={`absolute inset-x-4 top-4 bottom-4 rounded-lg bg-white border border-[#B88E3E]/40 shadow-md p-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out ${
                openingState === 'cardRising' || openingState === 'transitioning' || openingState === 'completed'
                  ? '-translate-y-28 sm:-translate-y-36 scale-105 shadow-2xl z-30'
                  : 'translate-y-0 z-0'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#B88E3E]/40 mb-3 shadow-inner">
                <img
                  src={ASSETS.weddingLogo}
                  alt="Priyanshu & Rupal Monogram"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-serif-cormorant text-xs tracking-widest text-[#916B27] uppercase">The Wedding of</p>
              <h2 className="font-display-cinzel text-base sm:text-lg font-bold text-[#2A241F] tracking-wide mt-0.5">
                Priyanshu & Rupal
              </h2>
              <p className="font-sans text-[11px] text-[#6B6258] mt-1">25 & 26 November 2026</p>
            </div>

            {/* Envelope Side Flaps (Internal visual folds) */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(246,241,233,0.95) 0%, rgba(237,230,217,0.9) 100%)',
                clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                borderRight: '1px solid rgba(184,142,62,0.15)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(225deg, rgba(246,241,233,0.95) 0%, rgba(237,230,217,0.9) 100%)',
                clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                borderLeft: '1px solid rgba(184,142,62,0.15)',
              }}
            />

            {/* Envelope Bottom Flap */}
            <div
              className="absolute inset-0 pointer-events-none z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]"
              style={{
                background:
                  'linear-gradient(0deg, #F3EDE3 0%, #F9F6F0 100%)',
                clipPath: 'polygon(0% 100%, 50% 46%, 100% 100%)',
                borderTop: '1px solid rgba(184,142,62,0.2)',
              }}
            />

            {/* Envelope Top Triangular Flap (Folds open in 3D) */}
            <div
              className={`absolute inset-x-0 top-0 h-full pointer-events-none origin-top transition-transform duration-1000 ease-in-out z-20 ${
                openingState === 'flapOpening' || openingState === 'cardRising' || openingState === 'transitioning' || openingState === 'completed'
                  ? '-rotate-x-180 opacity-40'
                  : 'rotate-x-0 opacity-100'
              }`}
              style={{
                background:
                  'linear-gradient(180deg, #F5EFE6 0%, #EDE4D4 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                boxShadow: '0 8px 20px rgba(58,42,26,0.12)',
                borderBottom: '1px solid rgba(184,142,62,0.3)',
              }}
            />

            {/* Central Wax Seal */}
            <div
              className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-out ${
                openingState === 'sealed'
                  ? 'animate-seal-pulse scale-100'
                  : openingState === 'unsealing'
                  ? 'scale-115 rotate-6 brightness-125'
                  : 'scale-0 opacity-0'
              }`}
            >
              <div className="relative group w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 cursor-pointer">
                {/* Authentic Wax Edge Shadow */}
                <div className="absolute inset-0 rounded-full shadow-wax bg-[#5E121B]" />
                
                {/* Wax Seal Image with PR Monogram */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#D8B570]/70 flex items-center justify-center bg-[#5E121B]">
                  <img
                    src={ASSETS.waxSeal}
                    alt="Priyanshu & Rupal Wax Seal"
                    className="w-full h-full object-cover mix-blend-screen scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Embossed PR overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display-cinzel text-xl sm:text-2xl font-bold text-[#F4E8D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-widest">
                      PR
                    </span>
                  </div>
                </div>

                {/* Subtle golden sparkling badge ring */}
                <div className="absolute -inset-1 rounded-full border border-[#D8B570]/40 animate-pulse pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Action Prompt Below Envelope */}
        <div className="mt-8 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#B88E3E]/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B88E3E] animate-ping" />
            <p className="font-serif-cormorant text-base sm:text-lg font-medium text-[#2A241F] tracking-wide">
              Tap the seal to open the invitation
            </p>
          </div>
          <p className="font-sans text-xs text-[#6B6258] mt-2">
            Click anywhere or press Enter to unseal
          </p>
        </div>

      </div>
    </div>
  );
};
