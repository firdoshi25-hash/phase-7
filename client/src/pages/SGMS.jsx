
import { useState, useEffect } from "react";
import {
  GraduationCap,
  ArrowLeft,
  Plus,
  Trash2,
  Users,
  Award,
} from "lucide-react";
import "./SGMS.css";

function SGMS({ onBack }) {
  const [students, setStudents] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("sgmsStudents")) || [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("sgmsStudents", JSON.stringify(students));
}, [students]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    course: "",
    marks: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const marks = Number(form.marks);

    if (marks < 0 || marks > 100) {
      alert("Marks 0 se 100 ke beech hone chahiye.");
      return;
    }

    setStudents((current) => [
      ...current,
      {
        ...form,
        marks,
        id: crypto.randomUUID(),
      },
    ]);

    setForm({
      name: "",
      rollNo: "",
      course: "",
      marks: "",
    });
  }

  function getGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 40) return "D";
    return "F";
  }

  const average = students.length
    ? (
        students.reduce((total, student) => total + student.marks, 0) /
        students.length
      ).toFixed(1)
    : "0.0";

  return (
    <main className="sgms-page">
      <button className="sgms-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header className="sgms-header">
        <div className="sgms-heading-icon">
          <GraduationCap size={30} />
        </div>
        <div>
          <h1>Student Growth & Management System</h1>
          <p>Manage student records, academic performance and grades.</p>
        </div>
      </header>

      <section className="sgms-stats">
        <article className="sgms-stat-card">
          <Users size={23} />
          <p>Total Students</p>
          <h2>{students.length.toString().padStart(2, "0")}</h2>
        </article>

        <article className="sgms-stat-card">
          <Award size={23} />
          <p>Average Marks</p>
          <h2>{average}</h2>
        </article>

        <article className="sgms-stat-card">
          <GraduationCap size={23} />
          <p>Students Passed</p>
          <h2>{students.filter((s) => s.marks >= 40).length}</h2>
        </article>
      </section>

      <section className="sgms-panel">
        <h2>Add Student Record</h2>

        <form className="sgms-form" onSubmit={handleSubmit}>
          <input
            placeholder="Student full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Roll number"
            value={form.rollNo}
            onChange={(e) =>
              setForm({ ...form, rollNo: e.target.value })
            }
            required
          />

          <input
            placeholder="Course / Subject"
            value={form.course}
            onChange={(e) =>
              setForm({ ...form, course: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Marks (0–100)"
            min="0"
            max="100"
            value={form.marks}
            onChange={(e) =>
              setForm({ ...form, marks: e.target.value })
            }
            required
          />

          <button type="submit" className="sgms-add-btn">
            <Plus size={18} />
            Add Student
          </button>
        </form>
      </section>

      <section className="sgms-panel">
        <h2>Student Records</h2>

        {students.length === 0 ? (
          <p className="sgms-empty">
            No records yet. Add your first student above.
          </p>
        ) : (
          <div className="sgms-table-wrapper">
            <table className="sgms-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No.</th>
                  <th>Course</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.course}</td>
                    <td>{student.marks}/100</td>
                    <td>
                      <span
                        className={`sgms-grade ${
                          student.marks < 40 ? "fail" : ""
                        }`}
                      >
                        {getGrade(student.marks)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="sgms-delete-btn"
                        title="Delete student"
                        onClick={() => {
                          if (window.confirm("Delete this student record?")) {
                            setStudents((current) =>
                              current.filter((s) => s.id !== student.id)
                            );
                          }
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default SGMS;
