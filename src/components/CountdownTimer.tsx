import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // 26 November 2026 10:00:00 AM IST
    const targetDate = new Date('2026-11-26T10:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Container with gold foil border and subtle glow */}
      <div className="relative rounded-3xl bg-white/75 backdrop-blur-md border border-[#B88E3E]/30 p-6 sm:p-10 shadow-luxury overflow-hidden">
        
        {/* Subtle decorative corners */}
        <div className="absolute top-3 left-3 text-[#B88E3E]/30 pointer-events-none">✦</div>
        <div className="absolute top-3 right-3 text-[#B88E3E]/30 pointer-events-none">✦</div>
        <div className="absolute bottom-3 left-3 text-[#B88E3E]/30 pointer-events-none">✦</div>
        <div className="absolute bottom-3 right-3 text-[#B88E3E]/30 pointer-events-none">✦</div>

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF7F2] border border-[#B88E3E]/20 text-[#916B27] mb-3">
          <Clock className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
            The Auspicious Countdown
          </span>
        </div>

        <h3 className="font-display-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#2A241F] tracking-wide mb-2">
          Until The Grand Wedding Day
        </h3>
        
        <p className="font-serif-cormorant italic text-sm sm:text-base text-[#6B6258] mb-8">
          26 November 2026 · Baarat & Sacred Wedding Vows
        </p>

        {/* Countdown Digits Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFFFFF] to-[#FAF7F2] border border-[#B88E3E]/35 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Digit Box */}
              <span className="font-display-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-gold-gradient tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              {/* Unit Label */}
              <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-[#7A6E62] mt-1.5 uppercase">
                {unit.label}
              </span>

              {/* Subtle top gold accent line */}
              <span className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#B88E3E]/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#916B27] font-serif-cormorant italic">
          <span>Celebrating the auspicious union of Priyanshu & Rupal</span>
        </div>

      </div>
    </section>
  );
};
