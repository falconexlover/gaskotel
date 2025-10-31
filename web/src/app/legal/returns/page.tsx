import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Возврат",
};

export default function ReturnsPage() {
  return (
    <section className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>Возврат</h1>
      <p>
        Здесь размещается информация об условиях возврата товара. Содержимое будет
        дополнено.
      </p>
    </section>
  );
}


