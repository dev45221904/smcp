/**
 * MyComplaints.jsx
 * Displays the logged-in user's complaints fetched from GET /api/complaints/my.
 * Clicking a complaint row opens a modal with full complaint details.
 */

import { useState, useEffect } from "react";
import API from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";

const MyComplaints = () => {
  // State for complaints list, selected complaint modal, and loading
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's complaints from the API on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await API.get("/complaints/my");
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Open the detail modal for a complaint
  const openModal = (complaint) => setSelectedComplaint(complaint);

  // Close the detail modal
  const closeModal = () => setSelectedComplaint(null);

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header">
        <h1>My Complaints</h1>
        <p>View and track all complaints you have submitted.</p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)" }}>
          Loading complaints...
        </p>
      ) : complaints.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--gray-400)", fontSize: "1.1rem" }}>
            You haven't submitted any complaints yet.
          </p>
        </div>
      ) : (
        /* Complaints table */
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  onClick={() => openModal(complaint)}
                  style={{ cursor: "pointer" }}
                >
                  <td style={{ fontWeight: 600, color: "var(--accent)" }}>
                    {complaint.complaintId}
                  </td>
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

      {/* Complaint detail modal */}
      {selectedComplaint && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedComplaint.title}</h2>

            <div className="detail-row">
              <span className="detail-label">Complaint ID:</span>
              <span className="detail-value" style={{ color: "var(--accent)", fontWeight: 600 }}>
                {selectedComplaint.complaintId}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{selectedComplaint.category}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{selectedComplaint.location}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">
                {new Date(selectedComplaint.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">
                <StatusBadge status={selectedComplaint.status} />
              </span>
            </div>

            <div className="detail-row" style={{ flexDirection: "column", gap: "0.5rem" }}>
              <span className="detail-label">Description:</span>
              <p style={{ color: "var(--gray-700)", lineHeight: 1.7 }}>
                {selectedComplaint.description}
              </p>
            </div>

            <div className="modal-close">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
