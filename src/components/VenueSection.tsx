import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingData';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Container */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-md border border-[#B88E3E]/35 p-8 sm:p-12 md:p-16 shadow-luxury overflow-hidden text-center">
        
        {/* Subtle Decorative Arch Lines */}
        <div className="absolute inset-3 border border-[#B88E3E]/20 rounded-2xl pointer-events-none" />
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#B88E3E]/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-[#B88E3E]/5 blur-3xl pointer-events-none" />

        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#B88E3E]/25 text-[#916B27] mb-6">
          <MapPin className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-widest uppercase font-semibold">
            Wedding Celebration Venue
          </span>
        </div>

        {/* Venue Title */}
        <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A241F] tracking-wide mb-3">
          {WEDDING_DATA.venue.name}
        </h2>

        {/* Full Address */}
        <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#5E544A] max-w-lg mx-auto">
          {WEDDING_DATA.venue.address}
        </p>
        <p className="font-sans text-xs tracking-wider uppercase text-[#916B27] font-semibold mt-1">
          {WEDDING_DATA.venue.city}
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] w-16 bg-[#B88E3E]/30" />
          <span className="text-xs text-[#B88E3E]">✦</span>
          <span className="h-[1px] w-16 bg-[#B88E3E]/30" />
        </div>

        {/* Location Directions Tip */}
        <p className="font-sans text-xs sm:text-sm text-[#6B6258] max-w-md mx-auto mb-8 leading-relaxed">
          {WEDDING_DATA.venue.landmarkTip}
        </p>

        {/* Primary Action Button: Exact prompt requirements */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WEDDING_DATA.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2A241F] text-[#FAF7F2] hover:bg-[#3F0A10] border border-[#B88E3E] font-display-cinzel text-sm sm:text-base font-semibold tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[#B88E3E] focus:ring-offset-2 group"
          >
            <span className="text-lg">📍</span>
            <span>VIEW LOCATION</span>
            <ExternalLink className="w-4 h-4 text-[#D8B570] group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Copy Address Button */}
          <button
            onClick={handleCopyAddress}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/90 hover:bg-[#FAF7F2] text-[#2A241F] border border-[#B88E3E]/40 font-sans text-xs sm:text-sm font-medium transition-colors shadow-sm focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Address Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#916B27]" />
                <span>Copy Full Address</span>
              </>
            )}
          </button>
        </div>

        {/* Subtle Map Coordinates Badge */}
        <div className="mt-8 pt-6 border-t border-[#B88E3E]/15 flex items-center justify-center gap-2 text-[11px] text-[#7A6E62]">
          <Navigation className="w-3 h-3 text-[#B88E3E]" />
          <span>Tap "View Location" to navigate directly via Google Maps or Apple Maps</span>
        </div>

      </div>

    </section>
  );
};
