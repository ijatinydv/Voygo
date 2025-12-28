/**
 * Voygo Modular Monolith - Super Server
 * 
 * This is the unified entry point that combines all microservices
 * (users, captains, rides) into a single Express application.
 * 
 * Architecture:
 * - Single Express app mounts all routes
 * - Single MongoDB connection (shared across all modules)
 * - Centralized Socket.io for real-time communication
 * - Service-to-service calls loop back to localhost:3000
 */

require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Import route handlers from each service
const userRoutes = require("./services/users/routes/user.routes");
const captainRoutes = require("./services/captains/routes/captain.routes");
const rideRoutes = require("./services/rides/routes/ride.routes");
const mapsRoutes = require("./services/rides/routes/maps.routes");

// Import centralized socket handler
const { initializeSocket, notify } = require("./socket");

const app = express();

// ======================
// Middleware Setup
// ======================
const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// Database Connection
// ======================
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

// ======================
// Mount Service Routes
// ======================

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    service: "voygo-monolith",
    timestamp: new Date().toISOString()
  });
});

// User Service Routes - /users/*
app.use("/users", userRoutes);

// Captain Service Routes - /captains/*
app.use("/captains", captainRoutes);

// Ride Service Routes - /rides/*
app.use("/rides", rideRoutes);

// Maps Service Routes - /maps/*
app.use("/maps", mapsRoutes);

// Socket notification endpoint (internal use)
// This allows services to send socket notifications
app.post("/socket-notify", (req, res) => {
  const { socketId, event, data } = req.body;
  notify(socketId, event, data);
  res.status(200).json({ message: "Notification sent" });
});

// ======================
// Error Handling
// ======================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ======================
// Server Initialization
// ======================
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to database first
  await connectToDB();

  // Create HTTP server
  const server = http.createServer(app);

  // Initialize Socket.io
  initializeSocket(server);

  // Start listening
  server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚗 Voygo Modular Monolith Server Started               ║
║                                                           ║
║   Port: ${PORT}                                            ║
║   Environment: ${process.env.NODE_ENV || "development"}                          ║
║                                                           ║
║   Routes:                                                 ║
║   - /users/*     → User Service                          ║
║   - /captains/*  → Captain Service                       ║
║   - /rides/*     → Ride Service                          ║
║   - /maps/*      → Maps Service                          ║
║   - /health      → Health Check                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
  });
};

startServer().catch(console.error);

module.exports = app;
