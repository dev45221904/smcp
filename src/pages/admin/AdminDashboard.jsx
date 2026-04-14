/**
 * AdminDashboard.jsx
 * Admin dashboard fetching real data from GET /api/admin/stats.
 * Shows stat cards, CSS bar chart by category, and recent complaints list.
 */

import { useState, useEffect } from "react";
import API from "../../api/axios";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

const AdminDashboard = () => {
  // State for stats, category breakdown, and recent complaints
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find the highest category count for scaling bar widths
  const maxCount = categoryBreakdown.length > 0
    ? Math.max(...categoryBreakdown.map((c) => c.count))
    : 1;

  // Fetch admin stats from the API on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/stats");
        setStats(data.stats);
        setCategoryBreakdown(data.categoryBreakdown);
        setRecent(data.recent);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="page-container">
      {/* Welcome section */}
      <div className="welcome-section">
        <h1>Admin Dashboard 🛡️</h1>
        <p>Overview of all complaints and system statistics.</p>
      </div>

      {/* Summary stat cards */}
      <div className="stats-grid">
        <StatCard icon="📋" value={stats.total} label="Total Complaints" color="#1e88e5" />
        <StatCard icon="⏳" value={stats.pending} label="Pending" color="#f59e0b" />
        <StatCard icon="🔄" value={stats.inProgress} label="In Progress" color="#3b82f6" />
        <StatCard icon="✅" value={stats.resolved} label="Resolved" color="#10b981" />
      </div>

      {/* CSS Bar Chart — Complaints by Category */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="card-header">
          <h3>Complaints by Category</h3>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", padding: "1rem", color: "var(--gray-400)" }}>Loading...</p>
        ) : categoryBreakdown.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem", color: "var(--gray-400)" }}>No data yet.</p>
        ) : (
          <div className="bar-chart">
            {categoryBreakdown.map((item) => (
              <div className="bar-chart-item" key={item._id}>
                <span className="bar-chart-label">{item._id}</span>
                <div className="bar-chart-track">
                  <div
                    className="bar-chart-fill"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  >
                    {item.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Complaints table */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Complaints</h3>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", padding: "1rem", color: "var(--gray-400)" }}>Loading...</p>
        ) : recent.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem", color: "var(--gray-400)" }}>
            No complaints submitted yet.
          </p>
        ) : (
          <div className="table-container" style={{ boxShadow: "none" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Citizen</th>
                  <th>Category</th>
                  <th>Title</th>
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
                    <td>{complaint.submittedByName}</td>
                    <td>{complaint.category}</td>
                    <td className="table-title">{complaint.title}</td>
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

export default AdminDashboard;
