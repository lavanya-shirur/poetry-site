import { NextRequest, NextResponse } from "next/server";
import { saveArticle, slugify } from "@/lib/articles";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { title, excerpt, coverUrl, content } = (await req.json()) as {
    title: string; excerpt?: string; coverUrl?: string; content: string;
  };

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const slug = slugify(title);
  const doc = {
    title,
    slug,
    excerpt: excerpt?.trim() || "",
    coverUrl: coverUrl?.trim() || "",
    content,
    createdAt: new Date().toISOString(),
  };

  await saveArticle(doc);
  return NextResponse.json({ ok: true, slug });
}

