import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Kannada } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const kannada = Noto_Sans_Kannada({
  subsets: ["kannada", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ಕಾವ್ಯದ ಕೋಣೆ | Poetry Corner",
  description: "ಕವಿತೆಗಳು, ಚಿಕ್ಕ ಕಥೆಗಳು, ಲೇಖನಗಳು — Kannada-first poetry site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kn">
	<body
  		className={`${kannada.className} min-h-screen text-neutral-900 antialiased`}
  		style={{
    /* soft green nature background image with a light gradient wash */
    		backgroundImage:
      		'linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop")',
    		backgroundSize: "cover",
    		backgroundPosition: "center",
    		backgroundAttachment: "fixed",
  		}}
		>
  		{/* slightly translucent sheet for legibility; tweak to 80–90 to taste */}
  	<div className="min-h-screen bg-white/80">
    		<div className="mx-auto max-w-6xl px-4">
      			<Header />
      			<main className="py-10">{children}</main>
      			<Footer />
    		</div>
  	</div>
</body>

    </html>
  );
}

