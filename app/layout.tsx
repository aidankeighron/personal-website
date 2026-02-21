import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JetBrains_Mono } from 'next/font/google';

const jetBrains = JetBrains_Mono({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Aidan Keighron",
  description: "Personal Website",
};

export const viewport: Viewport = {
  themeColor: "#8E0092",
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains.className} bg-main dark:bg-d-main text-d-main dark:text-main`}>
        {children}
      </body>
    </html>
  );
}
