/**
 * AdminNavbar.jsx
 * Navigation bar for the admin panel.
 * Has a darker theme and an "Admin" badge to distinguish from user navbar.
 * Displays brand with logo, admin links, admin name, and logout button.
 */

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Get admin name from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Handle logout: clear localStorage and redirect to admin login
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-admin-panel">
      {/* Brand with logo and Admin badge */}
      <NavLink to="/admin/dashboard" className="navbar-brand">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        Schutzstaffel
        <span className="admin-badge">Admin</span>
      </NavLink>

      {/* Mobile hamburger button */}
      <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/complaints" onClick={() => setMenuOpen(false)}>
            All Complaints
          </NavLink>
        </li>
      </ul>

      {/* Right side: admin name + logout */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <span className="navbar-user">🔐 {user.name || "Admin"}</span>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
