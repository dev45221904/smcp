/**
 * User.js — Mongoose Model
 * Defines the User schema with name, email, phone, password (hashed), and role.
 * Used for both regular users and admin accounts.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Email address (must be unique)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Phone number (optional for admin)
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // Hashed password
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Role: either "user" or "admin"
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
