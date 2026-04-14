/**
 * Register.jsx
 * User registration page connected to the backend API.
 * Sends user data to POST /api/auth/register, shows success, then redirects to /login.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios";
import Logo from "../../assets/Logo.png";

const Register = () => {
  const navigate = useNavigate();

  // Form field states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Error, success, and loading states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update a form field value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission — call backend register API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check all fields are filled
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check minimum password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Send registration request to the backend
      await API.post("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Show success message and redirect after 2 seconds
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
        <h1>Create Account</h1>
        <p className="auth-subtitle">Register as a citizen to report complaints</p>

        {/* Success message */}
        {success && (
          <div className="alert alert-success">
            ✅ Registration successful! Redirecting to login...
          </div>
        )}

        {/* Error message */}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {/* Registration form (hidden on success) */}
        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {/* Link to login page */}
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
