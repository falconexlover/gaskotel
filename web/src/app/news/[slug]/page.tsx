import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { site } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const n = await prisma.news.findUnique({ where: { slug } });
  if (!n) return { title: "Новость" };
  return {
    title: n.title,
    description: `${n.title} — новости ${site.name}`,
    openGraph: {
      title: n.title,
      url: `${site.url}/news/${n.slug}`,
      type: "article",
    },
  };
}

export default async function NewsItemPage({ params }: PageProps) {
  const { slug } = await params;
  const n = await prisma.news.findUnique({ where: { slug } });
  if (!n) return notFound();

  return (
    <article className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{n.title}</h1>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {new Date(n.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
          {n.isPromo && (
            <span className="ml-2 inline-block rounded-full bg-[var(--accent-100)] px-2 py-0.5 text-xs text-[var(--accent-700)]">Акция</span>
          )}
        </div>
      </div>
      {n.coverImage && (
        <img src={n.coverImage} alt="" className="w-full rounded-xl border border-[var(--border-soft)] bg-white" />
      )}
      {n.content ? (
        <div
          className="prose prose-zinc max-w-none rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
          dangerouslySetInnerHTML={{ __html: n.content }}
        />
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
          <p>Подробный текст новости пока не найден.</p>
          {n.sourceUrl && (
            <p className="mt-2"><a href={n.sourceUrl} className="underline" target="_blank" rel="noopener noreferrer">Открыть источник</a></p>
          )}
        </div>
      )}
      <div className="pt-2">
        <Link href="/news" className="text-sm underline">← Ко всем новостям</Link>
      </div>
    </article>
  );
}


