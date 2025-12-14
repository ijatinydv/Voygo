const { Server } = require("socket.io");
const axios = require("axios");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const USER_SERVICE_URL =
    process.env.USER_SERVICE_URL || "http://localhost:3001";
  const CAPTAIN_SERVICE_URL =
    process.env.CAPTAIN_SERVICE_URL || "http://localhost:3002";

  io.on("connection", (socket) => {
    console.log(`Client connected : ${socket.id}`);

    // Handle user or captain joining
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      try {
        if (userType === "user") {
          await axios.patch(`${USER_SERVICE_URL}/users/${userId}`, {
            socketId: socket.id,
          });
        } else if (userType === "captain") {
          await axios.patch(`${CAPTAIN_SERVICE_URL}/captains/${userId}`, {
            socketId: socket.id,
          });
        }
      } catch (error) {
        console.error("Error updating socket ID:", error);
      }
    });

    // Handle captain location updates
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return;
      }
      try {
        await axios.patch(`${CAPTAIN_SERVICE_URL}/captains/${userId}`, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected : ${socket.id}`);
    });
  });
};

const notify = (socketId, event, data) => {
  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.log("Socket.io not initialized");
  }
};

module.exports = { initializeSocket, notify };
