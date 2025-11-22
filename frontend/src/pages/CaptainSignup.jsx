import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
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
          <h3 className="text-lg font-medium mb-3">What's our Captain's name</h3>
          <div className="flex gap-3 mb-6">
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

          <h3 className="text-lg font-medium mb-3">What's our Captain's email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-6"
          />
          <h3 className="text-lg font-medium mb-3">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-6"
          />
          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mb-3">
            Register
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
