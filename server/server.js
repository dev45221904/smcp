/**
 * server.js
 * Main entry point for the Express.js backend.
 * - Connects to MongoDB
 * - Sets up CORS, JSON parsing
 * - Mounts API routes
 * - Seeds a default admin account on first run
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

// Load environment variables from .env file
dotenv.config();

// Import route files
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize Express app
const app = express();

// ===== MIDDLEWARE =====

// Enable CORS for the React frontend (Vite dev server on port 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

// Simple health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SMCP Backend is running!" });
});

// ===== SEED DEFAULT ADMIN =====
/**
 * Creates a default admin account if one doesn't exist yet.
 * Credentials: admin@city.com / admin123
 */
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@city.com" });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      await User.create({
        name: "Admin",
        email: "admin@city.com",
        phone: "",
        password: hashedPassword,
        role: "admin",
      });

      console.log("🔐 Default admin account created (admin@city.com / admin123)");
    } else {
      console.log("🔐 Admin account already exists");
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Seed the default admin account
  await seedAdmin();

  // Start listening for requests
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  });
};

startServer();
