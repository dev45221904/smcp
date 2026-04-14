/**
 * ProtectedRoute.jsx
 * A route guard component that checks localStorage for user authentication.
 * Verifies that a valid token and matching role exist before rendering children.
 * If not authenticated or wrong role, redirects to the appropriate login page.
 */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Retrieve stored user data from localStorage
  const storedUser = localStorage.getItem("user");

  // If no user is logged in, redirect to the appropriate login page
  if (!storedUser) {
    return requiredRole === "admin" ? (
      <Navigate to="/admin/login" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  // Parse the stored user object
  const user = JSON.parse(storedUser);

  // Check that a token exists (real authentication)
  if (!user.token) {
    localStorage.removeItem("user");
    return requiredRole === "admin" ? (
      <Navigate to="/admin/login" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  // If the user's role doesn't match the required role, redirect
  if (user.role !== requiredRole) {
    return user.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  // If authorized, render the child component
  return children;
};

export default ProtectedRoute;
