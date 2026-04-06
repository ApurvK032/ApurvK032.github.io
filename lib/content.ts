import fs from "fs";
import path from "path";

export type PortfolioFrontmatter = {
  name: string;
  headline: string;
  phone: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  resumeFile: string;
  resumeStatus: string;
  ogImage: string;
};

export type PortfolioSection = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
};

export type PortfolioData = {
  frontmatter: PortfolioFrontmatter;
  sections: PortfolioSection[];
};

const detailsPath = path.join(process.cwd(), "content", "details.md");

const defaults: PortfolioFrontmatter = {
  name: "Your Name",
  headline: "Aspiring AI Engineer building modern portfolio projects",
  phone: "+1-000-000-0000",
  email: "your.email@example.com",
  location: "Your City, Country",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  website: "https://your-domain.com",
  siteTitle: "Your Name | Portfolio",
  siteDescription:
    "Personal portfolio showcasing projects, skills, resume, and contact information.",
  siteUrl: "https://your-domain.com",
  resumeFile: "/resume/your-resume.pdf",
  resumeStatus: "Add your PDF to public/resume and update resumeFile when ready.",
  ogImage: "/og-image.svg"
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFrontmatter(frontmatterText: string): PortfolioFrontmatter {
  const entries = frontmatterText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        return null;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      return [key, value] as const;
    })
    .filter((entry): entry is readonly [string, string] => entry !== null);

  const parsed = Object.fromEntries(entries);

  return {
    ...defaults,
    ...parsed
  };
}

function parseSections(markdownBody: string): PortfolioSection[] {
  const blocks = markdownBody.split(/^##\s+/m).filter(Boolean);

  return blocks.map((block) => {
    const [rawTitle, ...rest] = block.split("\n");
    const title = rawTitle.trim();
    const body = rest.join("\n").trim();
    const bullets = body
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim());

    return {
      id: slugify(title),
      title,
      body,
      bullets
    };
  });
}

export function getPortfolioData(): PortfolioData {
  const file = fs.readFileSync(detailsPath, "utf8");
  const match = file.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return {
      frontmatter: defaults,
      sections: parseSections(file)
    };
  }

  const [, frontmatterText, markdownBody] = match;

  return {
    frontmatter: parseFrontmatter(frontmatterText),
    sections: parseSections(markdownBody)
  };
}

export function getSection(data: PortfolioData, title: string) {
  return data.sections.find(
    (section) => section.title.toLowerCase() === title.toLowerCase()
  );
}
