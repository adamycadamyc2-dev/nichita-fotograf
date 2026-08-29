import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'Adamco Nichita — Фотограф в Бельцах, Молдова',
    template: '%s | Adamco Nichita Photography'
  },
  description: 'Профессиональный фотограф в Бельцах, Молдова. Портретная съёмка, семейные фотосессии.',
  keywords: ['фотограф Бельцы', 'фотосессия Молдова', 'Adamco Nichita'],
  authors: [{ name: 'Nichita Adamco' }],
  metadataBase: new URL('https://nichita-fotograf.vercel.app'),
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-primary text-text-primary font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}