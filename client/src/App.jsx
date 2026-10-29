import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Sparkles,
  Settings,
  Bell,
  Search,
  Plus,
  Code2,
  Users,
  Clock3,
  ArrowUpRight,
  LogOut,
  UserPlus,
  Mail,
} from "lucide-react";

import "./index.css";
import Welcome from "./pages/Welcome";
import Portfolio from "./pages/Portfolio";
import StudyNotes from "./pages/StudyNotes";
import SGMS from "./pages/SGMS";
import AIReadme from "./pages/AIReadme";

const projects = [
  {
    name: "SGMS",
    description: "Student Growth and Management System",
    language: "React",
    status: "In Progress",
    updated: "Updated just now",
    color: "#8b5cf6",
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio and project showcase",
    language: "JavaScript",
    status: "Completed",
    updated: "Updated yesterday",
    color: "#06b6d4",
  },
  {
    name: "Study Notes App",
    description: "Organize notes and learning resources",
    language: "React",
    status: "In Progress",
    updated: "Updated 2 days ago",
    color: "#f59e0b",
  },
];

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Projects", icon: FolderKanban },
  { label: "Notes", icon: FileText },
  { label: "AI README Generator", icon: Sparkles },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [showProjectForm, setShowProjectForm] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    language: "JavaScript",
  });

  const [myProjects, setMyProjects] = useState(() => {
    try {
      const savedProjects = JSON.parse(
        localStorage.getItem("myProjects") || "[]"
      );

      if (savedProjects.length > 0) {
        const hasSGMS = savedProjects.some(
          (project) => project.name === "SGMS"
        );

        if (hasSGMS) {
          return savedProjects;
        }

        const oldSGMS = savedProjects.find(
          (project) =>
            project.name === "CollabSphere" ||
            project.name === "SGMS"
        );

        if (oldSGMS) {
          return savedProjects.map((project) =>
            project.name === "CollabSphere"
              ? {
                  ...project,
                  name: "SGMS",
                  description: "Student Growth and Management System",
                }
              : project
          );
        }

        return savedProjects;
      }

      return projects;
    } catch {
      return projects;
    }
  });

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  const [openProjectMenu, setOpenProjectMenu] = useState(null);

  const [members, setMembers] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberMessage, setMemberMessage] = useState("");
  const [memberMessageType, setMemberMessageType] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);

  const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8000"
  ).replace(/\/$/, "");

  const handleDeleteAllMembers = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all workspace members?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/members/delete-all`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete members."
        );
      }

      setMembers([]);
      alert(data.message || "All workspace members deleted.");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "myProjects",
      JSON.stringify(myProjects)
    );
  }, [myProjects]);

  // Load members from the backend
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMembers = async () => {
      setMembersLoading(true);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load members."
          );
        }

        setMembers(data.members || []);
      } catch (error) {
        console.error(
          "Fetch members error:",
          error.message
        );
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, [isAuthenticated]);

  // Add an existing registered user to the workspace
  const handleInviteMember = async (event) => {
    event.preventDefault();

    setMemberMessage("");
    setMemberMessageType("");

    const email = memberEmail.trim().toLowerCase();

    if (!email) {
      setMemberMessage("Please enter a member's email.");
      setMemberMessageType("error");
      return;
    }

    setMemberLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/members/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add member."
        );
      }

      setMembers((currentMembers) => [
        data.member,
        ...currentMembers.filter(
          (member) => member.id !== data.member.id
        ),
      ]);

      setMemberEmail("");
      setMemberMessage("Member added successfully!");
      setMemberMessageType("success");
      setShowInviteForm(false);
    } catch (error) {
      setMemberMessage(error.message);
      setMemberMessageType("error");
    } finally {
      setMemberLoading(false);
    }
  };

  const filteredProjects = myProjects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
    setIsAuthenticated(false);
  };

  // Show the welcome screen when no token is saved.
  if (!isAuthenticated) {
    return (
      <Welcome
        onAuthSuccess={() => {
          try {
            setUser(
              JSON.parse(localStorage.getItem("user")) || {}
            );
          } catch {
            setUser({});
          }

          setIsAuthenticated(true);
        }}
      />
    );
  }

  if (activePage === "Portfolio Website") {
    return <Portfolio onNavigate={setActivePage} />;
  }

  if (
    activePage === "Notes" ||
    activePage === "Study Notes"
  ) {
    return (
      <StudyNotes
        onBack={() => setActivePage("Dashboard")}
      />
    );
  }

  if (activePage === "SGMS") {
    return (
      <SGMS
        onBack={() => setActivePage("Dashboard")}
      />
    );
  }

  if (activePage === "AI README Generator") {
    return (
      <AIReadme
        onBack={() => setActivePage("Dashboard")}
      />
    );
  }

  if (activePage === "Settings") {
    return (
      <div className="settings-page">
        <h1>Settings</h1>
        <p>Customize your workspace.</p>

        <div className="settings-card">
          <div>
            <h3>Appearance</h3>
            <p>Choose your preferred theme.</p>
          </div>

          <div className="theme-options">
            <button
              className={
                theme === "light"
                  ? "theme-option selected"
                  : "theme-option"
              }
              onClick={() => setTheme("light")}
            >
              ☀️ Light Mode
            </button>

            <button
              className={
                theme === "dark"
                  ? "theme-option selected"
                  : "theme-option"
              }
              onClick={() => setTheme("dark")}
            >
              🌙 Dark Mode
            </button>
          </div>
        </div>

        <button
          className="secondary-button"
          onClick={() => setActivePage("Dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Code2 size={23} />
          </div>
        </div>

        <nav className="navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${
                activePage === label ? "active" : ""
              }`}
              onClick={() => setActivePage(label)}
            >
              <Icon size={19} />
              <span>{label}</span>

              {label === "AI README Generator" && (
                <span className="ai-tag">AI</span>
              )}
            </button>
          ))}
        </nav>

        {/* Workspace members */}
        <div className="sidebar-members">
          <div className="sidebar-members-heading">
            <span>TEAM MEMBERS</span>

            <button
              type="button"
              className="member-add-button"
              aria-label="Invite a team member"
              title="Invite a team member"
              onClick={() => {
                setShowInviteForm(true);
                setMemberMessage("");
                setActivePage("Dashboard");
              }}
            >
              <UserPlus size={17} />
            </button>
          </div>

          <div className="sidebar-member-list">
            <div className="sidebar-member">
              <div className="avatar member-avatar">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="sidebar-member-info">
                <strong>{user.name || "You"}</strong>
                <span>You</span>
              </div>
            </div>

            {membersLoading && (
              <p className="members-empty">
                Loading members...
              </p>
            )}

            {!membersLoading &&
              members.map((member) => (
                <div
                  className="sidebar-member"
                  key={member.id}
                >
                  <div className="avatar member-avatar">
                    {(member.name || member.email || "M")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="sidebar-member-info">
                    <strong>{member.name || "Member"}</strong>
                    <span>{member.email}</span>
                  </div>
                </div>
              ))}

            {!membersLoading && members.length === 0 && (
              <p className="members-empty">
                No other members yet.
              </p>
            )}
          </div>
        </div>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <button
            className="nav-item"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

          <div className="profile-card">
            <div className="avatar">
              {(user.name || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="profile-info">
              <strong>{user.name || "User"}</strong>
              <span>{user.email || "Developer account"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />

              <input
                type="search"
                placeholder="Search projects..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search projects"
              />

              <kbd>/</kbd>
            </label>

            <button
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="avatar top-avatar">
              {(user.name || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>
        </header>

        <section className="page-content">
          {/* Create Project Form */}
          {showProjectForm && (
            <div className="project-form-card">
              <h2>Create New Project</h2>
              <p>Enter your project details below.</p>

              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const projectToAdd = {
                    ...newProject,
                    id: crypto.randomUUID(),
                    isCustom: true,
                    status: "In Progress",
                    updated: "Added just now",
                    color: "#8b5cf6",
                  };

                  setMyProjects((currentProjects) => [
                    projectToAdd,
                    ...currentProjects,
                  ]);

                  setNewProject({
                    name: "",
                    description: "",
                    language: "JavaScript",
                  });

                  setShowProjectForm(false);
                  setActivePage("My Projects");
                }}
              >
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. My Portfolio"
                  value={newProject.name}
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      name: event.target.value,
                    })
                  }
                  required
                />

                <label>Description</label>
                <textarea
                  placeholder="Describe your project..."
                  value={newProject.description}
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      description: event.target.value,
                    })
                  }
                  required
                />

                <label>Programming Language</label>
                <select
                  value={newProject.language}
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      language: event.target.value,
                    })
                  }
                >
                  <option>JavaScript</option>
                  <option>React</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>HTML/CSS</option>
                  <option>Other</option>
                </select>

                <div className="project-form-actions">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Invite Member Form */}
          {showInviteForm && (
            <div className="project-form-card">
              <h2>
                <UserPlus size={22} /> Invite a Team Member
              </h2>

              <p>
                Add someone who already has a CollabSphere
                account.
              </p>

              <form onSubmit={handleInviteMember}>
                <label htmlFor="member-email">
                  Member Email
                </label>

                <input
                  id="member-email"
                  type="email"
                  placeholder="member@example.com"
                  value={memberEmail}
                  onChange={(event) =>
                    setMemberEmail(event.target.value)
                  }
                  required
                />

                {memberMessage && (
                  <p
                    role="status"
                    className={`member-message ${memberMessageType}`}
                  >
                    {memberMessage}
                  </p>
                )}

                <div className="project-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInviteForm(false);
                      setMemberMessage("");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={memberLoading}
                  >
                    <Mail size={16} />
                    {memberLoading ? "Adding..." : "Add Member"}
                  </button>

                  <button
                    type="button"
                    className="delete-members-button"
                    onClick={handleDeleteAllMembers}
                    disabled={members.length === 0}
                  >
                    Delete All Members
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Page Heading */}
          <div className="welcome-row">
            <div>
              <div className="eyebrow">
                YOUR DEVELOPER WORKSPACE
              </div>

              <h1>
                {activePage === "Dashboard"
                  ? `Welcome back, ${user.name || "Developer"} 👋`
                  : activePage}
              </h1>

              <p>
                {activePage === "Dashboard"
                  ? "Build, organize, and collaborate on your projects."
                  : `Manage your ${activePage.toLowerCase()} in one place.`}
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => {
                setActivePage("My Projects");
                setShowProjectForm(true);
              }}
            >
              <Plus size={18} />
              New Project
            </button>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Total Projects</span>
                <div className="stat-icon purple">
                  <FolderKanban size={19} />
                </div>
              </div>

              <h2>
                {myProjects.length.toString().padStart(2, "0")}
              </h2>
              <p>Your workspace projects</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Active Projects</span>
                <div className="stat-icon blue">
                  <Code2 size={19} />
                </div>
              </div>

              <h2>
                {myProjects
                  .filter(
                    (project) => project.status === "In Progress"
                  )
                  .length.toString()
                  .padStart(2, "0")}
              </h2>

              <p>Currently in progress</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Team Members</span>
                <div className="stat-icon orange">
                  <Users size={19} />
                </div>
              </div>

              <h2>
                {(members.length + 1).toString().padStart(2, "0")}
              </h2>
              <p>Including you</p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setShowInviteForm(!showInviteForm);
                  setShowProjectForm(false);
                  setMemberMessage("");
                  setMemberMessageType("");
                }}
              >
                <Plus size={16} />
                Invite Member
              </button>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Notes Created</span>
                <div className="stat-icon green">
                  <FileText size={19} />
                </div>
              </div>

              <h2>
                {(() => {
                  try {
                    return JSON.parse(
                      localStorage.getItem("studyNotes") || "[]"
                    )
                      .length.toString()
                      .padStart(2, "0");
                  } catch {
                    return "00";
                  }
                })()}
              </h2>

              <p>Ideas and documentation</p>
            </div>
          </div>

          {/* Recent Projects */}
          <section className="projects-section">
            <div className="section-heading">
              <div>
                <h2>Recent Projects</h2>
                <p>Your latest development work</p>
              </div>

              <button
                className="text-button"
                onClick={() => setActivePage("My Projects")}
              >
                View all <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article
                  className="project-card"
                  key={project.id || project.name}
                  onClick={() => {
                    if (project.name === "Study Notes App") {
                      setActivePage("Study Notes");
                    }

                    if (project.name === "Portfolio Website") {
                      setActivePage("Portfolio Website");
                    }

                    if (project.name === "SGMS") {
                      setActivePage("SGMS");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="project-card-top">
                    <div
                      className="project-symbol"
                      style={{
                        background: `${project.color}18`,
                        color: project.color,
                      }}
                    >
                      <Code2 size={22} />
                    </div>

                    <div className="project-menu-wrapper">
                      <button
                        type="button"
                        className="more-button"
                        aria-label={`Options for ${project.name}`}
                        onClick={(event) => {
                          event.stopPropagation();

                          setOpenProjectMenu(
                            openProjectMenu === project.name
                              ? null
                              : project.name
                          );
                        }}
                      >
                        ···
                      </button>

                      {openProjectMenu === project.name && (
                        <div className="project-dropdown">
                          <button
                            type="button"
                            className="delete-project-option"
                            onClick={(event) => {
                              event.stopPropagation();

                              if (!project.isCustom) {
                                window.alert(
                                  "Default projects cannot be deleted!"
                                );
                                setOpenProjectMenu(null);
                                return;
                              }

                              if (
                                window.confirm(
                                  `Delete "${project.name}"?`
                                )
                              ) {
                                setMyProjects((currentProjects) =>
                                  currentProjects.filter(
                                    (item) => item.id !== project.id
                                  )
                                );

                                setOpenProjectMenu(null);
                              }
                            }}
                          >
                            Delete Project
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3>{project.name}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-meta">
                    <span className="language-tag">
                      {project.language}
                    </span>

                    <select
                      className={`status-select ${
                        project.status === "Completed"
                          ? "completed"
                          : ""
                      }`}
                      value={project.status}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => {
                        event.stopPropagation();

                        setMyProjects((currentProjects) =>
                          currentProjects.map((item) =>
                            item.id === project.id ||
                            (!item.id && item.name === project.name)
                              ? {
                                  ...item,
                                  status: event.target.value,
                                }
                              : item
                          )
                        );
                      }}
                      aria-label={`Change status for ${project.name}`}
                    >
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="project-footer">
                    <span>
                      <Clock3 size={14} />
                      {project.updated}
                    </span>

                    <ArrowUpRight size={17} />
                  </div>
                </article>
              ))}

              {filteredProjects.length === 0 && (
                <div className="empty-state">
                  No projects found. Try another search.
                </div>
              )}
            </div>
          </section>

          {/* Bottom Cards */}
          <section className="bottom-grid">
            <div className="welcome-card">
              <div className="welcome-card-icon">
                <Sparkles size={23} />
              </div>

              <div>
                <span className="eyebrow">POWERED BY AI</span>
                <h2>Documentation, made easier.</h2>

                <p>
                  Generate clear README files for your projects with AI.
                </p>

                <button
                  className="secondary-button"
                  onClick={() =>
                    setActivePage("AI README Generator")
                  }
                >
                  Explore AI Generator
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            <div className="activity-card">
              <h2>Quick Start</h2>
              <p>Make your workspace productive.</p>

              <button
                onClick={() => setActivePage("My Projects")}
              >
                <FolderKanban size={17} />
                Organize a project
              </button>

              <button onClick={() => setActivePage("Notes")}>
                <FileText size={17} />
                Write a Markdown note
              </button>

              <button
                onClick={() =>
                  setActivePage("AI README Generator")
                }
              >
                <Sparkles size={17} />
                Generate a README
              </button>
            </div>
          </section>

          <footer className="page-footer">
            SGMS · Student Growth and Management System.
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;