
import { useState } from "react";
import { Code2, Mail, Lock, ArrowRight } from "lucide-react";
import api from "../api";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful!");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-brand-icon">
        <Code2 size={28} />
      </div>

      <h1>Welcome Back!</h1>
      <p className="login-subtitle">
        Sign in to continue to your CollabSphere workspace.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email Address</label>
        <div className="login-input-wrapper">
          <Mail size={18} />
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <label htmlFor="login-password">Password</label>
        <div className="login-input-wrapper">
          <Lock size={18} />
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        <button
          className="login-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login to Account"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      {message && (
        <p className="login-message" role="status">
          {message}
        </p>
      )}

      <div className="login-footer">
        Securely access your developer workspace.
      </div>
    </div>
  );
}

export default Login;
