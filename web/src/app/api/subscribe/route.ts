import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body?.email || "").trim();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }

    // Здесь можно интегрировать внешний сервис рассылок, используя ключи из process.env
    // Например, Mailchimp/Resend. Пока возвращаем 202 как принятие запроса.

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (e) {
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}


