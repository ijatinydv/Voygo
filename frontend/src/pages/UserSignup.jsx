import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate("/home");
    }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };
  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img
          src="https://ik.imagekit.io/raosahab/Screenshot_2025-11-22_085343-removebg-preview.png"
          alt=""
          className="w-30 mb-5"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-3">What's your name</h3>
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

          <h3 className="text-lg font-medium mb-3">What's your email</h3>
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
            Create account
          </button>
        </form>
        <p className="text-center mb-5 text-xm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 cursor-pointer">
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

export default UserSignup;
