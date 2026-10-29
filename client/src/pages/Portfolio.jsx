import {
  Code2,
  Palette,
  Braces,
  Database,
  ShieldCheck,
  GitBranch,
  Bot,
  Globe,
  Gamepad2,
  GraduationCap,
  Mail,
  ExternalLink,
  FileText,
  MapPin,
  Layers,
  Menu,
  X,
  Users,
  ArrowLeft,
} from "lucide-react";

import { useState } from "react";
import "./Portfolio.css";

// =====================================
// SKILLS
// =====================================

const skills = [
  {
    title: "Frontend Development",
    icon: Palette,
    items: [
      { name: "HTML5", icon: Code2 },
      { name: "CSS3", icon: Palette },
      { name: "JavaScript", icon: Braces },
      { name: "React", icon: Layers },
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    items: [
      { name: "Communication", icon: Users },
      { name: "Teamwork", icon: Users },
      { name: "Time Management", icon: Layers },
      { name: "Adaptability", icon: Braces },
      { name: "Critical Thinking", icon: Code2 },
      { name: "Continuous Learning", icon: GraduationCap },
    ],
  },
  {
    title: "Backend Development",
    icon: Code2,
    items: [
      { name: "Node.js", icon: Braces },
      { name: "Express.js", icon: Code2 },
      { name: "REST APIs", icon: Globe },
      { name: "CRUD Operations", icon: Database },
      { name: "Fetch API", icon: Code2 },
      { name: "MVC Structure", icon: Layers },
      { name: "Environment Variables", icon: ShieldCheck },
      { name: "CORS", icon: Globe },
    ],
  },
  {
    title: "Database & Security",
    icon: Database,
    items: [
      { name: "MongoDB", icon: Database },
      { name: "Mongoose", icon: Database },
      { name: "JWT Authentication", icon: ShieldCheck },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    title: "Programming & DSA",
    icon: Braces,
    items: [
      { name: "Python", icon: Code2 },
      { name: "Data Structures", icon: Layers },
      { name: "Algorithms", icon: Braces },
      { name: "Problem Solving", icon: Code2 },
    ],
  },
  {
    title: "Tools & AI",
    icon: Bot,
    items: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Code2 },
      { name: "Canva", icon: Palette },
      { name: "AI Tools", icon: Bot },
      { name: "Perplexity", icon: Bot },
      { name: "Render", icon: Globe },
      { name: "Postman", icon: Globe },
    ],
  },
];

// =====================================
// FEATURED PROJECTS
// =====================================

const projects = [
  {
    number: "01",
    name: "CollabSphere",
    category: "Developer Collaboration Platform",
    description:
      "An AI-powered developer workspace designed to organize projects and improve productivity. The platform brings project management and developer-focused tools together in one place.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    number: "02",
    name: "Student Growth & Management System",
    category: "Full-Stack Student Platform",
    description:
      "A student management application for organizing study hours, learning topics, English progress, DSA practice, projects, assignments, attendance, goals, and analytics.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    link: "https://sgms-frontend-rd9p.onrender.com",
  },
  {
    number: "03",
    name: "Phase 6 Feedback System",
    category: "Full-Stack Web Application",
    description:
      "A feedback management project developed as part of Phase 6, combining a frontend interface with backend APIs and MongoDB integration.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    link: "https://phase-6-noxi.onrender.com",
  },
  {
    number: "04",
    name: "ShifoPath India",
    category: "Healthcare & Patient Support",
    description:
      "A patient-support coordination website presenting medical appointment assistance, accommodation and local transport support, and translation and interpreter services.",
    tech: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    link: "https://shifopath-india.github.io/shifopath-india/",
  },
];

// =====================================
// OTHER PROJECTS
// =====================================

const otherProjects = [
  {
    name: "Gemini AI Chatbot",
    description:
      "An AI chatbot project exploring conversational interfaces and Gemini-powered responses.",
    tech: ["JavaScript", "Gemini AI"],
    link: "https://phase-5-t1gs.onrender.com/",
    icon: Bot,
  },
  {
    name: "eBay UI Clone",
    description:
      "A frontend recreation of an e-commerce marketplace with search, category navigation, promotional sections, and product discovery.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://firdoshi25-hash.github.io/eBay/",
    icon: Globe,
  },
  {
    name: "Personal Portfolio",
    description:
      "A personal website showcasing developer information and web-development projects.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://firdoshi25-hash.github.io/profile/",
    icon: Code2,
  },
  {
    name: "Doraemon Blog",
    description:
      "A Doraemon-themed blog website with a fun and engaging design.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://firdoshi25-hash.github.io/doremon/",
    icon: Globe,
  },
  {
    name: "JavaScript Game",
    description:
      "A browser-based game built to practise interactive UI development and JavaScript logic.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://firdoshi25-hash.github.io/game/",
    icon: Gamepad2,
  },
  {
    name: "Java Ji Quiz App",
    description:
      "A quiz application designed to practise knowledge through an interactive quiz experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://firdoshi25-hash.github.io/java-ji/",
    icon: GraduationCap,
  },
];

// =====================================
// PORTFOLIO COMPONENT
// =====================================

function Portfolio({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="portfolio">
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        type="button"
        className="portfolio-back-button"
        onClick={() => onNavigate?.("Dashboard")}
      >
        <ArrowLeft size={17} />
        <span>Back to Dashboard</span>
      </button>

      {/* NAVIGATION BAR */}
      <nav className="portfolio-nav">
        <a
          href="#home"
          className="portfolio-logo"
          onClick={closeMenu}
        >
          <span className="portfolio-logo-icon">
            <Code2 size={22} />
          </span>
          <span>
            Firdoshi<span className="portfolio-logo-dot">.</span>
          </span>
        </a>

        <button
          type="button"
          className="portfolio-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div
          className={`portfolio-links ${
            menuOpen ? "portfolio-links-open" : ""
          }`}
        >
          {[
            ["Home", "#home"],
            ["About", "#about"],
            ["Resume", "#resume"],
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* HOME / HERO SECTION */}
      <section
        id="home"
        className="portfolio-hero portfolio-section"
      >
        <div className="portfolio-hero-content">
          <span className="portfolio-label">
            HELLO, WELCOME TO MY PORTFOLIO
          </span>

          <h1>
            Hi, I'm <span>Firdoshi</span>
          </h1>

          <h2>Full-Stack Web Developer & BCA Student</h2>

          <p>
            I build interactive web experiences and full-stack
            applications using modern web technologies. I enjoy
            turning ideas into useful, user-friendly digital
            products while continuously learning and improving
            my development skills.
          </p>

          <div className="portfolio-hero-buttons">
            <a
              href="#projects"
              className="portfolio-btn portfolio-btn-primary"
            >
              Explore My Projects <ExternalLink size={17} />
            </a>

            <a
              href="#contact"
              className="portfolio-btn portfolio-btn-secondary"
            >
              Contact Me <Mail size={17} />
            </a>
          </div>

          <div className="portfolio-hero-info">
            <span>
              <MapPin size={16} /> Delhi, India
            </span>
            <span>
              <GraduationCap size={17} /> BCA Student
            </span>
          </div>
        </div>

        <div className="portfolio-hero-visual">
          <div className="portfolio-code-window">
            <div className="portfolio-window-dots">
              <span />
              <span />
              <span />
              <p>developer.js</p>
            </div>

            <pre>
              <code>{`const developer = {
  name: "Firdoshi",
  role: "Full-Stack Developer",
  education: "BCA",
  university: "Eternal University",
  skills: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB"
  ],
  passion: "Building for the web"
};

console.log("Hello, World!");`}</code>
            </pre>

            <div className="portfolio-code-status">
              <span />
              Available for learning & opportunities
            </div>
          </div>

          <div className="portfolio-floating-card portfolio-floating-top">
            <Code2 size={20} />
            <span>Clean Code</span>
          </div>

          <div className="portfolio-floating-card portfolio-floating-bottom">
            <Database size={20} />
            <span>Full-Stack Projects</span>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="portfolio-section portfolio-about"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">GET TO KNOW ME</span>
          <h2>About Me</h2>
          <p>
            A little about my journey, education, and passion
            for technology.
          </p>
        </div>

        <div className="portfolio-about-grid">
          <article className="portfolio-panel portfolio-about-intro">
            <div className="portfolio-about-icon">
              <Code2 size={28} />
            </div>

            <h3>Turning Ideas Into Web Experiences</h3>

            <p>
              I'm Firdoshi, a Full-Stack Web Developer and BCA
              student who enjoys building practical web
              applications. I work with frontend interfaces,
              backend APIs, and databases to understand how
              complete web applications are developed.
            </p>

            <p>
              Through my projects, I'm strengthening my
              problem-solving, programming, and design skills.
              I'm always eager to learn new technologies and
              improve the way I build software.
            </p>

            <div className="portfolio-about-tags">
              <span>Creative Thinking</span>
              <span>Continuous Learning</span>
              <span>Problem Solving</span>
            </div>
          </article>

          <div className="portfolio-about-details">
            <article className="portfolio-panel portfolio-detail-card">
              <div className="portfolio-detail-icon">
                <GraduationCap size={23} />
              </div>

              <div className="portfolio-detail">
                <span>Education</span>
                <strong>
                  Bachelor of Computer Applications (BCA)
                </strong>
                <p>Eternal University, Himachal Pradesh</p>
                <p>2025 – Present</p>
              </div>
            </article>

            <article className="portfolio-panel portfolio-detail-card">
              <div className="portfolio-detail-icon">
                <MapPin size={23} />
              </div>

              <div className="portfolio-detail">
                <span>Location</span>
                <strong>Delhi, India</strong>
                <p>
                  Interested in web development and technology.
                </p>
              </div>
            </article>

            <article className="portfolio-panel portfolio-detail-card">
              <div className="portfolio-detail-icon">
                <Braces size={23} />
              </div>

              <div className="portfolio-detail">
                <span>What I Do</span>
                <strong>Full-Stack Web Development</strong>
                <p>
                  Frontend, backend APIs, and database integration.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section
        id="resume"
        className="portfolio-section portfolio-resume"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">MY BACKGROUND</span>
          <h2>Resume & Education</h2>
          <p>
            My academic background, technical focus, and the
            skills I'm developing as a full-stack developer.
          </p>
        </div>

        <div className="portfolio-resume-grid">
          <article className="portfolio-panel portfolio-resume-card">
            <div className="portfolio-resume-icon">
              <GraduationCap size={28} />
            </div>

            <span className="portfolio-resume-tag">
              2025 – Present
            </span>

            <h3>Bachelor of Computer Applications (BCA)</h3>

            <p className="portfolio-muted">
              Eternal University, Himachal Pradesh
            </p>

            <p>
              Currently pursuing a BCA and building a foundation
              in programming, web development, databases, and
              software development.
            </p>
          </article>

          <article className="portfolio-panel portfolio-resume-card">
            <div className="portfolio-resume-icon">
              <FileText size={28} />
            </div>

            <span className="portfolio-resume-tag">2025</span>

            <h3>Class XII</h3>

            <p className="portfolio-muted">CBSE Board</p>

            <p>
              Completed higher secondary education and continued
              my academic journey in computer applications.
            </p>
          </article>
        </div>

        <div className="portfolio-resume-note">
          <div className="portfolio-resume-note-icon">
            <Code2 size={24} />
          </div>

          <div>
            <h3>My Development Journey</h3>
            <p>
              I learn by building projects, practising
              programming, and exploring full-stack technologies
              such as React, Node.js, Express.js, and MongoDB.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="portfolio-section portfolio-skills"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">MY TECH TOOLKIT</span>
          <h2>Skills & Technologies</h2>
          <p>
            Technologies and tools I'm learning and using to
            build web applications.
          </p>
        </div>

        <div className="portfolio-skills-grid">
          {skills.map((group) => {
            const GroupIcon = group.icon;

            return (
              <article
                className="portfolio-panel portfolio-skill-card"
                key={group.title}
              >
                <div className="portfolio-skill-heading">
                  <span className="portfolio-skill-group-icon">
                    <GroupIcon size={23} />
                  </span>

                  <h3>{group.title}</h3>
                </div>

                <div className="portfolio-chips">
                  {group.items.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <span
                        className="portfolio-chip"
                        key={skill.name}
                      >
                        <SkillIcon size={16} />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="portfolio-panel portfolio-tools-note">
          <Bot size={25} />
          <div>
            <h3>Learning, Building & Improving</h3>
            <p>
              I use development tools and AI-assisted resources
              to explore ideas, understand concepts, and improve
              my project workflow.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section
        id="projects"
        className="portfolio-section portfolio-projects"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">
            WHAT I'VE BEEN BUILDING
          </span>
          <h2>Featured Projects</h2>
          <p>
            A selection of projects where I apply my development
            skills to practical ideas.
          </p>
        </div>

        <div className="portfolio-projects-grid">
          {projects.map((project) => (
            <article
              className="portfolio-panel portfolio-project-card"
              key={project.number}
            >
              <div className="portfolio-project-top">
                <span className="portfolio-project-number">
                  {project.number}
                </span>

                <span className="portfolio-project-status">
                  Featured Project
                </span>
              </div>

              <div className="portfolio-project-icon">
                {project.number === "01" && <Users size={27} />}
                {project.number === "02" && (
                  <GraduationCap size={27} />
                )}
                {project.number === "03" && <FileText size={27} />}
                {project.number === "04" && <Globe size={27} />}
              </div>

              <span className="portfolio-label">
                {project.category}
              </span>

              <h3>{project.name}</h3>

              <p className="portfolio-project-description">
                {project.description}
              </p>

              <div className="portfolio-chips">
                {project.tech.map((tech) => (
                  <span className="portfolio-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              {project.number === "01" ? (
                <button
                  type="button"
                  className="portfolio-project-link"
                  onClick={() => onNavigate?.("Dashboard")}
                >
                  View Project <ExternalLink size={16} />
                </button>
              ) : project.link ? (
                <a
                  className="portfolio-project-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project <ExternalLink size={16} />
                </a>
              ) : (
                <span className="portfolio-link-placeholder">
                  Project link to be added
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* OTHER PROJECTS SECTION */}
      <section
        id="other-projects"
        className="portfolio-section portfolio-other-projects"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">
            MORE THINGS I'VE BUILT
          </span>
          <h2>Other Projects</h2>
          <p>
            More experiments and mini projects from my web
            development journey.
          </p>
        </div>

        <div className="portfolio-mini-grid">
          {otherProjects.map((project) => {
            const ProjectIcon = project.icon;

            return (
              <article
                className="portfolio-panel portfolio-mini-card"
                key={project.name}
              >
                <div className="portfolio-mini-icon">
                  <ProjectIcon size={24} />
                </div>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <div className="portfolio-chips">
                  {project.tech.map((tech) => (
                    <span className="portfolio-chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    className="portfolio-project-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="portfolio-link-placeholder">
                    Link to be added
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="portfolio-section portfolio-contact"
      >
        <div className="portfolio-section-heading">
          <span className="portfolio-label">LET'S CONNECT</span>
          <h2>Contact Me</h2>
          <p>
            Feel free to reach out about web development,
            collaboration, or learning opportunities.
          </p>
        </div>

        <div className="portfolio-panel portfolio-contact-card">
          <Mail size={28} />
          <h3>Let's talk</h3>
          <p>
            You can connect with me through email or explore
            my projects on GitHub.
          </p>

          <div className="portfolio-hero-buttons">
            <a
              className="portfolio-btn portfolio-btn-primary"
              href="mailto:"
            >
              <Mail size={17} /> Email Me
            </a>

            <a
              className="portfolio-btn portfolio-btn-secondary"
              href="https://github.com/firdoshi25-hash"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={17} /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="portfolio-footer">
        <a href="#home" className="portfolio-logo">
          <span className="portfolio-logo-icon">
            <Code2 size={20} />
          </span>

          <span>
            Firdoshi<span className="portfolio-logo-dot">.</span>
          </span>
        </a>

        <p>Designed and built with care by Firdoshi.</p>

        <a
          href="https://github.com/firdoshi25-hash"
          target="_blank"
          rel="noreferrer"
          aria-label="Firdoshi on GitHub"
        >
          <Code2 size={21} />
        </a>

        <a href="#home" className="portfolio-back-top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}

export default Portfolio;