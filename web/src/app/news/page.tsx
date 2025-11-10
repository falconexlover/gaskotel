import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Новости и акции",
  description: `Актуальные новости, акции и обновления от ${site.name}. Следите за специальными предложениями и новинками продукции.`,
  openGraph: {
    title: "Новости и акции",
    description: `Актуальные новости, акции и обновления от ${site.name}`,
    type: "website",
    url: `${site.url}/news`,
  },
};

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
    take: 50,
  });

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Новости и акции</h1>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
          Следите за актуальными новостями, акциями и обновлениями продукции
        </p>
      </div>
      {news.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/60">
          <p className="text-zinc-700 dark:text-zinc-400">Новости пока не добавлены.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="block rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                {n.coverImage && (
                  <img src={n.coverImage} alt="" className="h-16 w-28 rounded-lg border border-[var(--border-soft)] object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {new Date(n.date).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="mt-1 font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2">{n.title}</div>
                  {n.excerpt && (
                    <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: n.excerpt }} />
                  )}
                  {n.isPromo && (
                    <span className="mt-2 inline-block rounded-full bg-[var(--primary-100)] px-2 py-0.5 text-xs text-[var(--primary-700)] dark:bg-[var(--primary-900)] dark:text-[var(--primary-300)]">
                      Акция
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
