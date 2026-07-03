import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAIZEN — Discipline in Form",
  description: "Premium streetwear rooted in the Shinobi path. Mastery is a daily process.",
  keywords: ["kaizen", "streetwear", "premium", "shinobi", "naruto", "minimal"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
