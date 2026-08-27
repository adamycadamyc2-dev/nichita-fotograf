import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, clientTelegram, service, price, date, comment } = body;

    const BOT_TOKEN = '8649655072:AAHnbWNTl3oBvIk6HtLXIjHz-hSFQsU8alw';
    const CHAT_ID = '8595839079';

    // Простой текст без Markdown (чтобы не ломалось)
    const message = `📸 НОВАЯ ЗАЯВКА

👤 Имя: ${name}
 Телефон: ${phone}
✈️ Telegram: ${clientTelegram || 'Не указан'}
 Услуга: ${service}
💰 Цена: ${price}
📅 Дата: ${date || 'Не указана'}
📝 Комментарий: ${comment || 'Нет'}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: parseInt(CHAT_ID),
        text: message
      })
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram Error:', telegramData);
      return NextResponse.json(
        { success: false, error: telegramData.description },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}