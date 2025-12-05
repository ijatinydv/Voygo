const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  console.log(distanceTime);

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value * perKmRate.auto) / 1000 +
        (distanceTime.duration.value * perMinuteRate.auto) / 60
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value * perKmRate.car) / 1000 +
        (distanceTime.duration.value * perMinuteRate.car) / 60
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value * perKmRate.motorcycle) / 1000 +
        (distanceTime.duration.value * perMinuteRate.motorcycle) / 60
    ),
  };
  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  console.log(fare);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId) {
    throw new Error("RideId is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captainId,
    }
  );

  const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};
