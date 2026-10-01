import React, { useState, useEffect } from 'react';
import { Home, Calendar, MapPin, RotateCcw } from 'lucide-react';

interface FloatingNavProps {
  onReplayInvitation: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onReplayInvitation }) => {
  const [activeSection, setActiveSection] = useState<'hero' | 'events' | 'venue'>('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const eventsEl = document.getElementById('events');
      const venueEl = document.getElementById('venue');

      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (venueEl && scrollPos >= venueEl.offsetTop) {
        setActiveSection('venue');
      } else if (eventsEl && scrollPos >= eventsEl.offsetTop) {
        setActiveSection('events');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Invitation Navigation"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#B88E3E]/35 shadow-[0_8px_25px_rgba(58,42,26,0.12)]">
        
        {/* Home */}
        <button
          onClick={() => scrollToSection('hero')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeSection === 'hero'
              ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
              : 'text-[#6B6258] hover:text-[#2A241F]'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {/* Events */}
        <button
          onClick={() => scrollToSection('events')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeSection === 'events'
              ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
              : 'text-[#6B6258] hover:text-[#2A241F]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span>Events</span>
        </button>

        {/* Venue */}
        <button
          onClick={() => scrollToSection('venue')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeSection === 'venue'
              ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
              : 'text-[#6B6258] hover:text-[#2A241F]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span>Venue</span>
        </button>

        {/* Subtle divider */}
        <div className="h-4 w-[1px] bg-[#B88E3E]/30 mx-0.5" />

        {/* Replay Envelope */}
        <button
          onClick={onReplayInvitation}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#7A6E62] hover:text-[#2A241F] transition-colors"
          title="Replay Envelope Opening"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#916B27]" />
          <span className="hidden md:inline">Replay</span>
        </button>

      </div>
    </nav>
  );
};
