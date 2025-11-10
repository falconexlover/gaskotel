import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Сохраняем в БД через форму
    await prisma.formSubmission.create({
      data: {
        type: "subscribe",
        email,
        data: JSON.stringify({ email }),
      },
    });

    // Здесь можно интегрировать внешний сервис рассылок, используя ключи из process.env
    // Например, Mailchimp/Resend.

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (e) {
    console.error("Subscribe error:", e);
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}


