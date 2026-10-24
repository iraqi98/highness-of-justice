import { withBase } from '@/config/base-path';

/** Static pages under /[locale]/, as path segments with the trailing slash the export uses. */
export type PagePath = '' | 'foreign-companies/';

export const FOREIGN_COMPANIES: PagePath = 'foreign-companies/';

/** Link to a page (and optional section) that works from any page and under basePath. */
export const pageHref = (locale: string, page: PagePath = '', hash?: string) =>
  withBase(`/${locale}/${page}${hash ? `#${hash}` : ''}`);

/** Anchor of a practice-area card on the home page; index is 0-based. */
export const practiceAnchor = (index: number) => `practice-${String(index + 1).padStart(2, '0')}`;
