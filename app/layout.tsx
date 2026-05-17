import { Plus_Jakarta_Sans, Tajawal } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'N-ID',
  description: 'Smart Identity Starts at Birth',
  icons: {
    icon: '/images/logo.jpeg',
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#F8F9FA] text-[#202124] antialiased">
        {children}
      </body>
    </html>
  );
}
