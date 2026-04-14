/**
 * authRoutes.js
 * Routes for user authentication: register and login.
 * POST /api/auth/register — create a new user account
 * POST /api/auth/login — login and receive a JWT token
 */

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Register a new user
router.post("/register", registerUser);

// Login (used by both user and admin)
router.post("/login", loginUser);

module.exports = router;
