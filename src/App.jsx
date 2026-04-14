/**
 * App.jsx
 * Main application component that sets up all routes.
 * Uses React Router v6 with ProtectedRoute for role-based access control.
 * User routes use UserNavbar layout, admin routes use AdminNavbar layout.
 */

import { Routes, Route, Navigate } from "react-router-dom";

// Route protection
import ProtectedRoute from "./routes/ProtectedRoute";

// Layout components
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";

// User pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import SubmitComplaint from "./pages/user/SubmitComplaint";
import MyComplaints from "./pages/user/MyComplaints";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllComplaints from "./pages/admin/AllComplaints";
import ComplaintDetail from "./pages/admin/ComplaintDetail";

/**
 * UserLayout — wraps user pages with the user navbar
 */
const UserLayout = ({ children }) => (
  <div className="app-layout">
    <UserNavbar />
    {children}
  </div>
);

/**
 * AdminLayout — wraps admin pages with the admin navbar
 */
const AdminLayout = ({ children }) => (
  <div className="app-layout">
    <AdminNavbar />
    {children}
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}

      {/* Redirect root to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* User login and registration (no navbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin login (no navbar, separate dark-themed page) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ========== PROTECTED USER ROUTES ========== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout>
              <Dashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/submit-complaint"
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout>
              <SubmitComplaint />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-complaints"
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout>
              <MyComplaints />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* ========== PROTECTED ADMIN ROUTES ========== */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AllComplaints />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/complaints/:id"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <ComplaintDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ========== CATCH-ALL — redirect to login ========== */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
