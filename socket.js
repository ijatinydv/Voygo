/**
 * Voygo Centralized Socket.io Handler
 * 
 * This module manages all real-time WebSocket communication
 * for the modular monolith. It handles:
 * - User and Captain connections
 * - Location updates for captains
 * - Ride notifications
 * 
 * In the monolith architecture, socket calls are internal
 * and don't need to go through HTTP - we can call notify() directly.
 */

const { Server } = require("socket.io");
const mongoose = require("mongoose");

// Import models directly for the monolith
// These will be available after mongoose connection is established
let userModel, captainModel;

// Lazy load models to avoid circular dependency issues
const getModels = () => {
  if (!userModel) {
    userModel = require("./services/users/models/user.model");
  }
  if (!captainModel) {
    captainModel = require("./services/captains/models/captain.model");
  }
  return { userModel, captainModel };
};

let io;

/**
 * Initialize Socket.io server
 * @param {http.Server} server - HTTP server instance
 */
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    /**
     * Handle user or captain joining
     * Updates the socketId in the database for the connected user/captain
     */
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      
      if (!userId || !userType) {
        console.error("Join event missing userId or userType");
        return;
      }

      try {
        const { userModel, captainModel } = getModels();

        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`👤 User ${userId} joined with socket ${socket.id}`);
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`🚗 Captain ${userId} joined with socket ${socket.id}`);
        }
      } catch (error) {
        console.error("Error updating socket ID:", error.message);
      }
    });

    /**
     * Handle captain location updates
     * Updates the captain's current location in the database
     */
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!userId || !location || !location.ltd || !location.lng) {
        console.error("Location update missing required fields");
        return;
      }

      try {
        const { captainModel } = getModels();

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error.message);
      }
    });

    /**
     * Handle client disconnect
     */
    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  console.log("✅ Socket.io initialized");
};

/**
 * Send a notification to a specific socket
 * @param {string} socketId - Target socket ID
 * @param {string} event - Event name
 * @param {object} data - Data to send
 */
const notify = (socketId, event, data) => {
  if (io) {
    io.to(socketId).emit(event, data);
    console.log(`📤 Notification sent to ${socketId}: ${event}`);
  } else {
    console.error("Socket.io not initialized - cannot send notification");
  }
};

/**
 * Send a message to a specific socket
 * This is the function used by ride.controller via the socket module
 * @param {string} socketId - Target socket ID  
 * @param {object} message - Message object with event and data properties
 */
const sendMessageToSocketId = (socketId, message) => {
  if (io && socketId) {
    io.to(socketId).emit(message.event, message.data);
    console.log(`📤 Message sent to ${socketId}: ${message.event}`);
  } else {
    console.error("Socket.io not initialized or socketId missing");
  }
};

/**
 * Get the Socket.io server instance
 * @returns {Server} Socket.io server instance
 */
const getIO = () => io;

module.exports = { 
  initializeSocket, 
  notify, 
  sendMessageToSocketId,
  getIO 
};
