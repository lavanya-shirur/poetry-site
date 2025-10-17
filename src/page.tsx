import Link from "next/link";

const sections = [
  { title: "ಕವಿತೆಗಳು", desc: "ಛಂದಸ್ಸು, ಭಾವ, ಚಿತ್ರಣ.", href: "/poems" },
  { title: "ಚಿಕ್ಕ ಕಥೆಗಳು", desc: "ಸಣ್ಣ ಲೋಕಗಳು, ದೊಡ್ಡ ಭಾವನೆಗಳು.", href: "/stories" },
  { title: "ಲೇಖನಗಳು", desc: "ಚಿಂತನೆ, ವಿಮರ್ಶೆ, ಅನುಭವ ನೋಟಗಳು.", href: "/articles" },
];

export default function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {sections.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <h2 className="mb-2 text-lg font-semibold">{s.title}</h2>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">{s.desc}</p>
          <span className="inline-block text-sm font-medium text-blue-600 group-hover:underline dark:text-blue-400">
            ಮುಂದೆ ನೋಡಿ →
          </span>
        </Link>
      ))}
    </section>
  );
}

