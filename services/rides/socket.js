const axios = require("axios");

const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:3000";

module.exports.sendMessageToSocketId = async (socketId, message) => {
  try {
    await axios.post(`${GATEWAY_URL}/socket-notify`, {
      socketId,
      event: message.event,
      data: message.data,
    });
  } catch (error) {
    console.error("Error sending socket notification:", error);
  }
};
