import { getPortfolioData } from "@/lib/content";

export function SiteFooter() {
  const { frontmatter } = getPortfolioData();

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <p>{frontmatter.name}</p>
        <div className="footer-links">
          <a href={frontmatter.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={frontmatter.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${frontmatter.email}`}>Email</a>
          <a href="/#home">Top</a>
        </div>
      </div>
    </footer>
  );
}
