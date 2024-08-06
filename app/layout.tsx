import type { Metadata } from "next";
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
  // viewport: "width=device-width, initial-scale=1", // TODO https://nextjs.org/docs/app/api-reference/functions/generate-viewport
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
  // manifest: "", // TODO https://developer.mozilla.org/en-US/docs/Web/Manifest
  category: "Personal Website",
  // referrer: 'origin-when-cross-origin', // TODO
  // twitter: { // TODO https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup
  //   card: 'summary_large_image',
  //   title: 'Next.js',
  //   description: 'The React Framework for the Web',
  //   siteId: '1467726470533754880',
  //   creator: '@nextjs',
  //   creatorId: '1467726470533754880',
  //   images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  // },
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
