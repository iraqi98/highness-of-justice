import type { ReactNode } from 'react';
import './globals.css';

// The <html> element lives in [locale]/layout.tsx so lang/dir follow the locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
