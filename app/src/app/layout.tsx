import type { Metadata } from 'next';
import { Inter_Tight, Schibsted_Grotesk } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import './globals.css';

const display = Schibsted_Grotesk({
  variable: '--font-schibsted',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Hart & Huis Makelaardij — NVM-makelaar in Haarlem',
  description:
    'Verkopen, kopen of taxeren in Haarlem — met twee makelaars die je bij naam kennen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='nl'
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <meta name='apple-mobile-web-app-title' content='MyWebSite' />
      </head>
      <body className='min-h-full'>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
