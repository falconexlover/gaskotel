import { NextRequest } from "next/server";

const ALLOWED = new Set(["contact", "service_request", "review"]);

export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
  const type = params.type;
  if (!ALLOWED.has(type)) {
    return new Response("Not allowed", { status: 400 });
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
  // Простейшая валидация поля phone для contact/service_request
  if ((type === "contact" || type === "service_request") && payload.phone) {
    const ok = /\+?\d[\d\s\-\(\)]{8,}/.test(String(payload.phone));
    if (!ok) return new Response("Invalid phone", { status: 400 });
  }
  console.log("form:", type, payload);
  return Response.json({ ok: true });
}


