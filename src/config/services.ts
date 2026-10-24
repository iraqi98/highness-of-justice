import {
  Briefcase,
  Building2,
  FileSignature,
  Gavel,
  Globe,
  Landmark,
  Lightbulb,
  Plane,
  Receipt,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ImageKey } from './images';

/**
 * The 10 practice areas. Order matches practice.items (titles + bullets) and
 * svc.intros in messages/*.json; the text lives there, this file holds structure.
 *
 * audience: indexes into clients.items (0 foreign companies, 1 local companies,
 *           2 foreign nationals, 3 embassies) — the client types BRAND.md ties to this work.
 * foreign:  show the link to the foreign-companies page.
 * related:  indexes of 3 other services.
 */
export const services: {
  slug: string;
  icon: LucideIcon;
  image: ImageKey;
  audience: number[];
  foreign: boolean;
  related: [number, number, number];
}[] = [
  { slug: 'company-formation', icon: Building2, image: 'clientMeeting', audience: [0, 1], foreign: true, related: [2, 1, 7] },
  { slug: 'tax-advisory', icon: Receipt, image: 'taxDocuments', audience: [0, 1], foreign: true, related: [0, 5, 8] },
  { slug: 'foreign-company-support', icon: Globe, image: 'trackBaghdad', audience: [0, 3], foreign: true, related: [0, 9, 7] },
  { slug: 'contracts', icon: FileSignature, image: 'contractSigning', audience: [0, 1], foreign: true, related: [4, 6, 0] },
  { slug: 'dispute-resolution', icon: Gavel, image: 'gavel', audience: [0, 1], foreign: false, related: [3, 5, 1] },
  { slug: 'labor-law', icon: Users, image: 'employmentContract', audience: [0, 1], foreign: true, related: [9, 1, 4] },
  { slug: 'intellectual-property', icon: Lightbulb, image: 'ideasSession', audience: [0, 1], foreign: false, related: [3, 4, 8] },
  { slug: 'government-relations', icon: Landmark, image: 'visionBaghdad', audience: [0, 1, 3], foreign: true, related: [0, 2, 9] },
  { slug: 'advisory-services', icon: Briefcase, image: 'advisoryDesk', audience: [0, 1], foreign: false, related: [3, 7, 1] },
  { slug: 'work-visas', icon: Plane, image: 'executive', audience: [0, 2], foreign: true, related: [5, 2, 7] },
];

export const serviceIndex = (slug: string) => services.findIndex((s) => s.slug === slug);
