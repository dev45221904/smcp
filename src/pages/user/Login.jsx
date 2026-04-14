/**
 * Login.jsx
 * User login page connected to the backend API.
 * Sends credentials to POST /api/auth/login and stores the JWT token + user info in localStorage.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios";
import Logo from "../../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();

  // Form state for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error and loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission — call backend login API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send login request to the backend
      const { data } = await API.post("/auth/login", { email, password });

      // Check that the user has "user" role (not admin)
      if (data.user.role !== "user") {
        setError("Please use the admin login page.");
        setLoading(false);
        return;
      }

      // Save token + user info to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          role: data.user.role,
          name: data.user.name,
          id: data.user.id,
        })
      );

      // Redirect to user dashboard
      navigate("/dashboard");
    } catch (err) {
      // Show error message from the API or a default message
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src={Logo} alt="Schutzstaffel Logo" className="auth-logo-img" />
        </div>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to Schutzstaffel Complaint Portal</p>

        {/* Error message */}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Link to registration page */}
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
