import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/lib/content";
import type { ReactNode } from "react";

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
      <body>
        <div className="page-wrap">
          <SiteHeader frontmatter={frontmatter} />
          <main className="container page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
