import './globals.css';
import { Inter } from 'next/font/google';

// Previously the Tailwind config pointed fontFamily.sans at "Inter" but the
// font itself was never loaded, so every browser silently fell back to the
// OS system font. next/font actually fetches, self-hosts, and swaps it in
// with no layout shift.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'The Green Whisk',
  description: 'A warm, modern drink and recipe blog built for thoughtful sips.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      {/* No bg-* class here on purpose — the gradient background lives in
          globals.css on `body` and was previously being clobbered by a flat
          bg-[#FAF7F2] utility applied both here and in page.js. */}
      <body className="min-h-screen font-sans text-espresso-600 antialiased">{children}</body>
    </html>
  );
}
