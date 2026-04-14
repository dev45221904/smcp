/**
 * UserNavbar.jsx
 * Navigation bar for the user panel.
 * Displays the Schutzstaffel Complaint Portal brand with logo,
 * navigation links, user name, and logout button.
 * Includes a mobile hamburger menu toggle.
 */

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const UserNavbar = () => {
  const navigate = useNavigate();
  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Get user name from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Handle logout: clear localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-user-panel">
      {/* Brand logo and name */}
      <NavLink to="/dashboard" className="navbar-brand">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        Schutzstaffel Portal
      </NavLink>

      {/* Mobile hamburger button */}
      <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/submit-complaint" onClick={() => setMenuOpen(false)}>
            Submit Complaint
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-complaints" onClick={() => setMenuOpen(false)}>
            My Complaints
          </NavLink>
        </li>
      </ul>

      {/* Right side: user name + logout */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <span className="navbar-user">👤 {user.name || "User"}</span>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
