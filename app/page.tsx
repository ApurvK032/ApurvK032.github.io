import { Reveal } from "@/components/reveal";
import { getPortfolioData, getSection } from "@/lib/content";

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
  year: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
};

type Fact = {
  label: string;
  value: string;
  detail: string;
};

function SectionLabel({
  id,
  number,
  title
}: {
  id: string;
  number: string;
  title: string;
}) {
  return (
    <p className="label rev" id={id}>
      <span className="num">{number}</span>
      {title}
    </p>
  );
}

function ProjectRow({ project }: { project: FeaturedProject }) {
  return (
    <article className="project-card">
      <div className="p-head">
        <h3 className="p-title">{project.title}</h3>
        <span className="p-year">{project.year}</span>
      </div>
      <p className="p-desc">{project.summary}</p>
      <div className="p-meta">
        <span className="stack">{project.stack.join(" / ")}</span>
        <span className="links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </span>
      </div>
    </article>
  );
}

function ExperienceRow({ item }: { item: TimelineItem }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <div>
          <h3 className="entry-title">{item.title}</h3>
          <p className="entry-org">{item.org}</p>
        </div>
        <div className="entry-aside">
          <span>{item.meta}</span>
          <span>{item.location}</span>
        </div>
      </div>
      <p className="entry-summary">{item.summary}</p>
      <ul className="entry-list">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillGroupRow({ group }: { group: SkillGroup }) {
  return (
    <div className="skill-group">
      <span className="sg-label">{group.title}</span>
      <div className="sg-items">
        {group.items.map((item, index) => (
          <span key={item}>
            {index > 0 ? <span className="sep"> / </span> : null}
            {item}
          </span>
        ))}
      </div>
    </div>
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
    "I work best on engineering problems where perception, control logic, embedded implementation, and mechanical reality all need to line up in a usable system."
  ];

  const facts: Fact[] = [
    {
      label: "Now",
      value: "M.S. Robotics",
      detail: "University of Minnesota / 2025-27"
    },
    {
      label: "Previously",
      value: "B.Tech Engineering Physics",
      detail: "IIT Guwahati / 2020-24"
    },
    {
      label: "Last role",
      value: "Lead Technical Engineer",
      detail: "Samaritan AI / 2024-25"
    },
    {
      label: "Based",
      value: data.frontmatter.location,
      detail: "Open to robotics, autonomy, and perception roles"
    }
  ];

  const featuredProjects: FeaturedProject[] = [
    {
      title: "Semantic-Aware Image Retargeting",
      year: "2025",
      summary:
        "Vision pipeline for resizing images while preserving semantic structure, composition, and salient content through composition-aware retargeting.",
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
      year: "2025",
      summary:
        "Indoor parking system combining overhead perception, coordinate mapping, navigation, and towing control in a ROS 2 simulation workflow.",
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
      year: "2025",
      summary:
        "Warehouse routing and task-sequencing system built around A* search, planning constraints, and optimization strategies for better route efficiency.",
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
        "Led development of a smart medical device from concept through integrated prototype across hardware, firmware, and validation.",
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
        "Worked on environmental monitoring and pollution-control systems through design, testing, simulation, and technical coordination.",
      bullets: [
        "Supported end-to-end prototype development spanning mechanical, electronics, and software workstreams.",
        "Coordinated interns across multiple engineering domains while contributing simulation and validation work.",
        "Helped produce technical material that contributed to securing a $50K+ grant."
      ]
    }
  ];

  const skillGroups: SkillGroup[] = [
    {
      title: "Robotics",
      items: ["ROS 2", "Gazebo", "Nav2", "SLAM", "Path Planning", "Systems Integration"]
    },
    {
      title: "Perception / ML",
      items: [
        "OpenCV",
        "PyTorch",
        "TensorFlow",
        "Sensor Fusion",
        "Computer Vision",
        "Reinforcement Learning"
      ]
    },
    {
      title: "Embedded",
      items: ["ESP32", "Arduino", "Embedded C", "PCB Design", "I2C / SPI / UART / CAN"]
    },
    {
      title: "Mechanical",
      items: ["SolidWorks", "Fusion 360", "ANSYS", "3D Printing", "Rapid Prototyping"]
    },
    {
      title: "Tooling",
      items: ["Python", "C++", "Linux", "Git", "Docker", "CMake"]
    }
  ];

  return (
    <>
      <section className="hero" id="home">
        <div className="wrap">
          <Reveal className="rev is-visible">
            <p className="eyebrow">Robotics engineer</p>
          </Reveal>
          <Reveal className="rev" delay={40}>
            <h1 className="name">{data.frontmatter.name}</h1>
          </Reveal>
          <Reveal className="rev" delay={80}>
            <p className="position">
              Robotics engineer working across <em>perception</em>,{" "}
              <em>embedded systems</em>, and <em>autonomy</em> - turning ideas
              into working prototypes.
            </p>
          </Reveal>
          <Reveal className="rev" delay={120}>
            <div className="hero-actions">
              <a href={data.frontmatter.resumeFile}>Resume</a>
              <a href={data.frontmatter.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="block about" id="about">
        <div className="wrap">
          <Reveal className="rev">
            <SectionLabel id="about-label" number="01 -" title="About" />
          </Reveal>

          {aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph} className="rev" delay={index * 40}>
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal className="rev" delay={120}>
            <div className="facts">
              {facts.map((fact) => (
                <div key={fact.label} className="fact">
                  <span className="fact-k">{fact.label}</span>
                  <span className="fact-v">
                    {fact.value}
                    <span>{fact.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="block" id="experience">
        <div className="wrap">
          <Reveal className="rev">
            <SectionLabel id="experience-label" number="02 -" title="Experience" />
          </Reveal>

          <div className="entries">
            {experienceItems.map((item, index) => (
              <Reveal key={item.title} className="rev" delay={index * 50}>
                <ExperienceRow item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="projects">
        <div className="wrap">
          <Reveal className="rev">
            <SectionLabel
              id="projects-label"
              number="03 -"
              title="Selected Projects"
            />
          </Reveal>

          <div className="projects">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} className="rev" delay={index * 50}>
                <ProjectRow project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="skills">
        <div className="wrap">
          <Reveal className="rev">
            <SectionLabel id="skills-label" number="04 -" title="Tools and Stack" />
          </Reveal>

          <Reveal className="rev" delay={40}>
            <div>
              {skillGroups.map((group) => (
                <SkillGroupRow key={group.title} group={group} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="block" id="contact">
        <div className="wrap">
          <Reveal className="rev">
            <SectionLabel id="contact-label" number="05 -" title="Contact" />
          </Reveal>

          <Reveal className="rev" delay={40}>
            <p className="contact-line">
              Looking for robotics, perception, or embedded roles -{" "}
              <a href={`mailto:${data.frontmatter.email}`}>let&apos;s talk</a>.
            </p>
          </Reveal>

          <Reveal className="rev" delay={90}>
            <div className="channels">
              <a className="channel" href={`mailto:${data.frontmatter.email}`}>
                <span className="ch-k">Email</span>
                <span className="ch-v">{data.frontmatter.email}</span>
              </a>
              <a
                className="channel"
                href={data.frontmatter.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="ch-k">GitHub</span>
                <span className="ch-v">ApurvK032</span>
              </a>
              <a
                className="channel"
                href={data.frontmatter.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="ch-k">LinkedIn</span>
                <span className="ch-v">kushwahaapurv</span>
              </a>
              <a
                className="channel"
                href={`tel:${data.frontmatter.phone.replace(/[^+\d]/g, "")}`}
              >
                <span className="ch-k">Phone</span>
                <span className="ch-v">{data.frontmatter.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bot">
        <div className="wrap footer-inner">
          <span>{data.frontmatter.name}</span>
          <span>{data.frontmatter.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        </div>
      </footer>
    </>
  );
}
