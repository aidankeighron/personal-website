import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { JetBrains_Mono } from 'next/font/google';

export const metadata: Metadata = {
  title: "Aidan Keighron",
  description: "Personal Website",
};

// TODO set website icon
// TODO? https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
const jetBrains = JetBrains_Mono({subsets: ['latin']});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={`dark text-main bg-d-main ${jetBrains.className}`}>
      <SpeedInsights/>
      <Analytics />
      <body className="bg-main dark:bg-d-main" suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
