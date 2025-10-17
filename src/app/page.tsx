import Link from "next/link";

const sections = [
  { title: "Poems", desc: "Verse, imagery, rhythm.", href: "/poems" },
  { title: "Short Stories", desc: "Tiny worlds, big feelings.", href: "/stories" },
  { title: "Articles", desc: "Reflections, notes, essays.", href: "/articles" },
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {sections.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="block rounded-2xl border border-neutral-300/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-semibold text-neutral-900">{s.title}</h2>
          <p className="mb-4 text-sm text-neutral-700">{s.desc}</p>
          <span className="inline-block text-sm font-medium text-blue-600 hover:underline">
            Explore →
          </span>
        </Link>
      ))}
    </section>
  );
}

