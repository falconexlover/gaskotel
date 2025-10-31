import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
};

export default function PersonalDataConsentPage() {
  return (
    <section className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>Согласие на обработку персональных данных</h1>
      <p>
        Здесь будет опубликован текст согласия на обработку персональных данных
        посетителей сайта. Содержимое будет дополнено.
      </p>
    </section>
  );
}


