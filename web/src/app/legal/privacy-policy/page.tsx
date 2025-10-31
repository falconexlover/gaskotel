import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>Политика конфиденциальности</h1>
      <p>
        Здесь размещается текст политики конфиденциальности. Содержимое будет
        дополнено.
      </p>
    </section>
  );
}


