"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/poems", label: "ಕವಿತೆಗಳು (Poems)" },
  { href: "/stories", label: "ಚಿಕ್ಕ ಕಥೆಗಳು (Stories)" },
  { href: "/articles", label: "ಲೇಖನಗಳು (Articles)" },
  { href: "/about", label: "ನನ್ನ ಬಗ್ಗೆ (About)" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/70 bg-white/70 backdrop-blur-md">
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight text-rose-700">
          ಕಾವ್ಯದ ಕೋಣೆ
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-2 py-1 rounded-lg hover:underline ${
                pathname === l.href ? "bg-white/60" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

