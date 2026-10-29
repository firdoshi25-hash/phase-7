
import { useState } from "react";
import {
  Code2,
  FolderKanban,
  Users,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Login from "./Login";
import Signup from "./Signup";
import "../index.css";

function Welcome({ onAuthSuccess }) {
  const [mode, setMode] = useState("");

  if (mode === "login") {
    return (
      <div className="auth-page">
        <button
          className="text-button"
          onClick={() => setMode("")}
        >
          ← Back to Home
        </button>

        <Login onLoginSuccess={onAuthSuccess} />
      </div>
    );
  }

  if (mode === "signup") {
    return (
      <div className="auth-page">
        <button
          className="text-button"
          onClick={() => setMode("")}
        >
          ← Back to Home
        </button>

        <Signup onSignupSuccess={onAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="landing-page">
      <header className="landing-navbar">
        <a
          href="#home"
          className="landing-brand"
          onClick={(event) => event.preventDefault()}
        >
          <span className="landing-brand-icon">
            <Code2 size={24} />
          </span>

          <span>
            <strong>CollabSphere</strong>
            <small>Developer workspace</small>
          </span>
        </a>

        <nav className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>

          <button
            className="secondary-button"
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className="primary-button"
            onClick={() => setMode("signup")}
          >
            Get Started <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      <main id="home">
        <section className="landing-hero">
          <div className="landing-hero-content">
            <span className="landing-eyebrow">
              <Sparkles size={15} />
              YOUR DEVELOPER WORKSPACE
            </span>

            <h1>
              Everything you need to build
              <span> better projects.</span>
            </h1>

            <p>
              Manage projects, organize study notes, collaborate
              with your team, and simplify documentation — all
              in one place.
            </p>

            <div className="landing-hero-actions">
              <button
                className="primary-button"
                onClick={() => setMode("signup")}
              >
                Get Started <ArrowRight size={17} />
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Features
              </button>
            </div>

            <div className="landing-trust">
              <CheckCircle2 size={17} />
              <span>One workspace for your development journey</span>
            </div>
          </div>

          <div className="landing-preview">
            <div className="landing-preview-header">
              <div className="landing-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span>My Workspace</span>

              <Code2 size={18} />
            </div>

            <div className="landing-preview-body">
              <div className="landing-preview-sidebar">
                <div className="landing-preview-logo">
                  <Code2 size={19} />
                  <strong>Workspace</strong>
                </div>

                <div className="landing-preview-link active">
                  <FolderKanban size={16} />
                  Projects
                </div>

                <div className="landing-preview-link">
                  <FileText size={16} />
                  Notes
                </div>

                <div className="landing-preview-link">
                  <Sparkles size={16} />
                  AI Generator
                </div>
              </div>

              <div className="landing-preview-main">
                <span className="landing-preview-caption">
                  YOUR WORKSPACE
                </span>

                <h3>Project Overview</h3>

                <p>Keep your latest work organized.</p>

                <div className="landing-mini-stats">
                  <div>
                    <FolderKanban size={19} />
                    <strong>Projects</strong>
                    <span>Organized work</span>
                  </div>

                  <div>
                    <Users size={19} />
                    <strong>Team</strong>
                    <span>Work together</span>
                  </div>
                </div>

                <div className="landing-preview-project">
                  <span className="landing-project-icon">
                    <Code2 size={19} />
                  </span>

                  <div>
                    <strong>CollabSphere</strong>
                    <span>Developer collaboration</span>
                  </div>

                  <span className="landing-project-status">
                    Active
                  </span>
                </div>

                <div className="landing-preview-project">
                  <span className="landing-project-icon blue">
                    <FileText size={19} />
                  </span>

                  <div>
                    <strong>Project Notes</strong>
                    <span>Ideas and documentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="landing-features">
          <div className="landing-section-heading">
            <span className="landing-eyebrow">
              BUILT FOR DEVELOPERS
            </span>

            <h2>Everything in one workspace.</h2>

            <p>
              The essential tools to keep your development work
              clear, organized, and productive.
            </p>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <div className="landing-feature-icon purple">
                <FolderKanban size={23} />
              </div>

              <h3>Project Management</h3>

              <p>
                Organize your projects and keep track of your
                development work.
              </p>
            </article>

            <article className="landing-feature-card">
              <div className="landing-feature-icon blue">
                <Users size={23} />
              </div>

              <h3>Team Collaboration</h3>

              <p>
                Create a shared space for teamwork and project
                collaboration.
              </p>
            </article>

            <article className="landing-feature-card">
              <div className="landing-feature-icon orange">
                <FileText size={23} />
              </div>

              <h3>Smart Notes</h3>

              <p>
                Keep your learning notes, ideas, and documentation
                together.
              </p>
            </article>

            <article className="landing-feature-card">
              <div className="landing-feature-icon green">
                <Sparkles size={23} />
              </div>

              <h3>AI README Generator</h3>

              <p>
                Make project documentation easier with your AI
                README tools.
              </p>
            </article>
          </div>
        </section>

        <section id="about" className="landing-cta">
          <div>
            <h2>Ready to organize your development work?</h2>

            <p>
              Start building your workspace with CollabSphere.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setMode("signup")}
          >
            Create Your Account <ArrowRight size={17} />
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-brand">
          <Code2 size={19} />
          <strong>CollabSphere</strong>
        </div>

        <span>
          Your ideas, your code, one workspace.
        </span>

        <span>© {new Date().getFullYear()} CollabSphere</span>
      </footer>
    </div>
  );
}

export default Welcome;
