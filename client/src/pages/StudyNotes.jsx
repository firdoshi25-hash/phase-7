import { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  FileText,
} from "lucide-react";
import "./StudyNotes.css";

function StudyNotes({ onBack }) {
  const [notes, setNotes] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("studyNotes")) || [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("studyNotes", JSON.stringify(notes));
}, [notes]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    content: "",
  });

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.subject} ${note.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function resetForm() {
    setForm({ title: "", subject: "", content: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.subject.trim() || !form.content.trim()) {
      return;
    }

    if (editingId !== null) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingId
            ? { ...note, ...form }
            : note
        )
      );
    } else {
      setNotes((current) => [
        {
          id: Date.now(),
          ...form,
          createdAt: new Date().toLocaleDateString(),
        },
        ...current,
      ]);
    }

    resetForm();
  }

  function editNote(note) {
    setForm({
      title: note.title,
      subject: note.subject,
      content: note.content,
    });
    setEditingId(note.id);
    setShowForm(true);
  }

  function deleteNote(id) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes((current) => current.filter((note) => note.id !== id));
    }
  }

  return (
    <main className="study-notes">
        <button
  type="button"
  className="notes-back-btn"
  onClick={onBack}
>
  ← Back to Dashboard
</button>
      <header className="notes-header">
        <div className="notes-heading">
          <div className="notes-icon">
            <BookOpen size={28} />
          </div>
          <div>
            <h1>Study Notes</h1>
            <p>Organize your learning, one note at a time.</p>
          </div>
        </div>

        <button
          className="notes-primary-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus size={18} /> Create Note
        </button>
      </header>

      <section className="notes-toolbar">
        <div className="notes-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search notes or subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="notes-count">
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </span>
      </section>

      {showForm && (
        <section className="notes-form-card">
          <div className="notes-form-heading">
            <h2>{editingId !== null ? "Edit Note" : "Create a New Note"}</h2>
            <button className="notes-icon-btn" onClick={resetForm} type="button">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Note Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Introduction to JavaScript"
                required
              />
            </label>

            <label>
              Subject
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. JavaScript"
                required
              />
            </label>

            <label>
              Note Content
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your study notes here..."
                rows={6}
                required
              />
            </label>

            <div className="notes-form-actions">
              <button type="button" className="notes-cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="notes-primary-btn">
                <Save size={17} /> Save Note
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="notes-grid">
        {filteredNotes.map((note) => (
          <article className="note-card" key={note.id}>
            <div className="note-card-top">
              <span className="note-subject">{note.subject}</span>
              <FileText size={20} />
            </div>

            <h3>{note.title}</h3>
            <p className="note-content">{note.content}</p>

            <div className="note-card-footer">
              <span>{note.createdAt || "Recently updated"}</span>
              <div className="note-actions">
                <button
                  className="notes-icon-btn"
                  onClick={() => editNote(note)}
                  aria-label="Edit note"
                  title="Edit note"
                >
                  <Pencil size={17} />
                </button>
                <button
                  className="notes-icon-btn delete-note-btn"
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                  title="Delete note"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredNotes.length === 0 && (
        <section className="notes-empty">
          <BookOpen size={42} />
          <h2>{search ? "No notes found" : "Your notes start here"}</h2>
          <p>
            {search
              ? "Try searching with another title or subject."
              : "Create your first study note to keep your learning organized."}
          </p>
          {!search && (
            <button className="notes-primary-btn" onClick={() => setShowForm(true)}>
              <Plus size={18} /> Create Your First Note
            </button>
          )}
        </section>
      )}
    </main>
  );
}

export default StudyNotes;
