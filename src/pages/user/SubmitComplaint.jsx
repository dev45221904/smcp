/**
 * SubmitComplaint.jsx
 * Form page for users to submit a new complaint via POST /api/complaints.
 * On success, displays the real complaint ID returned from the backend.
 */

import { useState } from "react";
import API from "../../api/axios";

const SubmitComplaint = () => {
  // Form field states
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
  });

  // Success, error, and loading states
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  // Available complaint categories
  const categories = [
    "Sanitation",
    "Street Lighting",
    "Road Maintenance",
    "Water Supply",
    "Traffic",
    "Public Safety",
  ];

  // Update form field values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission — send complaint to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.category || !formData.title || !formData.description || !formData.location) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Send complaint data to the backend
      const { data } = await API.post("/complaints", formData);

      // Show success with the real complaint ID from the database
      setComplaintId(data.complaint.complaintId);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form to submit another complaint
  const handleReset = () => {
    setFormData({ category: "", title: "", description: "", location: "" });
    setSubmitted(false);
    setComplaintId("");
  };

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header">
        <h1>Submit a Complaint</h1>
        <p>Report a civic issue in your area and we'll look into it.</p>
      </div>

      <div className="card" style={{ maxWidth: "700px" }}>
        {/* Success message after submission */}
        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ marginBottom: "0.5rem" }}>Complaint Submitted!</h2>
            <p style={{ color: "var(--gray-500)", marginBottom: "1rem" }}>
              Your complaint has been registered successfully.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--accent)",
                background: "var(--status-progress-bg)",
                display: "inline-block",
                padding: "0.5rem 1.5rem",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Complaint ID: {complaintId}
            </p>
            <div style={{ marginTop: "2rem" }}>
              <button className="btn btn-primary" onClick={handleReset}>
                Submit Another Complaint
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Error message */}
            {error && <div className="alert alert-error">⚠️ {error}</div>}

            {/* Complaint form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Brief title for your complaint"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Describe the issue in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g., Main Road, Sector 5"
                  value={formData.location}
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
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitComplaint;
