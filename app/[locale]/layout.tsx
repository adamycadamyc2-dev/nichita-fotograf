import { NextIntlClientProvider } from 'next-intl';
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
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === 'ru';

  return {
    title: {
      default: isRu
        ? 'Adamco Nichita — Фотограф в Бельцах, Молдова'
        : 'Adamco Nichita — Fotograf din Bălți, Moldova',
      template: '%s | Adamco Nichita Photography',
    },

    description: isRu
      ? 'Профессиональный фотограф в Бельцах, Молдова. Портретная съёмка, семейные фотосессии, свадебная фотография, коммерческая съёмка. Запишитесь на фотосессию онлайн.'
      : 'Fotograf profesionist din Bălți, Moldova. Ședințe foto de portret, familie, nuntă și comerciale. Programează o ședință foto online.',

    keywords: isRu
      ? [
          'фотограф Бельцы',
          'фотосессия Молдова',
          'портретный фотограф',
          'свадебный фотограф',
          'семейная фотосессия',
          'Adamco Nichita',
          'Nichita Adamco',
          'фотограф Молдова',
        ]
      : [
          'fotograf Bălți',
          'ședință foto Moldova',
          'fotograf portret',
          'fotograf nuntă',
          'Adamco Nichita',
        ],

    authors: [
      {
        name: 'Nichita Adamco',
      },
    ],

    creator: 'Nichita Adamco',
    publisher: 'Adamco Nichita Photography',

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    metadataBase: new URL('https://nichita-fotograf.vercel.app'),

    alternates: {
      canonical: '/' + locale,
      languages: {
        ru: '/ru',
        ro: '/ro',
      },
    },

    icons: {
      icon: [
        {
          url: '/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          url: '/favicon-96x96.png',
          type: 'image/png',
          sizes: '96x96',
        },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',

    openGraph: {
      title: isRu
        ? 'Adamco Nichita — Фотограф в Бельцах'
        : 'Adamco Nichita — Fotograf din Bălți',

      description: isRu
        ? 'Профессиональный фотограф в Бельцах, Молдова. Портретная съёмка, семейные фотосессии, свадебная фотография.'
        : 'Fotograf profesionist din Bălți, Moldova. Ședințe foto de portret, familie și nuntă.',

      url: 'https://nichita-fotograf.vercel.app/' + locale,

      siteName: 'Adamco Nichita Photography',

      images: [
        {
          url: '/images/hero.jpg',
          width: 1200,
          height: 630,
          alt: isRu
            ? 'Adamco Nichita Photography'
            : 'Adamco Nichita Fotografie',
        },
      ],

      locale: isRu ? 'ru_RU' : 'ro_RO',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',

      title: isRu
        ? 'Adamco Nichita — Фотограф в Бельцах'
        : 'Adamco Nichita — Fotograf din Bălți',

      description: isRu
        ? 'Профессиональный фотограф в Бельцах, Молдова'
        : 'Fotograf profesionist din Bălți, Moldova',

      images: ['/images/hero.jpg'],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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
    messages = (await import('../../messages/' + locale + '.json')).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}