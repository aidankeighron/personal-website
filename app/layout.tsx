import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { JetBrains_Mono } from 'next/font/google';

// https://nikolasbarwicki.com/articles/seo-in-next-js-13-with-metadata-api
export const metadata: Metadata = {
  title: {
    template: '%s | Aidan Keighron',
    default: "Aidan Keighron",
  },
  description: "My personal website and portfolio",
  // metadataBase: "", // TODO root url
  openGraph: {
    type: "website", 
    // url: "", // TODO root url
    title: "Aidan Keighron personal website", 
    description: "My personal website and portfolio", 
    siteName: "Aidan Keighron",
    // images: [
    //   {
    //     url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ], // TODO
    // videos: ,
    locale: 'en_US',
  },
  robots: { 
    index: true, 
    follow: true, 
    noarchive: true, 
    nosnippet: true, 
    noimageindex: true, 
  },
  authors: {
    name: "Aidan Keighron"
  },
  generator: "Next.js",
  keywords: "portfolio, personal website, aidan keighron, blog",
  creator: "Aidan Keighron",
  publisher: "Vercel",
  // verification: "", // TODO look it up
  // icons: { // TODO https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#image-files-ico-jpg-png
  //   icon: '/icon.png',
  //   shortcut: '/shortcut-icon.png',
  //   apple: '/apple-icon.png',
  //   other: {
  //     rel: 'apple-touch-icon-precomposed',
  //     url: '/apple-touch-icon-precomposed.png',
  //   },
  // },
  category: "Personal Website",
  referrer: 'origin-when-cross-origin',
};

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8E0092' },
    { media: '(prefers-color-scheme: dark)', color: '#FF8C00' },
  ],
  colorScheme: "dark light", // TODO do I want this or normal
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
}

// TODO set website icon
// TODO? https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
const jetBrains = JetBrains_Mono({subsets: ['latin']});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={`text-main bg-d-main ${jetBrains.className}`}>
      <SpeedInsights/>
      <Analytics />
      <body className="bg-main dark:bg-d-main text-d-main dark:text-main" suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
