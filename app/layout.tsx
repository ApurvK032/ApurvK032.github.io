import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/lib/content";
import type { ReactNode } from "react";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono"
});

export function generateMetadata(): Metadata {
  const { frontmatter } = getPortfolioData();

  return {
    metadataBase: new URL(frontmatter.siteUrl),
    title: frontmatter.siteTitle,
    description: frontmatter.siteDescription,
    openGraph: {
      title: frontmatter.siteTitle,
      description: frontmatter.siteDescription,
      url: frontmatter.siteUrl,
      siteName: frontmatter.siteTitle,
      images: [
        {
          url: frontmatter.ogImage,
          width: 1200,
          height: 630,
          alt: "Portfolio Open Graph placeholder"
        }
      ]
    },
    icons: {
      icon: "/favicon.svg"
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const { frontmatter } = getPortfolioData();

  return (
    <html lang="en">
      <body className={`${interTight.variable} ${jetBrainsMono.variable}`}>
        <div className="page-wrap">
          <SiteHeader frontmatter={frontmatter} />
          <main className="page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
