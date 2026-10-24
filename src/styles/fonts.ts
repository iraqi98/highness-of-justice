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

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const fontClassName = [plexArabic.variable, manrope.variable, USE_BRAND_FONTS && 'brand-fonts']
  .filter(Boolean)
  .join(' ');
