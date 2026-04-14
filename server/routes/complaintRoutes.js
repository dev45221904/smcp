/**
 * complaintRoutes.js
 * Routes for user complaint operations (all protected).
 * POST /api/complaints — submit a new complaint
 * GET  /api/complaints/my — get current user's complaints
 * GET  /api/complaints/stats — get current user's complaint statistics
 */

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  submitComplaint,
  getMyComplaints,
  getMyStats,
} = require("../controllers/complaintController");

// All routes require authentication
router.post("/", protect, submitComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/stats", protect, getMyStats);

module.exports = router;
