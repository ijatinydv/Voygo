import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://ik.imagekit.io/raosahab/homeimg.png)] pt-5 h-screen w-full flex flex-col justify-between">
        <img
          src="https://ik.imagekit.io/raosahab/Screenshot_2025-11-22_085343-removebg-preview.png"
          alt=""
          className="ml-5 w-30"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get started with Voygo</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg text-lg font-medium mt-6"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
