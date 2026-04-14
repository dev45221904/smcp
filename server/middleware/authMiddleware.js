/**
 * authMiddleware.js
 * Middleware functions for JWT token verification and role-based access control.
 * - protect: verifies the JWT token from the Authorization header
 * - adminOnly: ensures the authenticated user has the "admin" role
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect — Verifies the JWT token and attaches the user to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header (format: "Bearer <token>")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * adminOnly — Checks that the authenticated user has the "admin" role
 * Must be used AFTER the protect middleware
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, adminOnly };
