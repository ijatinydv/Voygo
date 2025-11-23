import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(captainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };

  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img
          src="https://ik.imagekit.io/raosahab/image-removebg-preview.png"
          alt=""
          className="w-30 mb-5"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-3">
            What's our Captain's name
          </h3>
          <div className="flex gap-3 mb-5">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="firstName"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="lastName"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
            />
          </div>

          <h3 className="text-lg font-medium mb-3">
            What's our Captain's email
          </h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5"
          />

          <h3 className="text-lg font-medium mb-3">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5"
          />

          <h3 className="text-lg font-medium mb-3">Vehicle Information</h3>
          <div className="flex gap-5 mb-3">
            <input
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base "
            />
            <input
              required
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base "
            />
          </div>

          <div className="flex gap-5 mb-5">
            <input
              required
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base "
            />
            <select
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mb-3">
            Create Captain Account
          </button>
        </form>
        <p className="text-center mb-5 text-xm font-medium">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600 cursor-pointer">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
