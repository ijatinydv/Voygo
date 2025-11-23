import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(captainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
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
          <h3 className="text-xl font-medium mb-3">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <h3 className="text-xl font-medium mb-3">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mb-3">
            Login
          </button>
        </form>
        <p className="text-center mb-6 text-lg font-medium">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600 cursor-pointer">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mb-5 flex justify-center items-center"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
