/**
 * Socket module for rides service
 * 
 * In MONOLITH mode: Uses the root socket.js directly (internal function call)
 * In MICROSERVICE mode: Makes HTTP call to the gateway's socket-notify endpoint
 */

const axios = require("axios");

const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:3000";

/**
 * Send a message to a specific socket ID
 * In monolith mode, this calls the root socket directly
 * In microservice mode, this makes an HTTP call to the gateway
 */
module.exports.sendMessageToSocketId = async (socketId, message) => {
  // Try to use root socket first (monolith mode)
  try {
    const rootSocket = require("../../../socket");
    if (rootSocket && rootSocket.sendMessageToSocketId) {
      rootSocket.sendMessageToSocketId(socketId, message);
      return;
    }
  } catch (e) {
    // Not in monolith mode, fall through to HTTP call
  }

  // Microservice mode - make HTTP call to gateway
  try {
    await axios.post(`${GATEWAY_URL}/socket-notify`, {
      socketId,
      event: message.event,
      data: message.data,
    });
  } catch (error) {
    console.error("Error sending socket notification:", error.message);
  }
};
