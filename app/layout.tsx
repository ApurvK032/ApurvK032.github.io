import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
          alt: "Apurv Kushwaha robotics and product-development portfolio"
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
        <Script id="scroll-reveal" strategy="afterInteractive">
          {`
            (() => {
              const setupReveal = () => {
                const elements = Array.from(document.querySelectorAll('.reveal'));

                if (!elements.length) {
                  return;
                }

                const revealAll = () => {
                  elements.forEach((element) => element.classList.add('is-visible'));
                };

                if (
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                  !('IntersectionObserver' in window)
                ) {
                  revealAll();
                  return;
                }

                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  {
                    threshold: 0.12,
                    rootMargin: '0px 0px -40px 0px'
                  }
                );

                elements.forEach((element, index) => {
                  const delay = element.style.getPropertyValue('--reveal-delay');

                  if (!delay) {
                    element.style.setProperty(
                      '--reveal-delay',
                      Math.min(index * 30, 180) + 'ms'
                    );
                  }

                  observer.observe(element);
                });

                // Keep the content readable if a browser delays observer
                // callbacks during anchor jumps, backgrounding, or capture.
                window.setTimeout(() => {
                  revealAll();
                  observer.disconnect();
                }, 1800);
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupReveal, { once: true });
              } else {
                setupReveal();
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
