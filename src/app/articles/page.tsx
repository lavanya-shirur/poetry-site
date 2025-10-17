// src/app/articles/page.tsx
import { listArticles } from "@/lib/articles";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  const items = hasToken ? await listArticles() : [];

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ಲೇಖನಗಳು (Articles)</h1>
        <Link href="/articles/new" className="rounded-lg bg-rose-700 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
          New
        </Link>
      </div>

      {!hasToken && (
        <div className="rounded-xl border bg-white/90 p-5 text-sm text-neutral-700">
          <p className="font-medium">Missing <code>BLOB_READ_WRITE_TOKEN</code>.</p>
          <p className="mt-1">Create a Read-Write Blob token in Vercel → Storage → Blob → Settings → Access Tokens, then add it to <code>.env.local</code>:</p>
          <pre className="mt-2 overflow-x-auto rounded bg-neutral-100 p-2 text-xs">BLOB_READ_WRITE_TOKEN=YOUR_TOKEN_HERE</pre>
          <p className="mt-2">Restart: <code>npm run dev</code></p>
        </div>
      )}

      <ul className="space-y-4">
        {items.map((a) => (
          <li key={a.slug} className="rounded-xl border border-white/50 bg-white/90 p-5 backdrop-blur-sm">
            <Link href={`/articles/${a.slug}`} className="text-lg font-semibold hover:underline">
              {a.title}
            </Link>
            {a.excerpt && <p className="mt-1 text-sm text-neutral-700">{a.excerpt}</p>}
            <p className="mt-2 text-xs text-neutral-500">
              {new Date(a.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </li>
        ))}
        {hasToken && items.length === 0 && (
          <li className="rounded-xl border bg-white/80 p-5">No articles yet. Click “New”.</li>
        )}
      </ul>
    </section>
  );
}

