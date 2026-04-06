"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PortfolioFrontmatter } from "@/lib/content";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

function getCurrentHash() {
  if (typeof window === "undefined") {
    return "#home";
  }

  return window.location.hash || "#home";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="theme-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2" />
      <path d="M12 19.3v2.2" />
      <path d="M4.9 4.9l1.6 1.6" />
      <path d="M17.5 17.5l1.6 1.6" />
      <path d="M2.5 12h2.2" />
      <path d="M19.3 12h2.2" />
      <path d="M4.9 19.1l1.6-1.6" />
      <path d="M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="theme-icon"
      fill="currentColor"
    >
      <path d="M14.6 2.4c-4.6.7-8.1 4.7-8.1 9.5 0 5.3 4.3 9.6 9.6 9.6 3.2 0 6.1-1.6 7.9-4.2.3-.4 0-1-.5-.9-4.7.4-8.8-3.4-8.8-8.1 0-1.8.6-3.5 1.7-4.9.3-.4-.1-1-.7-1z" />
    </svg>
  );
}

export function SiteHeader({
  frontmatter
}: {
  frontmatter: PortfolioFrontmatter;
}) {
  const [activeHash, setActiveHash] = useState("#home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(preferredTheme);
    setMounted(true);
    applyTheme(preferredTheme);

    const updateHash = () => {
      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter((element): element is HTMLElement => element instanceof HTMLElement);

      const offset = 140;
      const current =
        sections.findLast((section) => section.offsetTop - offset <= window.scrollY) ??
        sections[0];

      setActiveHash(current ? `#${current.id}` : getCurrentHash());
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("scroll", updateHash, { passive: true });

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("scroll", updateHash);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header className="site-header">
      <div className="container shell-bar">
        <Link className="brand" href="/#home">
          <span className="brand-mark">{frontmatter.name.charAt(0)}</span>
          <span>{frontmatter.name}</span>
        </Link>
        <div className="header-actions">
          <nav className="nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${item.href}`}
                className={activeHash === item.href ? "nav-link is-active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? theme === "dark" ? <SunIcon /> : <MoonIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
