import { getPortfolioData } from "@/lib/content";

export function SiteFooter() {
  const { frontmatter } = getPortfolioData();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">{frontmatter.name}</p>
          <p>
            Robotics engineer focused on perception, embedded systems, and
            intelligent autonomous applications.
          </p>
        </div>
        <div>
          <p className="eyebrow">Quick Contact</p>
          <ul className="link-list">
            <li>
              <a href={`mailto:${frontmatter.email}`}>{frontmatter.email}</a>
            </li>
            <li>{frontmatter.phone}</li>
            <li>
              <a href={frontmatter.github}>GitHub</a>
            </li>
            <li>
              <a href={frontmatter.linkedin}>LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
