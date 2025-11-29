import React from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";

const CaptainHome = () => {
  return (
    <div className="h-screen w-screen">
      <div className="fixed p-6 top-0 flex justify-between w-full items-center">
        <img
          className="w-20"
          src="https://ik.imagekit.io/raosahab/image-removebg-preview.png"
          alt=""
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full cursor-pointer"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 w-screen">
        <img
          src="https://imgs.search.brave.com/pToz-Wc75oi6k8BWvFknE6YjADNc34pUQQYZlkQ7qqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbWFnZS1tYXAt/c3RyZWV0cy13aXRo/LXRydWNrc18yMDc2/MzQtMjE4MC5qcGc_/c2VtdD1haXNfaHli/cmlk"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6 flex flex-col justify-between">
        <CaptainDetails />
      </div>
      <div className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white">
          
        </div>
    </div>
  );
};

export default CaptainHome;
