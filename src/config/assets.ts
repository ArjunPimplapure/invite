/**
 * ============================================================================
 * ASSET CONFIGURATION & CUSTOMIZATION GUIDE
 * ============================================================================
 * 
 * 1. WEDDING LOGO / MONOGRAM:
 *    - Update `ASSETS.weddingLogo` below to point to your new file (e.g., '/assets/wedding_monogram.jpg').
 * 
 * 2. BACKGROUND WEDDING SONG:
 *    - Custom wedding audio file placed at `/public/audio/wedding_music.mp3`.
 *    - Paths are resolved with `import.meta.env.BASE_URL` so GitHub Pages and any subfolder hosting works perfectly!
 * 
 * 3. EVENT IMAGES & WAX SEAL:
 *    - Generated high-fidelity AI imagery for all 7 wedding rituals and events.
 * ============================================================================
 */

import monogramImg from '../assets/images/wedding_monogram_1790881675910.jpg';
import sealImg from '../assets/images/burgundy_wax_seal_1790881686872.jpg';
import bgImg from '../assets/images/royal_invitation_bg_1790881698547.jpg';

// Event AI Generated Visuals
import carnivalImg from '../assets/images/event_carnival_1790883290070.jpg';
import mayraImg from '../assets/images/event_mayra_1790883300956.jpg';
import sangeetImg from '../assets/images/event_sangeet_1790883311989.jpg';
import baaratImg from '../assets/images/event_baarat_1790883323967.jpg';
import phereImg from '../assets/images/event_phere_1790883343748.jpg';
import vidaiImg from '../assets/images/event_vidai_1790883356827.jpg';
import receptionImg from '../assets/images/event_reception_1790883370148.jpg';

const baseUrl = import.meta.env.BASE_URL || './';
const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const ASSETS = {
  // Primary Wedding Logo / Monogram (Intertwined P & R with floral motif)
  weddingLogo: monogramImg,

  // Wax Seal on the envelope cover
  waxSeal: sealImg,

  // Subtle luxury paper background texture
  invitationBackground: bgImg,

  // Event Imagery
  events: {
    carnival: carnivalImg,
    mayra: mayraImg,
    sangeet: sangeetImg,
    baarat: baaratImg,
    phere: phereImg,
    vidai: vidaiImg,
    reception: receptionImg,
  },

  // Background Wedding Music URL (Works on GitHub Pages, Vercel, Local, etc.)
  backgroundMusic: `${cleanBase}audio/wedding_music.mp3`,
  backgroundMusicWav: `${cleanBase}audio/wedding_music.wav`,
  
  // Track details shown in the floating player tooltip
  musicTitle: 'Priyanshu & Rupal Wedding Theme',
  musicArtist: 'Celebratory Romantic Wedding Beats',
};
