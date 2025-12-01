const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
