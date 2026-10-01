import React from 'react';
import { WEDDING_DATA } from '../config/weddingData';
import { ASSETS } from '../config/assets';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 sm:px-6">
      
      {/* Decorative Traditional Arch Border Container */}
      <div className="relative w-full max-w-3xl mx-auto p-6 sm:p-12 md:p-16 rounded-3xl bg-white/75 backdrop-blur-md border border-[#B88E3E]/35 shadow-luxury overflow-hidden">
        
        {/* Ornate Gold Inner Borders */}
        <div className="absolute inset-2 sm:inset-3 border border-[#B88E3E]/25 rounded-2xl pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#B88E3E]/15 rounded-xl pointer-events-none" />

        {/* Traditional Corner Lotus / Filigree Accents */}
        <div className="absolute top-4 left-4 text-[#B88E3E]/50 select-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h7v2H5v5H3V3z" fill="currentColor" stroke="none" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-4 right-4 text-[#B88E3E]/50 select-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 3h-7v2h5v5h2V3z" fill="currentColor" stroke="none" />
            <circle cx="15" cy="9" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 text-[#B88E3E]/50 select-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h7v-2H5v-5H3v7z" fill="currentColor" stroke="none" />
            <circle cx="9" cy="15" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 text-[#B88E3E]/50 select-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21h-7v-2h5v-5h2v7z" fill="currentColor" stroke="none" />
            <circle cx="15" cy="15" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Auspicious Sacred Invocation: श्री महावीराय नमः */}
        <div className="text-center mb-6">
          <p className="font-serif-cormorant text-base sm:text-lg tracking-[0.25em] text-[#916B27] font-semibold animate-pulse">
            {WEDDING_DATA.invocation}
          </p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#B88E3E]/50 to-transparent" />
            <span className="text-[#B88E3E] text-xs">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#B88E3E]/50 to-transparent" />
          </div>
        </div>

        {/* Primary Wedding Logo / Monogram */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative group w-36 h-36 sm:w-48 sm:h-48 rounded-full p-2 transition-transform duration-700 hover:scale-105">
            {/* Subtle halo glow */}
            <div className="absolute inset-0 rounded-full bg-[#B88E3E]/15 blur-2xl group-hover:bg-[#B88E3E]/30 transition-all duration-700" />
            
            {/* Inner Ring with Monogram */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#B88E3E]/50 shadow-luxury bg-white">
              <img
                src={ASSETS.weddingLogo}
                alt="Priyanshu & Rupal Wedding Monogram"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Intro Blessings Tagline */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="font-serif-cormorant italic text-lg sm:text-xl md:text-2xl text-[#6B6258] tracking-wide max-w-lg mx-auto">
            {WEDDING_DATA.blessingIntro}
          </p>
        </div>

        {/* Couple Names Presentation */}
        <div className="text-center space-y-3 sm:space-y-4 my-6">
          {/* Groom */}
          <div>
            <h1 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#2A241F]">
              <span className="text-gold-gradient">{WEDDING_DATA.groom.name}</span>
            </h1>
            <p className="font-serif-cormorant italic text-sm sm:text-base text-[#6B6258] mt-1.5 tracking-wider">
              S/o {WEDDING_DATA.groom.father}
            </p>
          </div>

          {/* Ampersand Flourish */}
          <div className="flex items-center justify-center gap-4 py-1">
            <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#B88E3E]/40 to-[#B88E3E]" />
            <span className="font-script-alex text-4xl sm:text-5xl text-[#916B27] leading-none select-none drop-shadow-sm">
              &
            </span>
            <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#B88E3E]/40 to-[#B88E3E]" />
          </div>

          {/* Bride */}
          <div>
            <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#2A241F]">
              <span className="text-gold-gradient">{WEDDING_DATA.bride.name}</span>
            </h2>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-3 my-6 sm:my-8">
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B88E3E]/40" />
          <div className="flex items-center gap-1.5 text-[#B88E3E]">
            <span className="text-xs">✦</span>
            <span className="text-base font-serif-cormorant">❦</span>
            <span className="text-xs">✦</span>
          </div>
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B88E3E]/40" />
        </div>

        {/* Heartfelt Wedding Invitation Message */}
        <div className="max-w-xl mx-auto text-center px-4">
          <blockquote className="font-serif-cormorant text-lg sm:text-xl leading-relaxed text-[#3E342B] italic">
            "{WEDDING_DATA.invitationMessage}"
          </blockquote>
          <p className="font-sans text-xs sm:text-sm text-[#6B6258] leading-relaxed mt-4">
            {WEDDING_DATA.invitationNote}
          </p>
        </div>

        {/* Date Anchor Badge */}
        <div className="mt-8 pt-6 border-t border-[#B88E3E]/15 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#6B6258] font-sans">
          <span className="font-semibold text-[#2A241F]">25 & 26 November 2026</span>
          <span className="text-[#B88E3E]">·</span>
          <span>Raipur Greens, Raipur</span>
          <span className="text-[#B88E3E]">·</span>
          <span className="font-serif-cormorant italic font-semibold text-[#916B27]">The Kocher Family</span>
        </div>

      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#events"
        className="mt-8 flex flex-col items-center gap-1 text-[#916B27] hover:text-[#2A241F] transition-colors focus:outline-none group"
        aria-label="Scroll down to view wedding events schedule"
      >
        <span className="font-serif-cormorant text-xs tracking-[0.25em] uppercase font-semibold">
          Celebrations Schedule
        </span>
        <svg
          className="w-4 h-4 animate-bounce text-[#B88E3E] group-hover:text-[#916B27]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>

    </section>
  );
};
