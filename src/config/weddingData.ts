/**
 * Central Wedding Data Configuration
 * - Invocation updated to sacred Jain blessing: "|| श्री महावीराय नमः ||"
 * - Linked with high-fidelity event visual assets
 */

import { ASSETS } from './assets';

export interface WeddingEvent {
  id: string;
  name: string;
  time: string;
  date: string;
  dateKey: 'day1' | 'day2';
  description: string;
  traditionalSignificance: string;
  iconType: 'carnival' | 'mayra' | 'sangeet' | 'baarat' | 'phere' | 'vidai' | 'reception';
  image: string;
  accentTheme: string;
}

export const WEDDING_DATA = {
  groom: {
    name: 'Priyanshu Kocher',
    father: 'Shri Mahendra Kocher',
    family: 'The Kocher Family',
    side: "Groom's Side",
  },
  bride: {
    name: 'Rupal Jain',
  },
  // Updated Jain holy invocation as requested by user
  invocation: '|| श्री महावीराय नमः ||',
  blessingIntro: 'Together with the blessings of their families',
  invitationMessage:
    'With hearts full of joy and the blessings of our loved ones, we invite you to celebrate the beginning of a beautiful new journey.',
  invitationNote:
    'The Kocher family cordially requests the honour of your auspicious presence and blessings to grace the joyous wedding festivities of their beloved son Priyanshu with Rupal.',
  
  targetCountdownDate: '2026-11-26T10:00:00+05:30', // Baarat & Wedding Day start

  dates: [
    {
      key: 'day1',
      dateFormatted: '25 November 2026',
      dayOfWeek: 'Wednesday',
      events: [
        {
          id: 'carnival',
          name: 'CARNIVAL',
          time: '9:00 AM',
          date: '25 November 2026',
          dateKey: 'day1',
          description: 'A vibrant morning filled with cheerful music, festivities, colors, and celebratory games.',
          traditionalSignificance: 'Welcoming guests with zest, high spirits, and joyful fellowship.',
          iconType: 'carnival',
          image: ASSETS.events.carnival,
          accentTheme: '#D97706',
        },
        {
          id: 'mayra',
          name: 'MAYRA',
          time: '1:00 PM',
          date: '25 November 2026',
          dateKey: 'day1',
          description: 'A sacred and heartfelt traditional family blessing ritual filled with maternal love and auspicious gifts.',
          traditionalSignificance: 'Maternal uncle’s ceremonial blessing and bestowal of auspicious wedding attire.',
          iconType: 'mayra',
          image: ASSETS.events.mayra,
          accentTheme: '#9333EA',
        },
        {
          id: 'sangeet',
          name: 'SANGEET',
          time: '8:00 PM',
          date: '25 November 2026',
          dateKey: 'day1',
          description: 'An enchanting evening of rhythmic dances, melodic beats, and radiant family celebrations under starry lights.',
          traditionalSignificance: 'Uniting both families in musical harmony, laughter, and dazzling performances.',
          iconType: 'sangeet',
          image: ASSETS.events.sangeet,
          accentTheme: '#BE185D',
        },
      ],
    },
    {
      key: 'day2',
      dateFormatted: '26 November 2026',
      dayOfWeek: 'Thursday',
      events: [
        {
          id: 'baarat',
          name: 'BAARAT',
          time: '10:00 AM',
          date: '26 November 2026',
          dateKey: 'day2',
          description: 'The joyous and royal groom’s wedding procession with dhol beats, celebratory dancing, and royal fanfare.',
          traditionalSignificance: 'The grand arrival of the groom and his entourage at the wedding pavilion.',
          iconType: 'baarat',
          image: ASSETS.events.baarat,
          accentTheme: '#B45309',
        },
        {
          id: 'phere',
          name: 'PHERE',
          time: '12:00 PM',
          date: '26 November 2026',
          dateKey: 'day2',
          description: 'The sacred Vedic wedding vows around the holy agni sealing the union of souls for seven lifetimes.',
          traditionalSignificance: 'The sacred culmination of rituals, Saptapadi, and eternal spiritual vows.',
          iconType: 'phere',
          image: ASSETS.events.phere,
          accentTheme: '#B91C1C',
        },
        {
          id: 'vidai',
          name: 'VIDAI',
          time: '3:00 PM',
          date: '26 November 2026',
          dateKey: 'day2',
          description: 'An emotional and tender farewell as the bride steps into her new life showered with flowers and love.',
          traditionalSignificance: 'A tender blessing showering the newly-weds as they embark on their marital journey.',
          iconType: 'vidai',
          image: ASSETS.events.vidai,
          accentTheme: '#4338CA',
        },
        {
          id: 'reception',
          name: 'RECEPTION',
          time: '8:00 PM',
          date: '26 November 2026',
          dateKey: 'day2',
          description: 'A regal gala evening of fine banquet dining, felicitations, and timeless wedding memories.',
          traditionalSignificance: 'An evening of felicitation and dinner with extended family and distinguished guests.',
          iconType: 'reception',
          image: ASSETS.events.reception,
          accentTheme: '#15803D',
        },
      ],
    },
  ],

  venue: {
    name: 'Raipur Greens',
    address: 'Behind Sibbal Farms, Cherrikherri, Raipur',
    city: 'Raipur, Chhattisgarh',
    googleMapsUrl: 'https://maps.app.goo.gl/WngMH7dxTXV39nya7?g_st=ac',
    landmarkTip: 'Easily accessible via Cherrikherri Main Road with ample dedicated valet parking for all guests.',
  },

  closing: {
    heartfeltQuote: 'Your presence will make our celebration even more special.',
    coupleNames: 'Priyanshu & Rupal',
    familySignature: 'With love,\nThe Kocher Family',
    greetings: 'Warm regards & Best Compliments from Near & Dear Ones',
  },
} as const;
