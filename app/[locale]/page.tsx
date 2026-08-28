'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CONTACTS = {
  phone: '+37369418887',
  phoneDisplay: '+373 69 418 887',
  telegram: 'Nikita_adamco',
  instagram: 'nichita_fotograf',
  email: 'admumcodao2@gmail.com',
};

const SERVICE_PRICES: Record<string, string> = {
  portrait: '250 MDL',
  lovestory: '400 MDL',
  family: '500 MDL',
  birthday: '900 MDL',
  reportage: '1000 MDL',
  baptism: '1200 MDL',
  commercial: '1500 MDL',
};

export default function Home() {
  const t = useTranslations();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', clientTelegram: '', date: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const serviceKeys = ['portrait', 'lovestory', 'family', 'birthday', 'reportage', 'baptism', 'commercial'] as const;
  const portfolioKeys = ['portrait', 'lovestory', 'reportage', 'birthday', 'animals'] as const;

  const portfolioImages: Record<string, string> = {
    portrait: '/images/portrait.jpg',
    lovestory: '/images/lovestory.jpg',
    family: '/images/family.jpg',
    birthday: '/images/birthday.jpg',
    reportage: '/images/reportage.jpg',
    baptism: '/images/baptism.jpg',
    commercial: '/images/commercial.jpg',
    animals: '/images/animals.jpg',
  };

  const scrollToBooking = (service: string = '') => {
    if (service) setSelectedService(service);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceName = selectedService ? t(`services.items.${selectedService}.title`) : 'Не выбрано';
    const price = selectedService ? SERVICE_PRICES[selectedService] : 'По договорённости';

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          clientTelegram: formData.clientTelegram,
          service: serviceName,
          price,
          date: formData.date,
          comment: formData.comment,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSent(true);
        setFormData({ name: '', phone: '', clientTelegram: '', date: '', comment: '' });
        setSelectedService('');
        setTimeout(() => setFormSent(false), 5000);
      } else {
        alert('Ошибка: ' + (data.error || 'Не удалось отправить'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-primary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Photographer',
            name: 'Adamco Nichita',
            description: 'Профессиональный фотограф в Бельцах, Молдова',
            url: 'https://nichita-fotograf.vercel.app',
            telephone: '+37369418887',
            email: 'admumcodao2@gmail.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Бельцы', addressCountry: 'MD' },
            sameAs: ['https://www.instagram.com/nichita_fotograf/', 'https://t.me/Nikita_adamco'],
            priceRange: '250-1500 MDL'
          })
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-line">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-serif text-2xl text-text-primary tracking-tight transition-colors hover:text-accent">AN</a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#work" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">{t('nav.portfolio')}</a>
              <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">{t('nav.pricing')}</a>
              <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">{t('nav.about')}</a>
              <a href="#services" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">{t('nav.services')}</a>
              <a href="#contact" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">{t('nav.contact')}</a>
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 border border-line rounded-sm overflow-hidden">
                <Link href="/ru" className="px-3 py-1.5 text-xs tracking-wider transition-colors hover:bg-accent hover:text-primary">RU</Link>
                <div className="w-px h-4 bg-line" />
                <Link href="/ro" className="px-3 py-1.5 text-xs tracking-wider transition-colors hover:bg-accent hover:text-primary">RO</Link>
              </div>
              <button onClick={() => scrollToBooking()} className="btn-primary btn-compact">{t('nav.book')}</button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative min-h-[100dvh] pt-28 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[calc(100dvh-120px)] items-center py-12 lg:py-0">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="eyebrow mb-6 md:mb-8 fade-in">{t('common.title')} · {t('common.location')}</p>
              <h1 className="fade-in fade-in-1 font-serif" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '0.95' }}>
                <span className="block text-text-primary">Adamco</span>
                <span className="block text-text-secondary">Nichita</span>
              </h1>
              <p className="mt-6 md:mt-8 text-lg md:text-xl text-text-secondary max-w-md leading-relaxed fade-in fade-in-2">{t('common.tagline')}</p>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 fade-in fade-in-3">
                <button onClick={() => scrollToBooking()} className="btn-primary">{t('hero.cta_primary')}<span className="arrow">→</span></button>
                <a href="#work" className="btn-secondary text-center sm:text-left"><span>{t('hero.cta_secondary')}</span></a>
              </div>
            </div>
            <div className="lg:col-span-6 fade-in fade-in-2">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] image-hover overflow-hidden rounded-sm">
                <Image src="/images/hero.jpg" alt="Adamco Nichita Photography" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-24 gap-6">
            <div>
              <p className="eyebrow mb-4 fade-in">01 — {t('portfolio.title')}</p>
              <h2 className="text-text-primary font-serif fade-in fade-in-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.0' }}>{t('portfolio.subtitle')}</h2>
            </div>
            <a href="#work" className="btn-secondary btn-compact fade-in fade-in-2 self-start md:self-auto"><span>{t('portfolio.view_all')}</span></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {portfolioKeys.map((key, index) => {
              const isLast = index === portfolioKeys.length - 1;
              const isLarge = index % 2 === 0;
              const imgSrc = portfolioImages[key];
              if (isLast) {
                return (
                  <div key={key} className="md:col-span-12 image-hover group cursor-pointer fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                    <div className="relative aspect-[21/9] mb-4 overflow-hidden rounded-sm photo-placeholder">
                      <Image src={imgSrc} alt={t(`portfolio.categories.${key}`)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 90vw" />
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10"><span className="eyebrow text-text-primary/70 bg-primary/50 px-2 py-1 rounded-sm backdrop-blur-sm">0{index + 1}</span></div>
                    </div>
                    <h3 className="text-text-primary font-serif group-hover:text-accent transition-colors" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: '1.1' }}>{t(`portfolio.categories.${key}`)}</h3>
                  </div>
                );
              }
              return (
                <div key={key} className={`image-hover group cursor-pointer fade-in ${isLarge ? 'md:col-span-7' : 'md:col-span-5'} ${index === 1 || index === 3 ? 'md:mt-12 lg:mt-24' : ''}`} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <div className={`relative ${isLarge ? 'aspect-[4/5]' : 'aspect-square'} mb-4 overflow-hidden rounded-sm photo-placeholder`}>
                    <Image src={imgSrc} alt={t(`portfolio.categories.${key}`)} fill className="object-cover" sizes={isLarge ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"} />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10"><span className="eyebrow text-text-primary/70 bg-primary/50 px-2 py-1 rounded-sm backdrop-blur-sm">0{index + 1}</span></div>
                  </div>
                  <h3 className="text-text-primary font-serif group-hover:text-accent transition-colors" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: '1.1' }}>{t(`portfolio.categories.${key}`)}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="section bg-primary-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12 md:mb-24">
            <p className="eyebrow mb-4 fade-in">02 — {t('pricing.title')}</p>
            <h2 className="text-text-primary font-serif max-w-3xl fade-in fade-in-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.0' }}>{t('pricing.subtitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {serviceKeys.map((key, index) => {
              const isLast = index === serviceKeys.length - 1;
              return (
                <div key={key} className={`pricing-card border border-line bg-primary p-6 md:p-10 fade-in ${isLast ? 'md:col-span-2' : ''}`} style={{ animationDelay: `${0.08 * (index + 1)}s` }}>
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <span className="eyebrow text-text-muted mb-3 block">0{index + 1}</span>
                      <h3 className="text-text-primary font-serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: '1.1' }}>{t(`pricing.items.${key}.title`)}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-accent font-serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>{t(`pricing.items.${key}.price`)}</span>
                        <span className="text-xs text-text-muted uppercase tracking-wider hidden sm:inline">{t('pricing.currency')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-md">{t(`pricing.items.${key}.description`)}</p>
                  <button onClick={() => scrollToBooking(key)} className="btn-primary btn-compact w-full sm:w-auto justify-center">{t('pricing.book')}<span className="arrow">→</span></button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="section bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 fade-in">
              <div className="relative aspect-[3/4] image-hover overflow-hidden rounded-sm photo-placeholder">
                <Image src="/images/about.jpg" alt="Adamco Nichita" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="eyebrow mb-6 fade-in">03 — {t('about.title')}</p>
              <h2 className="text-text-primary font-serif mb-6 fade-in fade-in-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.0' }}>{t('about.name')}</h2>
              <p className="text-text-secondary mb-8 md:mb-10 fade-in fade-in-2 text-lg">{t('about.profession')}</p>
              <div className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                <p className="fade-in fade-in-2">{t('about.text1')}</p>
                <p className="fade-in fade-in-3">{t('about.text2')}</p>
                <p className="fade-in fade-in-4">{t('about.text3')}</p>
                <p className="fade-in fade-in-5">{t('about.text4')}</p>
              </div>
              <div className="mt-10 md:mt-12 fade-in fade-in-5">
                <button onClick={() => scrollToBooking()} className="btn-secondary"><span>{t('about.contact')}</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section bg-primary-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12 md:mb-24">
            <p className="eyebrow mb-4 fade-in">04 — {t('services.title')}</p>
            <h2 className="text-text-primary font-serif max-w-3xl fade-in fade-in-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.0' }}>{t('services.subtitle')}</h2>
          </div>
          <div className="border-t border-line">
            {serviceKeys.map((key, index) => (
              <div key={key} onClick={() => scrollToBooking(key)} className="service-row group border-b border-line py-6 md:py-10 cursor-pointer fade-in" style={{ animationDelay: `${0.08 * (index + 1)}s` }}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1"><span className="eyebrow text-text-muted">0{index + 1}</span></div>
                  <div className="col-span-11 md:col-span-5">
                    <h3 className="text-text-primary font-serif group-hover:text-accent transition-colors" style={{ fontSize: 'clamp(24px, 3vw, 44px)', lineHeight: '1.1' }}>{t(`services.items.${key}.title`)}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-5 md:col-start-7 mt-2 md:mt-0">
                    <p className="text-text-primary/80 text-sm md:text-base leading-relaxed max-w-lg">{t(`services.items.${key}.description`)}</p>
                  </div>
                  <div className="col-span-12 md:col-span-1 md:col-start-12 flex md:justify-end mt-4 md:mt-0">
                    <span className="text-accent text-xl group-hover:translate-x-2 transition-transform inline-block">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow mb-8 fade-in">05 — {t('contact.title')}</p>
            <h2 className="text-text-primary font-serif mb-12 leading-tight fade-in fade-in-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.05' }}>
              {t('contact.headline')}<br /><span className="text-text-secondary">{t('contact.headline2')}</span>
            </h2>
            <p className="text-text-secondary mb-12 fade-in fade-in-2 max-w-2xl mx-auto">{t('contact.description')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
              <a href={`https://t.me/${CONTACTS.telegram}`} target="_blank" rel="noopener noreferrer" className="contact-card flex items-center gap-4 p-6 border border-line rounded-sm hover:border-accent/50 transition-all group fade-in fade-in-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </div>
                <div className="text-left"><p className="text-text-muted text-xs uppercase tracking-wider mb-1">Telegram</p><p className="text-text-primary text-lg font-medium">@{CONTACTS.telegram}</p></div>
              </a>
              <a href={`tel:${CONTACTS.phone}`} className="contact-card flex items-center gap-4 p-6 border border-line rounded-sm hover:border-accent/50 transition-all group fade-in fade-in-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div className="text-left"><p className="text-text-muted text-xs uppercase tracking-wider mb-1">{t('contact.phone')}</p><p className="text-text-primary text-lg font-medium">{CONTACTS.phoneDisplay}</p></div>
              </a>
              <a href={`https://www.instagram.com/${CONTACTS.instagram}/`} target="_blank" rel="noopener noreferrer" className="contact-card flex items-center gap-4 p-6 border border-line rounded-sm hover:border-accent/50 transition-all group fade-in fade-in-5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="text-left"><p className="text-text-muted text-xs uppercase tracking-wider mb-1">Instagram</p><p className="text-text-primary text-lg font-medium">@{CONTACTS.instagram}</p></div>
              </a>
              <a href={`mailto:${CONTACTS.email}`} className="contact-card flex items-center gap-4 p-6 border border-line rounded-sm hover:border-accent/50 transition-all group fade-in fade-in-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="text-left"><p className="text-text-muted text-xs uppercase tracking-wider mb-1">{t('contact.email')}</p><p className="text-text-primary text-lg font-medium">{CONTACTS.email}</p></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="section bg-primary-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <p className="eyebrow mb-4 fade-in text-center">06 — {t('contact.booking_title') || 'Записаться'}</p>
            <h2 className="text-text-primary font-serif mb-12 text-center fade-in fade-in-1" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.05' }}>{t('contact.booking_title') || 'Записаться на съёмку'}</h2>

            {formSent ? (
              <div className="text-center p-12 border border-accent/40 rounded-sm fade-in bg-primary">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <p className="text-text-primary text-xl font-medium">Заявка отправлена! Я свяжусь с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6 fade-in fade-in-2 bg-primary p-6 md:p-10 rounded-sm border border-line">
                {selectedService && (
                  <div className="p-6 border border-accent/30 rounded-sm bg-accent/5 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="eyebrow text-accent mb-1">Выбранная услуга</p>
                        <p className="text-text-primary text-xl font-serif">{t(`services.items.${selectedService}.title`)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>{SERVICE_PRICES[selectedService]}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="eyebrow block mb-3">Ваше имя *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors" placeholder="Иван Иванов" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="eyebrow block mb-3">Телефон *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors" placeholder="+373 ..." />
                  </div>
                  <div>
                    <label className="eyebrow block mb-3">Ваш Telegram</label>
                    <input type="text" value={formData.clientTelegram} onChange={(e) => setFormData({ ...formData, clientTelegram: e.target.value })} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors" placeholder="@username" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="eyebrow block mb-3">Желаемая дата</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors" />
                  </div>
                  {!selectedService && (
                    <div>
                      <label className="eyebrow block mb-3">Тип съёмки</label>
                      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors appearance-none">
                        <option value="">— Выберите услугу —</option>
                        {serviceKeys.map((key) => (
                          <option key={key} value={key}>{t(`services.items.${key}.title`)} — {SERVICE_PRICES[key]}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="eyebrow block mb-3">Комментарий</label>
                  <textarea value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} rows={4} className="w-full bg-primary-light border border-line rounded-sm px-4 py-4 text-text-primary focus:border-accent focus:outline-none transition-colors resize-none" placeholder="Дополнительная информация..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  <span className="arrow">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-12 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <button onClick={() => scrollToBooking()} className="camera-icon group flex items-center gap-3 transition-all duration-300 hover:scale-105" aria-label="Записаться">
              <svg className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-text-muted text-xs uppercase tracking-wider group-hover:text-accent transition-colors duration-300">Записаться</span>
            </button>

            <div className="text-center">
              <p className="text-text-secondary text-sm mb-2 font-serif italic">Сохраняю моменты</p>
              <p className="text-text-muted text-xs">Бельцы, Молдова</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href={`tel:${CONTACTS.phone}`} className="text-text-secondary hover:text-accent transition-colors text-sm">{CONTACTS.phoneDisplay}</a>
              <a href={`mailto:${CONTACTS.email}`} className="text-text-secondary hover:text-accent transition-colors text-sm">{CONTACTS.email}</a>
              <a href={`https://www.instagram.com/${CONTACTS.instagram}/`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors text-sm">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}