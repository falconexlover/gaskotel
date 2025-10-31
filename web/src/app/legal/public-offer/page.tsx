import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публичная оферта",
};

export default function PublicOfferPage() {
  return (
    <section className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>Публичная оферта</h1>
      <p>
        Здесь размещается текст публичной оферты. Содержимое будет дополнено.
      </p>
    </section>
  );
}


