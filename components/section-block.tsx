import { PortfolioSection } from "@/lib/content";
import type { ReactNode } from "react";

type SectionBlockProps = {
  section?: PortfolioSection;
};

function renderInline(text: string): ReactNode[] {
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={`${match[2]}-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      nodes.push(<code key={`${match[4]}-${match.index}`}>{match[4]}</code>);
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderParagraphs(body: string) {
  return body
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => !paragraph.startsWith("- "))
    .map((paragraph) => (
      <p key={paragraph} className="section-copy">
        {renderInline(paragraph)}
      </p>
    ));
}

export function SectionBlock({ section }: SectionBlockProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="card" id={section.id}>
      <h2>{section.title}</h2>
      {renderParagraphs(section.body)}
      {section.bullets.length > 0 ? (
        <ul className="bullet-list">
          {section.bullets.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
