
import { useState } from "react";
import {
  Code2,
  UserRound,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import api from "../api";

function Signup({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await api.post("/auth/register", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Registration successful!");

      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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

      <h1>Create Account</h1>
      <p className="login-subtitle">
        Join CollabSphere and start building something great.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-name">Full Name</label>
        <div className="login-input-wrapper">
          <UserRound size={18} />
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </div>

        <label htmlFor="signup-email">Email Address</label>
        <div className="login-input-wrapper">
          <Mail size={18} />
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <label htmlFor="signup-password">Password</label>
        <div className="login-input-wrapper">
          <Lock size={18} />
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <button
          className="login-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create My Account"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      {message && (
        <p className="login-message" role="status">
          {message}
        </p>
      )}

      <div className="login-footer">
        Your developer journey starts here.
      </div>
    </div>
  );
}

export default Signup;
