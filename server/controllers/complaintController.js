/**
 * complaintController.js
 * Handles complaint operations for regular users:
 * - Submit a new complaint
 * - Get current user's complaints
 * - Get current user's complaint stats
 */

const Complaint = require("../models/Complaint");

/**
 * POST /api/complaints
 * Submit a new complaint (authenticated user only)
 */
const submitComplaint = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;

    // Validate required fields
    if (!title || !category || !description || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the complaint linked to the current user
    const complaint = await Complaint.create({
      title,
      category,
      description,
      location,
      submittedBy: req.user._id,
      submittedByName: req.user.name,
    });

    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaint: {
        complaintId: complaint.complaintId,
        title: complaint.title,
        category: complaint.category,
        status: complaint.status,
        createdAt: complaint.createdAt,
      },
    });
  } catch (error) {
    console.error("Submit complaint error:", error.message);
    res.status(500).json({ message: "Server error while submitting complaint." });
  }
};

/**
 * GET /api/complaints/my
 * Get all complaints submitted by the current user (sorted by newest first)
 */
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ submittedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get my complaints error:", error.message);
    res.status(500).json({ message: "Server error while fetching complaints." });
  }
};

/**
 * GET /api/complaints/stats
 * Get complaint statistics for the current user
 */
const getMyStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Count complaints by status for the current user
    const total = await Complaint.countDocuments({ submittedBy: userId });
    const pending = await Complaint.countDocuments({ submittedBy: userId, status: "Pending" });
    const inProgress = await Complaint.countDocuments({ submittedBy: userId, status: "In Progress" });
    const resolved = await Complaint.countDocuments({ submittedBy: userId, status: "Resolved" });

    // Get 5 most recent complaints for the dashboard
    const recent = await Complaint.find({ submittedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: { total, pending, inProgress, resolved },
      recent,
    });
  } catch (error) {
    console.error("Get stats error:", error.message);
    res.status(500).json({ message: "Server error while fetching stats." });
  }
};

module.exports = { submitComplaint, getMyComplaints, getMyStats };
