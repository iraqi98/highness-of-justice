import { IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';
import './brand-fonts.css';

/**
 * Brand fonts (Somar for English, Bahij TheSansArabic for Arabic) are declared
 * in ./brand-fonts.css and point at /public/fonts/. To switch them on:
 *   1. drop the .woff2 files listed in /public/fonts/README.md into /public/fonts
 *   2. set USE_BRAND_FONTS to true
 * The Google fonts below stay in the stack as fallbacks.
 */
export const USE_BRAND_FONTS = false;

// Only the Arabic subset is preloaded: Arabic text appears on every page (including /en/
// in the header). Latin glyphs load on demand from the same @font-face rules.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  // Only used on /en/; not preloaded so Arabic pages don't fetch it.
  preload: false,
});

export const fontClassName = [plexArabic.variable, manrope.variable, USE_BRAND_FONTS && 'brand-fonts']
  .filter(Boolean)
  .join(' ');
