const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const CAPTAIN_SERVICE_URL = process.env.CAPTAIN_SERVICE_URL;

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

    const userResponse = await axios.get(`${USER_SERVICE_URL}/${req.user._id}`);
    const user = userResponse.data;

    const rideWithUser = {
      ...ride.toObject(),
      user: user,
    };

    res.status(200).json(rideWithUser);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      1000
    );

    const rideDataForCaptain = {
      ...rideWithUser,
      otp: "",
    };

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideDataForCaptain,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, captainId } = req.body;

  try {
    const ride = await rideService.confirmRide({ rideId, captainId });

    const userResponse = await axios.get(`${USER_SERVICE_URL}/${ride.user}`);
    const user = userResponse.data;

    const captainResponse = await axios.get(`${CAPTAIN_SERVICE_URL}/${captainId}`);
    const captain = captainResponse.data;

    const rideData = {
      ...ride.toObject(),
      user: user,
      captain: captain,
    };

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: rideData,
    });

    return res.status(200).json(rideData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captainId: req.captain._id,
    });
    
    const userResponse = await axios.get(`${USER_SERVICE_URL}/${ride.user}`);
    const user = userResponse.data;

    const captainResponse = await axios.get(`${CAPTAIN_SERVICE_URL}/${req.captain._id}`);
    const captain = captainResponse.data;

    const rideData = {
      ...ride.toObject(),
      user: user,
      captain: captain,
    };

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: rideData,
    });

    return res.status(200).json(rideData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({
      rideId,
      captainId: req.captain._id,
    });

    const userResponse = await axios.get(`${USER_SERVICE_URL}/${ride.user}`);
    const user = userResponse.data;

    const captainResponse = await axios.get(`${CAPTAIN_SERVICE_URL}/${req.captain._id}`);
    const captain = captainResponse.data;

    const rideData = {
      ...ride.toObject(),
      user: user,
      captain: captain,
    };

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: rideData,
    });

    return res.status(200).json(rideData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
