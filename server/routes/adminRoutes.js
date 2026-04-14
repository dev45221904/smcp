/**
 * adminRoutes.js
 * Routes for admin operations (protected + admin role required).
 * GET  /api/admin/stats — admin dashboard statistics
 * GET  /api/admin/complaints — all complaints with optional filters
 * GET  /api/admin/complaints/:id — single complaint detail
 * PUT  /api/admin/complaints/:id/status — update complaint status
 */

const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  getAdminStats,
} = require("../controllers/adminController");

// All routes require authentication + admin role
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/complaints", protect, adminOnly, getAllComplaints);
router.get("/complaints/:id", protect, adminOnly, getComplaintById);
router.put("/complaints/:id/status", protect, adminOnly, updateComplaintStatus);

module.exports = router;
