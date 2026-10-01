import React, { useState } from 'react';
import { Sparkles, Clock, Calendar, Check, Music2, Flame, Heart, Crown, Gift, SunMedium } from 'lucide-react';
import { WEDDING_DATA, WeddingEvent } from '../config/weddingData';

export const EventTimeline: React.FC = () => {
  const [activeDateTab, setActiveDateTab] = useState<'all' | 'day1' | 'day2'>('all');
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Helper to render authentic Indian motifs for each ritual
  const renderEventIcon = (type: WeddingEvent['iconType']) => {
    switch (type) {
      case 'carnival':
        return <SunMedium className="w-4 h-4 text-[#D97706]" />;
      case 'mayra':
        return <Gift className="w-4 h-4 text-[#9333EA]" />;
      case 'sangeet':
        return <Music2 className="w-4 h-4 text-[#BE185D]" />;
      case 'baarat':
        return <Crown className="w-4 h-4 text-[#B45309]" />;
      case 'phere':
        return <Flame className="w-4 h-4 text-[#B91C1C]" />;
      case 'vidai':
        return <Heart className="w-4 h-4 text-[#4338CA]" />;
      case 'reception':
        return <Sparkles className="w-4 h-4 text-[#15803D]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#B88E3E]" />;
    }
  };

  const createGoogleCalendarLink = (event: WeddingEvent) => {
    const isDay1 = event.dateKey === 'day1';
    const dateStr = isDay1 ? '20261125' : '20261126';
    
    let startHour = '090000';
    if (event.name === 'CARNIVAL') startHour = '090000';
    else if (event.name === 'MAYRA') startHour = '130000';
    else if (event.name === 'SANGEET') startHour = '200000';
    else if (event.name === 'BAARAT') startHour = '100000';
    else if (event.name === 'PHERE') startHour = '120000';
    else if (event.name === 'VIDAI') startHour = '150000';
    else if (event.name === 'RECEPTION') startHour = '200000';

    const title = encodeURIComponent(`${event.name} — Priyanshu & Rupal Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startHour}/${dateStr}T230000&details=${details}&location=${location}`;
  };

  const handleShareEvent = (event: WeddingEvent) => {
    const text = `Join us for ${event.name} (${event.time}, ${event.date}) at ${WEDDING_DATA.venue.name} celebrating the wedding of Priyanshu Kocher & Rupal Jain. Details: ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2500);
    }
  };

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <p className="font-serif-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#916B27] font-semibold">
          Sacred Ceremonies & Celebrations
        </p>
        <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A241F] tracking-wide mt-2">
          Wedding Itinerary
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="h-[1px] w-12 bg-[#B88E3E]/40" />
          <span className="text-[#B88E3E] text-xs">✦</span>
          <span className="h-[1px] w-12 bg-[#B88E3E]/40" />
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#6B6258] mt-3 max-w-md mx-auto">
          We eagerly look forward to your presence and blessings at every auspicious celebration.
        </p>

        {/* Date Filter Tabs */}
        <div className="inline-flex items-center gap-1 p-1 bg-white/85 backdrop-blur-md rounded-xl border border-[#B88E3E]/30 shadow-sm mt-6">
          <button
            onClick={() => setActiveDateTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeDateTab === 'all'
                ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
                : 'text-[#6B6258] hover:text-[#2A241F]'
            }`}
          >
            All Celebrations (7 Events)
          </button>
          <button
            onClick={() => setActiveDateTab('day1')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeDateTab === 'day1'
                ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
                : 'text-[#6B6258] hover:text-[#2A241F]'
            }`}
          >
            25 November (Day 1)
          </button>
          <button
            onClick={() => setActiveDateTab('day2')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeDateTab === 'day2'
                ? 'bg-[#2A241F] text-[#FAF7F2] shadow-sm'
                : 'text-[#6B6258] hover:text-[#2A241F]'
            }`}
          >
            26 November (Day 2)
          </button>
        </div>
      </div>

      {/* Days Loop */}
      <div className="space-y-16">
        {WEDDING_DATA.dates
          .filter((day) => activeDateTab === 'all' || activeDateTab === day.key)
          .map((day, dayIndex) => (
            <div key={day.key} className="relative">
              
              {/* Day Header Banner */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B88E3E]/40 to-[#B88E3E]/60" />
                <div className="text-center px-5 py-2.5 rounded-2xl bg-white/90 border border-[#B88E3E]/35 shadow-sm">
                  <span className="font-serif-cormorant text-xs sm:text-sm tracking-widest text-[#916B27] uppercase font-bold block">
                    {day.dayOfWeek}
                  </span>
                  <h3 className="font-display-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#2A241F] tracking-wide">
                    {day.dateFormatted}
                  </h3>
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B88E3E]/40 to-[#B88E3E]/60" />
              </div>

              {/* Events Cards Grid with AI Generated Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="group relative rounded-2xl bg-white/90 backdrop-blur-sm border border-[#B88E3E]/30 shadow-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Event AI Generated Image Banner */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={event.image}
                        alt={`${event.name} celebration`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Subtle gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A241F]/80 via-[#2A241F]/20 to-transparent" />

                      {/* Floating Time Pill over Image */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#B88E3E]/40 text-[#2A241F] shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-[#916B27]" />
                        <span className="font-display-cinzel text-xs font-bold tracking-wider">
                          {event.time}
                        </span>
                      </div>

                      {/* Ritual Icon Badge over Image */}
                      <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-[#B88E3E]/40 flex items-center justify-center shadow-md">
                        {renderEventIcon(event.iconType)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Event Name */}
                        <h4 className="font-display-cinzel text-xl sm:text-2xl font-bold text-[#2A241F] tracking-wide mb-2 group-hover:text-[#916B27] transition-colors">
                          {event.name}
                        </h4>

                        {/* Event Description */}
                        <p className="font-sans text-xs sm:text-sm text-[#4A4036] leading-relaxed mb-3">
                          {event.description}
                        </p>

                        {/* Traditional Significance */}
                        <div className="pt-2 border-t border-[#B88E3E]/15">
                          <p className="font-serif-cormorant italic text-xs sm:text-sm text-[#7A6E62] leading-relaxed">
                            {event.traditionalSignificance}
                          </p>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-5 pt-4 border-t border-[#B88E3E]/20 flex items-center justify-between gap-2">
                        {/* Add to Google Calendar */}
                        <a
                          href={createGoogleCalendarLink(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-[#916B27] hover:text-[#2A241F] transition-colors"
                          title="Add to Google Calendar"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Add to Calendar</span>
                        </a>

                        {/* Share event timing */}
                        <button
                          onClick={() => handleShareEvent(event)}
                          className="inline-flex items-center gap-1 text-[11px] font-sans text-stone-500 hover:text-[#2A241F] transition-colors"
                          title="Copy event details"
                        >
                          {copiedEventId === event.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Copied</span>
                            </>
                          ) : (
                            <span>Share details</span>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Day divider flourish if day1 */}
              {dayIndex === 0 && activeDateTab === 'all' && (
                <div className="flex items-center justify-center gap-3 my-12 opacity-80">
                  <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#B88E3E]/40" />
                  <span className="text-[#B88E3E] text-xs font-serif-cormorant">❦</span>
                  <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#B88E3E]/40" />
                </div>
              )}

            </div>
          ))}
      </div>

    </section>
  );
};
