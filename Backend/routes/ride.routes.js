const express = require("express");
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination Address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicleType"),
  rideController.createRide
);

module.exports = router;
