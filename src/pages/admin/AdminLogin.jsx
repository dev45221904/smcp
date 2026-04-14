/**
 * AdminLogin.jsx
 * Admin-only login page with a distinct dark theme.
 * Sends credentials to POST /api/auth/login and validates that the role is "admin".
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Logo from "../../assets/Logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      // Verify the user has "admin" role
      if (data.user.role !== "admin") {
        setError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      // Save token + admin info to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          role: data.user.role,
          name: data.user.name,
          id: data.user.id,
        })
      );

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page-admin">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src={Logo} alt="Schutzstaffel Logo" className="auth-logo-img" />
        </div>
        <h1>Admin Login</h1>
        <p className="auth-subtitle">Schutzstaffel Complaint Portal — Administration Panel</p>

        {/* Error message */}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              placeholder="Enter admin password"
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
            {loading ? "Signing in..." : "Sign In as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
