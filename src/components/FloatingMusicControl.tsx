import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audioPlayer';
import { ASSETS } from '../config/assets';

export const FloatingMusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = async () => {
    await weddingAudio.toggleMusic();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center">
      {/* Tooltip on hover/tap */}
      {showTooltip && (
        <div className="mr-3 px-3 py-1.5 rounded-full bg-[#2A241F]/90 backdrop-blur-md text-[#FAF7F2] text-xs shadow-lg border border-[#B88E3E]/30 whitespace-nowrap animate-fadeIn">
          <p className="font-medium text-[#D8B570]">{ASSETS.musicTitle}</p>
          <p className="text-[10px] text-stone-300">{isPlaying ? 'Tap to pause' : 'Tap to play music'}</p>
        </div>
      )}

      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
        className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B88E3E] focus:ring-offset-2 ${
          isPlaying
            ? 'bg-[#FAF7F2]/95 border border-[#B88E3E] shadow-[0_4px_20px_rgba(184,142,62,0.35)]'
            : 'bg-[#FAF7F2]/80 border border-[#B88E3E]/40 hover:border-[#B88E3E] shadow-sm'
        }`}
      >
        {/* Subtle spinning gold ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-dashed border-[#B88E3E]/50 animate-[spin_12s_linear_infinite]" />
        )}

        {/* Audio Icon & Wave Bars */}
        <div className="flex items-center gap-1">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-[3px] bg-[#916B27] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
              <span className="w-[3px] bg-[#B88E3E] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-[3px] bg-[#D8B570] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-3" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-stone-500 group-hover:text-[#916B27] transition-colors" />
          )}
        </div>
      </button>
    </div>
  );
};
