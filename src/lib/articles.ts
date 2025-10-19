
// src/lib/articles.ts


import { list, put } from "@vercel/blob";

export type ArticleMeta = {
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  createdAt: string;
};

export type ArticleDoc = ArticleMeta & { content: string };

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0C80-\u0CFF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN; // <-- read env
const PREFIX = "articles/";

export async function saveArticle(doc: ArticleDoc) {
  if (!TOKEN) throw new Error("Missing BLOB_READ_WRITE_TOKEN");
  const key = `${PREFIX}${doc.slug}.json`;
  await put(key, JSON.stringify(doc, null, 2), {
    access: "public",
    token: TOKEN, // <-- pass token
  });
  return key;
}

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  // articles are public JSON on Blob; fetch by URL
  const key = `${PREFIX}${slug}.json`;
  try {
    const res = await fetch(`https://blob.vercel-storage.com/${key}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as ArticleDoc;
  } catch {
    return null;
  }
}

export async function listArticles(): Promise<ArticleMeta[]> {
  if (!TOKEN) return []; // graceful fallback so the page doesn’t crash
  const result = await list({ prefix: PREFIX, token: TOKEN }); // <-- pass token
  const metas: ArticleMeta[] = [];

  await Promise.all(
    result.blobs
      .filter((b) => b.pathname.endsWith(".json"))
      .map(async (b) => {
        const r = await fetch(b.url, { cache: "no-store" });
        if (!r.ok) return;
        const doc = (await r.json()) as ArticleDoc;
        metas.push({
          title: doc.title,
          slug: doc.slug,
          excerpt: doc.excerpt,
          coverUrl: doc.coverUrl,
          createdAt: doc.createdAt,
        });
      })
  );

  metas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return metas;
}

