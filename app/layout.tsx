import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "../components/Providers";
import { asset } from "../asset";

export const metadata: Metadata = {
  title: "Nagham Alhoubani — Data Scientist & AI Engineer",
  description:
    "Nagham Alhoubani — Data Scientist & AI Engineer building evidence-based AI for women's health and social impact. Three-time national competition winner, 9XAI Fellow, Amman, Jordan.",
  icons: { icon: asset("/favicon.svg") },
};

export const viewport: Viewport = {
  themeColor: "#C7295E",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Silkscreen:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
