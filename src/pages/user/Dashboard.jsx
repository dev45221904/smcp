/**
 * Dashboard.jsx (User)
 * User dashboard fetching real data from the backend API.
 * Shows welcome message, summary stat cards, and recent complaints table.
 */

import { useState, useEffect } from "react";
import API from "../../api/axios";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

const Dashboard = () => {
  // Get the logged-in user's name from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // State for stats and recent complaints
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from the API on component mount
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await API.get("/complaints/stats");
        setStats(data.stats);
        setRecent(data.recent);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="page-container">
      {/* Welcome section with gradient background */}
      <div className="welcome-section">
        <h1>Welcome back, {user.name || "User"}! 👋</h1>
        <p>Here's an overview of your complaints and their current status.</p>
      </div>

      {/* Summary stat cards */}
      <div className="stats-grid">
        <StatCard icon="📋" value={stats.total} label="Total Complaints" color="#1e88e5" />
        <StatCard icon="⏳" value={stats.pending} label="Pending" color="#f59e0b" />
        <StatCard icon="🔄" value={stats.inProgress} label="In Progress" color="#3b82f6" />
        <StatCard icon="✅" value={stats.resolved} label="Resolved" color="#10b981" />
      </div>

      {/* Recent complaints table */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Complaints</h3>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)" }}>
            Loading...
          </p>
        ) : recent.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)" }}>
            No complaints yet. Submit your first complaint!
          </p>
        ) : (
          <div className="table-container" style={{ boxShadow: "none" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((complaint) => (
                  <tr key={complaint._id}>
                    <td style={{ fontWeight: 600, color: "var(--accent)" }}>
                      {complaint.complaintId}
                    </td>
                    <td className="table-title">{complaint.title}</td>
                    <td>{complaint.category}</td>
                    <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={complaint.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
