import { getRequestConfig } from 'next-intl/server';

export const locales = ['ru', 'ro'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export default getRequestConfig(async ({ locale }) => {
  // Проверяем, есть ли язык в списке поддерживаемых (без использования 'any')
  const validLocale = locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});