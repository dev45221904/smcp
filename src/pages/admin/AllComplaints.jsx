/**
 * AllComplaints.jsx
 * Admin page showing all complaints fetched from GET /api/admin/complaints.
 * Supports filtering by category and status, and allows changing complaint
 * status via PUT /api/admin/complaints/:id/status (persisted to database).
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";

const AllComplaints = () => {
  const navigate = useNavigate();

  // State for complaints list and loading
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Available categories and statuses for filtering
  const categories = [
    "Sanitation", "Street Lighting", "Road Maintenance",
    "Water Supply", "Traffic", "Public Safety",
  ];
  const statuses = ["Pending", "In Progress", "Resolved"];

  // Fetch complaints from the API (with optional filters)
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterCategory) params.category = filterCategory;
      if (filterStatus) params.status = filterStatus;

      const { data } = await API.get("/admin/complaints", { params });
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchComplaints();
  }, [filterCategory, filterStatus]);

  // Handle status change — update in database via API
  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await API.put(`/admin/complaints/${complaintId}/status`, { status: newStatus });

      // Update local state to reflect the change immediately
      setComplaints((prev) =>
        prev.map((c) =>
          c.complaintId === complaintId ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header">
        <h1>All Complaints</h1>
        <p>View, filter, and manage all citizen complaints.</p>
      </div>

      {/* Filter controls */}
      <div className="filters-bar">
        <select
          className="form-control"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="form-control"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Complaints table */}
      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)" }}>
          Loading complaints...
        </p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Citizen Name</th>
                <th>Category</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)" }}>
                    No complaints match your filters.
                  </td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td
                      style={{ fontWeight: 600, color: "var(--accent)", cursor: "pointer" }}
                      onClick={() => navigate(`/admin/complaints/${complaint.complaintId}`)}
                    >
                      {complaint.complaintId}
                    </td>
                    <td>{complaint.submittedByName}</td>
                    <td>{complaint.category}</td>
                    <td className="table-title">{complaint.title}</td>
                    <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td>
                      <select
                        className="form-control"
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.complaintId, e.target.value)}
                        style={{ minWidth: "130px", padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllComplaints;
