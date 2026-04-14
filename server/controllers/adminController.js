/**
 * adminController.js
 * Handles admin-specific operations:
 * - Get all complaints (with optional filters)
 * - Get a single complaint by ID
 * - Update complaint status
 * - Get admin dashboard stats + category breakdown
 */

const Complaint = require("../models/Complaint");

/**
 * GET /api/admin/complaints
 * Get all complaints with optional category and status filters
 */
const getAllComplaints = async (req, res) => {
  try {
    const { category, status } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get all complaints error:", error.message);
    res.status(500).json({ message: "Server error while fetching complaints." });
  }
};

/**
 * GET /api/admin/complaints/:id
 * Get a single complaint by its complaintId (e.g., CMP-2025-001)
 */
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ complaintId: req.params.id });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Get complaint by ID error:", error.message);
    res.status(500).json({ message: "Server error while fetching complaint." });
  }
};

/**
 * PUT /api/admin/complaints/:id/status
 * Update the status of a complaint
 */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate the new status
    const validStatuses = ["Pending", "In Progress", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: req.params.id },
      { status },
      { new: true } // Return the updated document
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.json({
      message: "Status updated successfully!",
      complaint,
    });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ message: "Server error while updating status." });
  }
};

/**
 * GET /api/admin/stats
 * Get admin dashboard statistics and category breakdown
 */
const getAdminStats = async (req, res) => {
  try {
    // Overall complaint counts
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    // Count complaints by category using aggregation
    const categoryBreakdown = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get 5 most recent complaints
    const recent = await Complaint.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: { total, pending, inProgress, resolved },
      categoryBreakdown,
      recent,
    });
  } catch (error) {
    console.error("Get admin stats error:", error.message);
    res.status(500).json({ message: "Server error while fetching stats." });
  }
};

module.exports = { getAllComplaints, getComplaintById, updateComplaintStatus, getAdminStats };
