<section id="testimonials" className="section bg-primary-light">
  <div className="container mx-auto px-4">
    <div className="mb-16 md:mb-24">
      <p className="eyebrow mb-4 fade-in">04 — {t('testimonials.title')}</p>
      <h2 className="text-text-primary max-w-3xl fade-in fade-in-1" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.0' }}>
        {t('testimonials.subtitle')}
      </h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[
        {
          name: 'Елена М.',
          text: 'Никита — настоящий профессионал! Фотосессия прошла легко и непринуждённо. Фотографии превзошли все ожидания!',
          rating: 5
        },
        {
          name: 'Александр и Мария',
          text: 'Заказывали love story. Результат просто потрясающий! Каждый кадр наполнен эмоциями и теплотой. Спасибо!',
          rating: 5
        },
        {
          name: 'Анна К.',
          text: 'Очень довольна семейной фотосессией. Никита нашёл подход к детям, все были расслаблены и счастливы.',
          rating: 5
        },
        {
          name: 'Дмитрий В.',
          text: 'Заказывал портретную съёмку для бизнеса. Всё чётко, профессионально, быстро. Рекомендую!',
          rating: 5
        },
        {
          name: 'Светлана и Игорь',
          text: 'Свадебная фотосессия была на высоте! Никита успел запечатлеть все важные моменты. Фотографии — огонь!',
          rating: 5
        },
        {
          name: 'Ольга Р.',
          text: 'Репортаж с дня рождения ребёнка. Никита очень тактичный и незаметный, но при этом поймал все эмоции!',
          rating: 5
        }
      ].map((review, index) => (
        <div key={index} className="testimonial-card border border-line bg-primary p-8 rounded-sm fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
          <div className="flex gap-1 mb-4">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.179 1.688.588 1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-text-secondary text-base leading-relaxed mb-6">{review.text}</p>
          <p className="text-text-primary font-medium">{review.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>