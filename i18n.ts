import { getRequestConfig } from 'next-intl/server';

export const locales = ['ru', 'ro'] as const;
export const defaultLocale = 'ru' as const;

export default getRequestConfig(async ({ locale }) => {
  // ЗАЩИТА: Если язык не определен или его нет в списке, берем 'ru' по умолчанию
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});