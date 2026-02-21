import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { JetBrains_Mono } from 'next/font/google';
import Footer from "./components/Footer";

// https://nikolasbarwicki.com/articles/seo-in-next-js-13-with-metadata-api
export const metadata: Metadata = {
  title: {
    template: '%s | Aidan Keighron',
    default: "Aidan Keighron",
  },
  description: "My personal website and portfolio",
  openGraph: {
    type: "website",
    title: "Aidan Keighron personal website", 
    description: "My personal website and portfolio", 
    siteName: "Aidan Keighron",
    locale: 'en_US',
  },
  authors: {
    name: "Aidan Keighron"
  },
  generator: "Next.js",
  keywords: "portfolio, personal website, aidan keighron, blog",
  creator: "Aidan Keighron",
  publisher: "Vercel",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/light-icon.png',
        href: '/images/light-icon.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/dark-icon.png',
        href: '/images/dark-icon.png',
      },
    ],
  },
  category: "Personal Website",
  referrer: 'origin-when-cross-origin',
};

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8E0092' },
    { media: '(prefers-color-scheme: dark)', color: '#50DFB3' },
  ],
  colorScheme: "dark light",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
}

const jetBrains = JetBrains_Mono({subsets: ['latin']});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={`text-main bg-d-main ${jetBrains.className}`}>
      <SpeedInsights/>
      <Analytics />
      <body className="bg-main dark:bg-d-main text-d-main dark:text-main" suppressHydrationWarning={true}>{children}</body>
      <Footer />
    </html>
  );
}
