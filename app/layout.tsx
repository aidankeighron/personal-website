import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Aidan Keighron",
  description: "Personal Website",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="dark text-main bg-d-main">
      <SpeedInsights/>
      <Analytics />
      <body className="bg-main dark:bg-d-main">{children}</body>
    </html>
  );
}
