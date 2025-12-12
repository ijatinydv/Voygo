const express = require("express");
const proxy = require("express-http-proxy");
require("dotenv").config();
const cors = require("cors");

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

module.exports = app;