import { getArticle } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const doc = await getArticle(params.slug);

  if (!doc) {
    return (
      <section className="mx-auto max-w-3xl rounded-xl border bg-white/90 p-6">
        <h1 className="text-xl font-semibold">Article not found</h1>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="rounded-2xl border border-white/50 bg-white/90 p-6 backdrop-blur-sm">
        <h1 className="text-2xl font-semibold">{doc.title}</h1>
        <p className="mt-1 text-xs text-neutral-500">
          {new Date(doc.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
        </p>
        {doc.coverUrl && (
          <div className="mt-4 overflow-hidden rounded-xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doc.coverUrl} alt="" className="w-full object-cover" />
          </div>
        )}
        {doc.excerpt && <p className="mt-3 text-neutral-700">{doc.excerpt}</p>}
      </header>

      <div className="prose max-w-none rounded-2xl border border-white/50 bg-white/90 p-6 prose-p:leading-7">
        <ReactMarkdown>{doc.content}</ReactMarkdown>
      </div>
    </article>
  );
}

