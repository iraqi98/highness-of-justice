import { withBase } from '@/config/base-path';

/** A page under /[locale]/, as a path with the trailing slash the static export uses ('' = home). */
export type PagePath = '' | `${string}/`;

export const FOREIGN_COMPANIES: PagePath = 'foreign-companies/';

export const servicePage = (slug: string): PagePath => `services/${slug}/`;

/** Link to a page (and optional section) that works from any page and under basePath. */
export const pageHref = (locale: string, page: PagePath = '', hash?: string) =>
  withBase(`/${locale}/${page}${hash ? `#${hash}` : ''}`);

/** Home-page contact form with a practice area preselected (read by ConsultForm). */
export const contactHref = (locale: string, serviceSlug?: string) =>
  withBase(`/${locale}/${serviceSlug ? `?service=${serviceSlug}` : ''}#contact`);

/** Anchor of a practice-area card on the home page; index is 0-based. */
export const practiceAnchor = (index: number) => `practice-${String(index + 1).padStart(2, '0')}`;
