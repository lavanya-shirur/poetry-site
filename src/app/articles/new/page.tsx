"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    setSaving(true);
    const res = await fetch("/api/articles/create", {
      method: "POST",
      body: JSON.stringify({ title, excerpt, coverUrl, content }),
      headers: { "Content-Type": "application/json" },
    });
    setSaving(false);
    const data = await res.json();
    if (res.ok) router.push(`/articles/${data.slug}`);
    else alert(data.error || "Failed to save");
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">ಹೊಸ ಲೇಖನ (New Article)</h1>

      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/50 bg-white/90 p-6 backdrop-blur-sm">
        <div>
          <label className="block text-sm font-medium">ಶೀರ್ಷಿಕೆ (Title)</label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ಉದಾ: ಕವಿತೆ ಉಸಿರಾಡುವುದು ಹೇಗೆ?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ (Excerpt)</label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="2–3 ಸಾಲುಗಳ ಪರಿಚಯ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">ಕವರ್ ಇಮೇಜ್ URL (optional)</label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="Paste an image URL or upload elsewhere and paste URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">ವಿಷಯ (Markdown)</label>
          <textarea
            className="mt-1 h-64 w-full resize-y rounded border p-3 font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`# ಶೀರ್ಷಿಕೆ\n\nಇಲ್ಲಿ ನಿಮ್ಮ ಲೇಖನವನ್ನು Markdown‌ನಲ್ಲಿ ಬರೆಯಿರಿ...`}
          />
          <p className="mt-1 text-xs text-neutral-500">Supports **bold**, _italics_, headings, lists, images, etc.</p>
        </div>

        <button
          disabled={saving}
          className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Publish"}
        </button>
      </form>
    </section>
  );
}

