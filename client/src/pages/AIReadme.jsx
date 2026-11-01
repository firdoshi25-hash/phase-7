
import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  FileText,
  LoaderCircle,
} from "lucide-react";
import "./AIReadme.css";

function AIReadme({ onBack }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [features, setFeatures] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);


async function generateReadme(e) {
  e.preventDefault();
  setLoading(true);
  setReadme("");

  try {
    const response = await fetch(`${(import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "")}/api/ai/readme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        description,
        technologies: technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        features: features
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "README generation failed.");
    }

    setReadme(data.readme);
  } catch (error) {
    alert(error.message || "Server se connect nahi ho paya.");
  } finally {
    setLoading(false);
  }
}

  async function copyReadme() {
    try {
      await navigator.clipboard.writeText(readme);
      alert("README copied successfully!");
    } catch {
      alert("Copy failed. Please select and copy the README manually.");
    }
  }

  return (
    <main className="ai-readme-page">
      <button className="ai-readme-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header className="ai-readme-header">
        <div className="ai-readme-icon">
          <Sparkles size={30} />
        </div>
        <div>
          <h1>AI README Generator</h1>
          <p>Create professional project documentation in seconds.</p>
        </div>
      </header>

      <div className="ai-readme-layout">
        <section className="ai-readme-panel">
          <h2>Project Details</h2>
          <p className="ai-readme-subtitle">
            Enter your project information to generate a README.
          </p>

          <form onSubmit={generateReadme}>
            <label>Project Name</label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. CollabSphere"
              required
            />

            <label>Project Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does your project do?"
              rows="3"
              required
            />

            <label>Technologies (comma separated)</label>
            <input
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Node.js, MongoDB"
              required
            />

            <label>Features (one per line)</label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder={"User authentication\nProject management\nDashboard"}
              rows="4"
              required
            />

            <button className="ai-readme-generate" type="submit">
              {loading ? (
                <LoaderCircle size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              {loading ? "Generating..." : "Generate README"}
            </button>
          </form>
        </section>

        <section className="ai-readme-panel ai-readme-output">
          <div className="ai-readme-output-heading">
            <div>
              <FileText size={20} />
              <h2>README Preview</h2>
            </div>

            {readme && (
              <button
                type="button"
                className="ai-readme-copy"
                onClick={copyReadme}
              >
                <Copy size={16} />
                Copy
              </button>
            )}
          </div>

          {readme ? (
            <pre className="ai-readme-preview">{readme}</pre>
          ) : (
            <div className="ai-readme-empty">
              <FileText size={38} />
              <h3>Your README will appear here</h3>
              <p>Fill in the project details and generate your documentation.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AIReadme;
