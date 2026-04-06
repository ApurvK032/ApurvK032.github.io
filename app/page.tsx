import Link from "next/link";
import { getPortfolioData } from "@/lib/content";
import type { ReactNode } from "react";

type TimelineItem = {
  title: string;
  org: string;
  meta: string;
  location: string;
  bullets: string[];
};

type ProjectItem = {
  title: string;
  date: string;
  stack: string;
  summary: string;
  bullets: string[];
  links: { label: string; href: string }[];
};

function SectionHeading({
  id,
  eyebrow,
  title
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <article className="timeline-card">
      <div className="card-topline">
        <span className="meta-chip">{item.meta}</span>
        <span className="meta-chip meta-chip-muted">{item.location}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="card-subtitle">{item.org}</p>
      <ul className="detail-list">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillGroup({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="skill-card">
      <h3>{title}</h3>
      <div className="chip-wrap">
        {items.map((item) => (
          <span key={item} className="skill-chip">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="project-card">
      <div className="card-topline">
        <span className="meta-chip">{project.date}</span>
        <span className="meta-chip meta-chip-muted">{project.stack}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="section-copy">{project.summary}</p>
      <ul className="detail-list">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="link-row">
        {project.links.map((link) => (
          <a key={link.href} className="inline-link" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function ContactIcon({
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
      className="contact-icon"
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const data = getPortfolioData();

  const educationItems: TimelineItem[] = [
    {
      title: "Master of Science in Robotics",
      org: "University of Minnesota Twin Cities",
      meta: "Aug 2025 - May 2027",
      location: "Minneapolis, MN",
      bullets: [
        "Current graduate program focused on robotics systems, perception, and intelligent autonomy.",
        "Building depth across computer vision, planning, embodied intelligence, and real-world robotics engineering."
      ]
    },
    {
      title: "Bachelor of Technology in Engineering Physics",
      org: "Indian Institute of Technology Guwahati",
      meta: "Jul 2020 - May 2024",
      location: "Guwahati, India",
      bullets: [
        "Built a strong quantitative and systems foundation across physics, engineering, and technical problem solving.",
        "Developed the base for later work in robotics, embedded systems, and AI-driven applications."
      ]
    }
  ];

  const experienceItems: TimelineItem[] = [
    {
      title: "Lead Technical Engineer",
      org: "Samaritan AI",
      meta: "Nov 2024 - Jun 2025",
      location: "New Delhi, India",
      bullets: [
        "Led end-to-end development of a smart medical device across mechanical design, electronics integration, embedded firmware, and prototype validation.",
        "Designed CAD parts, used 3D printing for fabrication, assembled electronic subsystems, and integrated sensors into a prototype shown to investors and hospitals.",
        "Developed ESP32 firmware and 24-hour reliability tests that improved signal stability and reduced measurement inconsistency by 87%."
      ]
    },
    {
      title: "Research and Development Engineer",
      org: "Swachh.io",
      meta: "May 2024 - Nov 2024",
      location: "New Delhi, India",
      bullets: [
        "Supported environmental monitoring and pollution-control prototype development from design through testing and system integration.",
        "Coordinated interns across mechanical, electronics, and software workstreams.",
        "Contributed simulation and validation work used in reports that helped secure a $50K+ grant."
      ]
    }
  ];

  const skillGroups = [
    {
      title: "Programming and Robotics",
      items: [
        "Python",
        "C++",
        "Embedded C",
        "MATLAB",
        "ROS 2",
        "Gazebo",
        "Path Planning",
        "SLAM"
      ]
    },
    {
      title: "Perception and AI",
      items: [
        "OpenCV",
        "Sensor Fusion",
        "Computer Vision",
        "Machine Learning",
        "Reinforcement Learning",
        "TensorFlow",
        "Rust"
      ]
    },
    {
      title: "Mechatronics and Embedded",
      items: [
        "ESP32",
        "Arduino",
        "PCB Design",
        "CAD",
        "Embedded Systems",
        "Sensor Integration",
        "I2C",
        "SPI",
        "UART",
        "CAN"
      ]
    },
    {
      title: "Engineering Tools",
      items: [
        "Linux",
        "Git",
        "Docker",
        "CMake",
        "SolidWorks",
        "Fusion 360",
        "ANSYS",
        "3D Printing"
      ]
    }
  ];

  const projectItems: ProjectItem[] = [
    {
      title: "Semantic-Aware Image Retargeting",
      date: "Dec 2025",
      stack: "PyTorch, DINOv3, Depth Anything 3, OpenCV",
      summary:
        "A computer vision pipeline for intelligently resizing images while preserving semantic content and composition.",
      bullets: [
        "Combined saliency detection, depth estimation, and seam carving for content-aware retargeting.",
        "Trained a DINOv3-based classifier on the PICD dataset and achieved repo-reported 75-80% validation accuracy."
      ],
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
      stack: "ROS 2, Gazebo, Nav2, OpenCV",
      summary:
        "An indoor autonomous parking system that combines perception, navigation, and towing control in simulation.",
      bullets: [
        "Built overhead-camera vehicle detection with Nav2-based navigation and towing robot lift control.",
        "Implemented coordinate transformation and fine-positioning logic with reported +/-10 cm positioning accuracy and 100% navigation success in tests."
      ],
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
      stack: "A*, Hill Climbing, Simulated Annealing",
      summary:
        "A warehouse routing and task-sequencing project built around path planning and optimization under precedence constraints.",
      bullets: [
        "Modeled the workflow as an extended traveling salesman problem paired with A* path planning.",
        "Compared greedy, hill climbing, and simulated annealing, with repository experiments showing 5-12% route-cost improvement over baseline."
      ],
      links: [
        {
          label: "Code",
          href: "https://github.com/ApurvK032/WarehouseBot-Pick-and-Drop-Optimization"
        }
      ]
    }
  ];

  return (
    <div className="page-stack">
      <section className="hero-section" id="home">
        <div className="hero-main">
          <p className="eyebrow">Robotics, Perception and Embedded Systems</p>
          <h1>{data.frontmatter.name}</h1>
          <p className="hero-copy">{data.frontmatter.headline}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#projects">
              View Projects
            </Link>
            <a className="button button-secondary" href={data.frontmatter.resumeFile}>
              Open Resume
            </a>
          </div>
        </div>

        <aside className="hero-side">
          <div className="highlight-card">
            <p className="eyebrow">Current Focus</p>
            <ul className="detail-list">
              <li>Graduate robotics study at the University of Minnesota</li>
              <li>Hands-on systems work across firmware, perception, and mechatronics</li>
              <li>Projects spanning robotics, vision, and optimization</li>
            </ul>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-label">Location</span>
              <strong>Minneapolis, Minnesota</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Focus</span>
              <strong>Perception, Robotics and AI</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Strength</span>
              <strong>Prototype to Product Systems</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="content-section">
        <SectionHeading
          id="education"
          eyebrow="Education"
          title="Academic background"
        />
        <div className="timeline-grid">
          {educationItems.map((item) => (
            <TimelineCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          id="experience"
          eyebrow="Experience"
          title="Industry and engineering work"
        />
        <div className="timeline-grid">
          {experienceItems.map((item) => (
            <TimelineCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          id="skills"
          eyebrow="Skills"
          title="Technical skill set"
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} title={group.title} items={group.items} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          id="projects"
          eyebrow="Projects"
          title="Selected projects"
        />
        <div className="projects-grid">
          {projectItems.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          id="contact"
          eyebrow="Contact"
          title="Get in touch"
        />
        <div className="contact-icons-panel">
          <ContactIcon label="Email" href={`mailto:${data.frontmatter.email}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6.75h18v10.5H3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m4.5 8 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ContactIcon>
          <ContactIcon label="Phone" href={`tel:${data.frontmatter.phone.replace(/[^+\d]/g, "")}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.2 4.5h3l1.1 4-1.9 1.9a14.4 14.4 0 0 0 4.2 4.2l1.9-1.9 4 1.1v3c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 0 1 4.5 6c0-.8.7-1.5 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ContactIcon>
          <ContactIcon label="GitHub" href={data.frontmatter.github}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 .1 1.6 1 1.6 1 .9 1.4 2.3 1 2.9.8.1-.6.4-1 .7-1.3-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.7 5.1.4.3.8 1 .8 2v3c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z" fill="currentColor" />
            </svg>
          </ContactIcon>
          <ContactIcon label="LinkedIn" href={data.frontmatter.linkedin}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.4 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM4.9 9.8H8v9.3H4.9zm5 0h3v1.3h.1c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8v4.8h-3.1v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.9z" fill="currentColor" />
            </svg>
          </ContactIcon>
        </div>
      </section>
    </div>
  );
}
