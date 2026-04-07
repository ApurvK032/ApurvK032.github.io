import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getPortfolioData, getSection } from "@/lib/content";
import type { ReactNode } from "react";

type TimelineItem = {
  title: string;
  org: string;
  meta: string;
  location: string;
  summary: string;
  bullets: string[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

type FeaturedProject = {
  title: string;
  date: string;
  summary: string;
  role: string;
  impact: string;
  stack: string[];
  links: { label: string; href: string }[];
};

function SectionHeading({
  id,
  number,
  title
}: {
  id: string;
  number: string;
  title: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <span className="section-number">{number}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index
}: {
  project: FeaturedProject;
  index: number;
}) {
  return (
    <article className="flagship-card">
      <div className="flagship-header">
        <span className="card-label">Featured</span>
        <span className="card-date">{project.date}</span>
      </div>

      <h3>{project.title}</h3>
      <p className="card-copy">{project.summary}</p>

      <div className="project-note-grid">
        <div className="project-note">
          <span>Role</span>
          <strong>{project.role}</strong>
        </div>
        <div className="project-note">
          <span>Impact</span>
          <strong>{project.impact}</strong>
        </div>
      </div>

      <div className="tag-row">
        {project.stack.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>

      <div className="card-links">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <article className="timeline-card">
      <div className="timeline-head">
        <div>
          <p className="timeline-meta">{item.meta}</p>
          <h3>{item.title}</h3>
          <p className="timeline-org">{item.org}</p>
        </div>
        <span className="timeline-location">{item.location}</span>
      </div>

      <p className="card-copy">{item.summary}</p>
      <ul className="detail-list">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <article className="skill-group-card">
      <span className="card-label">{group.title}</span>
      <div className="tag-row">
        {group.items.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ContactLink({
  label,
  href,
  children
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="contact-link"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const data = getPortfolioData();
  const summarySection = getSection(data, "Summary");
  const summaryParagraphs =
    summarySection?.body
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  const aboutParagraphs = [
    ...summaryParagraphs,
    "I work best on engineering problems that need multiple layers to come together: perception, control logic, embedded implementation, mechanical reality, and practical testing."
  ];

  const heroMeta = [
    "M.S. Robotics at UMN",
    "Minneapolis, MN",
    "Perception / autonomy / embedded systems",
    "Prototype-driven engineering"
  ];

  const featuredProjects: FeaturedProject[] = [
    {
      title: "Semantic-Aware Image Retargeting",
      date: "Dec 2025",
      summary:
        "Vision pipeline for resizing images while preserving semantic structure, composition, and salient content.",
      role: "Designed the retargeting workflow and trained the composition-aware classifier.",
      impact:
        "Connects perception, scene understanding, and optimization in a practical CV system.",
      stack: ["PyTorch", "DINOv3", "Depth Anything 3", "OpenCV"],
      links: [
        {
          label: "Code",
          href: "https://github.com/sri299792458/cv5561-f25-team-asa"
        },
        {
          label: "Demo",
          href: "https://drive.google.com/drive/folders/1WYKXR6nWfwPG4erPfYH2VUe5MtFYo3Ao?usp=sharing"
        }
      ]
    },
    {
      title: "Autonomous Car Parking Bot",
      date: "Nov 2025",
      summary:
        "Indoor parking system combining overhead perception, navigation, and towing control in simulation.",
      role: "Built perception, coordinate mapping, navigation flow, and fine-positioning logic.",
      impact:
        "Strong robotics integration example across sensing, planning, and actuation.",
      stack: ["ROS 2", "Gazebo", "Nav2", "OpenCV"],
      links: [
        {
          label: "Code",
          href: "https://github.com/ApurvK032/Autonomous-Car-Parking-Bot"
        }
      ]
    },
    {
      title: "Warehouse Pick-and-Drop Optimization",
      date: "Dec 2025",
      summary:
        "Warehouse routing and task-sequencing system built around search, planning, and constrained optimization.",
      role: "Modeled the workflow and compared route-planning and optimization strategies.",
      impact:
        "Shows the algorithmic planning side of robotics and operational decision systems.",
      stack: ["A*", "Hill Climbing", "Simulated Annealing", "Optimization"],
      links: [
        {
          label: "Code",
          href: "https://github.com/ApurvK032/WarehouseBot-Pick-and-Drop-Optimization"
        }
      ]
    }
  ];

  const experienceItems: TimelineItem[] = [
    {
      title: "Lead Technical Engineer",
      org: "Samaritan AI",
      meta: "Nov 2024 - Jun 2025",
      location: "New Delhi, India",
      summary:
        "Led development of a smart medical device from concept through integrated prototype.",
      bullets: [
        "Owned mechanical design, electronics integration, embedded firmware, and validation across the device stack.",
        "Built CAD parts, used 3D printing for fabrication, assembled subsystems, and integrated sensors into a working prototype.",
        "Developed ESP32 firmware and 24-hour reliability tests that improved signal stability and reduced measurement inconsistency by 87%."
      ]
    },
    {
      title: "Research and Development Engineer",
      org: "Swachh.io",
      meta: "May 2024 - Nov 2024",
      location: "New Delhi, India",
      summary:
        "Worked on environmental monitoring and pollution-control systems through design, testing, and technical coordination.",
      bullets: [
        "Supported end-to-end prototype development spanning mechanical, electronics, and software workstreams.",
        "Coordinated interns across multiple engineering domains while contributing simulation and validation work.",
        "Helped produce technical material that contributed to securing a $50K+ grant."
      ]
    }
  ];

  const educationItems: TimelineItem[] = [
    {
      title: "Master of Science in Robotics",
      org: "University of Minnesota Twin Cities",
      meta: "Aug 2025 - May 2027",
      location: "Minneapolis, MN",
      summary:
        "Graduate work focused on robotics systems, perception, and intelligent autonomy.",
      bullets: [
        "Building depth across computer vision, planning, embodied intelligence, and real-world robotics engineering.",
        "Using graduate research and coursework to strengthen deployment-aware robotics thinking."
      ]
    },
    {
      title: "Bachelor of Technology in Engineering Physics",
      org: "Indian Institute of Technology Guwahati",
      meta: "Jul 2020 - May 2024",
      location: "Guwahati, India",
      summary:
        "Quantitative and systems-focused engineering foundation spanning physics, modeling, and applied problem solving.",
      bullets: [
        "Built the analytical base for later work in robotics, embedded systems, simulation, and AI-driven engineering projects.",
        "Strengthened cross-domain thinking across hardware, controls, and computational methods."
      ]
    }
  ];

  const skillGroups: SkillGroup[] = [
    {
      title: "Robotics & Autonomy",
      items: ["ROS 2", "Gazebo", "Path Planning", "SLAM", "Navigation", "Systems Integration"]
    },
    {
      title: "Perception / CV / ML",
      items: [
        "OpenCV",
        "Sensor Fusion",
        "Computer Vision",
        "Machine Learning",
        "Reinforcement Learning",
        "TensorFlow"
      ]
    },
    {
      title: "Embedded & Hardware",
      items: [
        "ESP32",
        "Arduino",
        "Embedded C",
        "PCB Design",
        "I2C / SPI / UART / CAN",
        "Sensor Integration"
      ]
    },
    {
      title: "CAD / Prototyping / Systems",
      items: ["SolidWorks", "Fusion 360", "ANSYS", "3D Printing", "Docker", "Linux / Git"]
    }
  ];

  return (
    <div className="page-stack">
      <section className="hero-section" id="home">
        <Reveal className="hero-block is-visible">
          <p className="hero-label">Robotics engineer</p>
          <h1 className="hero-name">{data.frontmatter.name}</h1>
          <p className="hero-title">
            Building autonomous systems across perception, planning, and hardware.
          </p>
          <p className="hero-copy">
            I work across computer vision, embedded systems, mechatronics, and
            autonomy with a focus on turning engineering ideas into working
            prototypes and credible technical systems.
          </p>

          <div className="hero-links">
            <Link href="/#projects">Projects</Link>
            <a href={data.frontmatter.resumeFile}>Resume</a>
            <a href={data.frontmatter.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={data.frontmatter.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="hero-meta">
            {heroMeta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="about" number="01" title="about" />
        </Reveal>
        <Reveal className="text-block" delay={40}>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="projects" number="02" title="featured work" />
        </Reveal>
        <div className="flagship-grid">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <FeaturedProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="experience" number="03" title="experience" />
        </Reveal>
        <div className="list-block">
          {experienceItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <TimelineCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="education" number="04" title="education" />
        </Reveal>
        <div className="list-block">
          {educationItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <TimelineCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="skills" number="05" title="stack" />
        </Reveal>
        <div className="skills-grouped">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60}>
              <SkillGroupCard group={group} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <Reveal>
          <SectionHeading id="contact" number="06" title="contact" />
        </Reveal>
        <Reveal className="contact-block" delay={40}>
          <p>
            Open to robotics, autonomy, perception, CV/ML, and systems engineering roles.
          </p>
          <div className="contact-grid">
            <ContactLink label="email" href={`mailto:${data.frontmatter.email}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 6.75h18v10.5H3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m4.5 8 7.5 6 7.5-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ContactLink>
            <ContactLink
              label="phone"
              href={`tel:${data.frontmatter.phone.replace(/[^+\d]/g, "")}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7.2 4.5h3l1.1 4-1.9 1.9a14.4 14.4 0 0 0 4.2 4.2l1.9-1.9 4 1.1v3c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 0 1 4.5 6c0-.8.7-1.5 1.5-1.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ContactLink>
            <ContactLink label="github" href={data.frontmatter.github}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 .1 1.6 1 1.6 1 .9 1.4 2.3 1 2.9.8.1-.6.4-1 .7-1.3-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.7 5.1.4.3.8 1 .8 2v3c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z"
                  fill="currentColor"
                />
              </svg>
            </ContactLink>
            <ContactLink label="linkedin" href={data.frontmatter.linkedin}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.4 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM4.9 9.8H8v9.3H4.9zm5 0h3v1.3h.1c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8v4.8h-3.1v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.9z"
                  fill="currentColor"
                />
              </svg>
            </ContactLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
