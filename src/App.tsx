/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LuxuryEnvelope } from './components/LuxuryEnvelope';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { WeddingScratchCard } from './components/WeddingScratchCard';
import { EventTimeline } from './components/EventTimeline';
import { VenueSection } from './components/VenueSection';
import { ClosingSection } from './components/ClosingSection';
import { FloatingMusicControl } from './components/FloatingMusicControl';
import { SparkleCanvas } from './components/SparkleCanvas';
import { FloatingNav } from './components/FloatingNav';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenComplete = () => {
    setIsEnvelopeOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayInvitation = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2A241F] selection:bg-[#E2D2A5] selection:text-[#382613] overflow-x-hidden paper-texture">
      
      {/* Ambient floating golden particles & sparkles */}
      <SparkleCanvas intensity={isEnvelopeOpen ? 'subtle' : 'celebratory'} />

      {/* Floating Music Controller */}
      <FloatingMusicControl />

      {/* 1. Opening Luxury Envelope Experience */}
      {!isEnvelopeOpen && (
        <LuxuryEnvelope onOpenComplete={handleOpenComplete} />
      )}

      {/* 2. Main Wedding Invitation (Revealed after envelope opens) */}
      <main
        className={`transition-opacity duration-1000 ${
          isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {/* Soft background ambient blurs */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-[#B88E3E]/5 blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#5E121B]/5 blur-3xl" />
          <div className="absolute top-2/3 -left-20 w-96 h-96 rounded-full bg-[#B88E3E]/5 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#5E121B]/5 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-4">
          {/* Hero Section */}
          <HeroSection />

          {/* Live Countdown Timer for 26th November */}
          <CountdownTimer />

          {/* Interactive Scratch Card in Middle */}
          <WeddingScratchCard />

          {/* Events Schedule with AI Generated Visuals */}
          <EventTimeline />

          {/* Venue & Location Directions */}
          <VenueSection />

          {/* Emotional Closing & Family Signature */}
          <ClosingSection onReplayInvitation={handleReplayInvitation} />
        </div>

        {/* Minimal Floating Navigation */}
        <FloatingNav onReplayInvitation={handleReplayInvitation} />
      </main>

    </div>
  );
}
