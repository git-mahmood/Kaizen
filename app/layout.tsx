import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAIZEN — Wear The Future",
  description: "Cyberpunk anime-inspired streetwear from Bangladesh. Limited drops. No rules.",
  keywords: ["streetwear", "bangladesh", "anime", "cyberpunk", "kaizen"],
  openGraph: {
    title: "KAIZEN — Wear The Future",
    description: "Cyberpunk anime-inspired streetwear. Limited drops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
