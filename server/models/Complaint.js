/**
 * Complaint.js — Mongoose Model
 * Defines the Complaint schema with auto-generated complaint ID,
 * title, category, description, location, status, and reference to submitter.
 */

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // Auto-generated complaint ID like "CMP-2025-001"
    complaintId: {
      type: String,
      unique: true,
    },

    // Brief title for the complaint
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    // Complaint category
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Sanitation",
        "Street Lighting",
        "Road Maintenance",
        "Water Supply",
        "Traffic",
        "Public Safety",
      ],
    },

    // Detailed description of the issue
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    // Location of the issue
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    // Current status of the complaint
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    // Reference to the User who submitted this complaint
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Stored separately for quick display without populating
    submittedByName: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

/**
 * Pre-save middleware to auto-generate complaintId.
 * Format: CMP-YYYY-NNN (e.g., CMP-2025-001)
 */
complaintSchema.pre("save", async function (next) {
  if (!this.complaintId) {
    const year = new Date().getFullYear();

    // Count existing complaints for this year to determine the next number
    const count = await mongoose.model("Complaint").countDocuments();
    const nextNum = String(count + 1).padStart(3, "0");

    this.complaintId = `CMP-${year}-${nextNum}`;
  }
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
