/**
 * ComplaintDetail.jsx
 * Admin page showing full details of a single complaint fetched from the API.
 * Status updates are persisted to the database via PUT /api/admin/complaints/:id/status.
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";

const ComplaintDetail = () => {
  const { id } = useParams(); // Get complaint ID from URL
  const navigate = useNavigate();

  // State for complaint data, status, and loading
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Available statuses for the update dropdown
  const statuses = ["Pending", "In Progress", "Resolved"];

  // Fetch the complaint detail from the API on mount
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await API.get(`/admin/complaints/${id}`);
        setComplaint(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching complaint:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  // Handle status update — persist to database
  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await API.put(`/admin/complaints/${id}/status`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <p style={{ textAlign: "center", padding: "3rem", color: "var(--gray-400)" }}>
          Loading complaint details...
        </p>
      </div>
    );
  }

  // Not found state
  if (notFound || !complaint) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Complaint Not Found</h2>
          <p style={{ color: "var(--gray-500)", marginBottom: "1.5rem" }}>
            The complaint ID "{id}" does not exist.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/complaints")}
          >
            Back to All Complaints
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Back navigation */}
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => navigate("/admin/complaints")}
        style={{ marginBottom: "1.5rem" }}
      >
        ← Back to All Complaints
      </button>

      {/* Complaint detail card */}
      <div className="complaint-detail-card">
        <h1>{complaint.title}</h1>

        {/* Detail grid with key info */}
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Complaint ID</span>
            <span className="detail-value" style={{ color: "var(--accent)", fontWeight: 600 }}>
              {complaint.complaintId}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Category</span>
            <span className="detail-value">{complaint.category}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{complaint.location}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Date Submitted</span>
            <span className="detail-value">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Submitted By</span>
            <span className="detail-value">{complaint.submittedByName}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Current Status</span>
            <span className="detail-value">
              <StatusBadge status={status} />
            </span>
          </div>
        </div>

        {/* Description section */}
        <div>
          <h3 style={{ fontSize: "0.9rem", color: "var(--gray-500)", marginBottom: "0.5rem" }}>
            DESCRIPTION
          </h3>
          <div className="detail-description">{complaint.description}</div>
        </div>

        {/* Status update section */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "var(--gray-50)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              fontWeight: 600,
              color: "var(--gray-700)",
              fontSize: "0.9rem",
            }}
          >
            Update Status:
          </label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            style={{ maxWidth: "200px" }}
            disabled={updating}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {updating && (
            <span style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
              Updating...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
