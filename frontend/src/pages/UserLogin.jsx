import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen w-full md:bg-gray-100 md:flex md:items-center md:justify-center">
      <div className="w-full h-screen md:w-[375px] md:h-[90vh] md:rounded-2xl md:shadow-2xl md:overflow-hidden bg-white relative">
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <img
              src="https://ik.imagekit.io/raosahab/Screenshot_2025-11-22_085343-removebg-preview.png"
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
                className="bg-[#eeeeee] -lg px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
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
              New here?{" "}
              <Link to="/signup" className="text-blue-600 cursor-pointer">
                Create new account
              </Link>
            </p>
          </div>
          <div>
            <Link
              to="/captain-login"
              className="bg-[#10b461] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mb-5 flex justify-center items-center"
            >
              Sign in as Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
