const express = require("express");
const proxy = require("express-http-proxy");
require("dotenv").config();
const cors = require("cors");
const { notify } = require("./socket");

const app = express();

app.use(cors());
app.use(express.json());

// Service proxies
app.use(
  "/users",
  proxy(process.env.USER_SERVICE_URL, {
    proxyReqPathResolver: function (req) {
      return `/users${req.url}`;
    },
  })
);

app.use(
  "/captains",
  proxy(process.env.CAPTAINS_SERVICE_URL, {
    proxyReqPathResolver: function (req) {
      return `/captains${req.url}`;
    },
  })
);

app.use(
  "/rides",
  proxy(process.env.RIDES_SERVICE_URL, {
    proxyReqPathResolver: function (req) {
      return `/rides${req.url}`;
    },
  })
);

app.use(
  "/maps",
  proxy(process.env.RIDES_SERVICE_URL, {
    proxyReqPathResolver: function (req) {
      return `/maps${req.url}`;
    },
  })
);

app.post("/socket-notify", (req, res) => {
  const { socketId, event, data } = req.body;
  notify(socketId, event, data);
  res.status(200).json({ message: "Notification sent" });
});

module.exports = app;