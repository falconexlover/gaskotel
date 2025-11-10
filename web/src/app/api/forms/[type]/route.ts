import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  contactFormSchema,
  leadFormSchema,
  subscribeFormSchema,
  serviceRequestFormSchema,
  reviewFormSchema,
} from "@/lib/validations";

const ALLOWED = new Set(["contact", "service_request", "review", "lead", "subscribe"]);

const schemaMap: Record<string, any> = {
  contact: contactFormSchema,
  lead: leadFormSchema,
  subscribe: subscribeFormSchema,
  service_request: serviceRequestFormSchema,
  review: reviewFormSchema,
};

export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
  const type = params.type;
  if (!ALLOWED.has(type)) {
    return Response.json({ error: "Тип формы не разрешен" }, { status: 400 });
  }

  const contentType = req.headers.get("content-type") || "";
  let payload: any = {};
  if (contentType.includes("application/json")) {
    payload = await req.json();
  } else if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    payload = Object.fromEntries(form as any);
  } else {
    const text = await req.text();
    try { payload = JSON.parse(text); } catch { payload = { raw: text }; }
  }

  // Валидация с помощью Zod
  const schema = schemaMap[type];
  if (schema) {
    const result = schema.safeParse(payload);
    if (!result.success) {
      return Response.json(
        { error: "Ошибка валидации", details: result.error.errors },
        { status: 400 }
      );
    }
    payload = result.data;
  }

  try {
    // Сохраняем в БД
    await prisma.formSubmission.create({
      data: {
        type,
        name: payload.name || null,
        email: payload.email || null,
        phone: payload.phone || null,
        message: payload.message || null,
        data: JSON.stringify(payload),
      },
    });

    return Response.json({ ok: true, message: "Заявка успешно отправлена" });
  } catch (error: any) {
    console.error("Form submission error:", error);
    return Response.json({ error: "Ошибка при сохранении заявки" }, { status: 500 });
  }
}


