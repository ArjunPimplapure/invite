import React from 'react';
import { Share2, MessageCircle, RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingData';
import { ASSETS } from '../config/assets';

interface ClosingSectionProps {
  onReplayInvitation: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplayInvitation }) => {
  const handleWhatsAppWishes = () => {
    const text = encodeURIComponent(
      `Heartiest Congratulations Priyanshu & Rupal! We are delighted to receive your wedding invitation and look forward to celebrating with the Kocher family on 25 & 26 November 2026 at Raipur Greens.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Priyanshu & Rupal Wedding Invitation',
        text: 'You are cordially invited to celebrate the wedding celebrations of Priyanshu Kocher & Rupal Jain on 25 & 26 November 2026 at Raipur Greens, Raipur.',
        url: window.location.href,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      const shareUrl = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Wedding Invitation: Priyanshu Kocher & Rupal Jain\n25 & 26 November 2026 | Raipur Greens, Raipur\nView Invitation: `
      );
      window.open(`https://wa.me/?text=${text}${shareUrl}`, '_blank');
    }
  };

  return (
    <footer id="closing" className="relative py-24 px-4 sm:px-6 text-center overflow-hidden">
      
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B88E3E]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto space-y-8">
        
        {/* Heartfelt Emotional Quote */}
        <div className="space-y-3">
          <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#2A241F] leading-snug">
            "{WEDDING_DATA.closing.heartfeltQuote}"
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-[1px] w-12 bg-[#B88E3E]/40" />
            <span className="text-[#B88E3E] text-xs">❦</span>
            <span className="h-[1px] w-12 bg-[#B88E3E]/40" />
          </div>
        </div>

        {/* Couple Names */}
        <div>
          <h3 className="font-display-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-gold-gradient">
            {WEDDING_DATA.closing.coupleNames}
          </h3>
        </div>

        {/* Wedding Monogram Logo Underneath */}
        <div className="flex justify-center py-2">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 border border-[#B88E3E]/40 bg-white shadow-luxury">
            <img
              src={ASSETS.weddingLogo}
              alt="Priyanshu & Rupal Monogram"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Family Signature */}
        <div className="space-y-2">
          <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#6B6258] whitespace-pre-line leading-relaxed">
            {WEDDING_DATA.closing.familySignature}
          </p>
          <p className="font-sans text-xs tracking-wider text-[#916B27] uppercase">
            {WEDDING_DATA.closing.greetings}
          </p>
        </div>

        {/* Interactive Actions for Guests */}
        <div className="pt-6 border-t border-[#B88E3E]/20 flex flex-wrap items-center justify-center gap-3">
          {/* Send Blessings via WhatsApp */}
          <button
            onClick={handleWhatsAppWishes}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs sm:text-sm font-medium transition-colors shadow-sm focus:outline-none"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Send Wishes & Blessings</span>
          </button>

          {/* Share on WhatsApp */}
          <button
            onClick={handleShareInvitation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#2A241F] border border-[#B88E3E]/30 text-xs sm:text-sm font-medium transition-colors shadow-sm focus:outline-none"
          >
            <Share2 className="w-4 h-4 text-[#916B27]" />
            <span>Share Invitation</span>
          </button>

          {/* Replay Opening Animation */}
          <button
            onClick={onReplayInvitation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2A241F]/5 hover:bg-[#2A241F]/10 text-[#5E544A] border border-[#2A241F]/10 text-xs sm:text-sm font-medium transition-colors focus:outline-none"
            title="Replay the envelope opening animation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#916B27]" />
            <span>Replay Invitation</span>
          </button>
        </div>

        {/* Subtle footer watermark */}
        <div className="pt-8 text-[11px] text-[#A69B8D] font-sans">
          <p>Raipur Greens, Cherrikherri, Raipur · 25 & 26 November 2026</p>
        </div>

      </div>

    </footer>
  );
};
