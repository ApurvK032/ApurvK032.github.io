import type { PortfolioFrontmatter } from "@/lib/content";

export function SiteHeader({
  frontmatter
}: {
  frontmatter: PortfolioFrontmatter;
}) {
  return (
    <header className="top">
      <div className="wrap">
        <div className="top-row">
          <a className="mark" href="/#home">
            {frontmatter.name}
          </a>
          <span className="location">
            <span className="dot" />
            {frontmatter.location}
          </span>
        </div>
      </div>
    </header>
  );
}
