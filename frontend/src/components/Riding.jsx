import React from "react";
import { Link, useLocation } from "react-router-dom";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};

  return (
    <div className="h-screen w-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2 cursor-pointer"
      >
        <i className="text-lg font-medium ri-home-line"></i>
      </Link>
      <div className="h-1/2 w-screen">
        <img
          src="https://imgs.search.brave.com/pToz-Wc75oi6k8BWvFknE6YjADNc34pUQQYZlkQ7qqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbWFnZS1tYXAt/c3RyZWV0cy13aXRo/LXRydWNrc18yMDc2/MzQtMjE4MC5qcGc_/c2VtdD1haXNfaHli/cmlk"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride?.captain.fullName.firstName +
                " " +
                ride?.captain.fullName.lastName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Fortuner legender</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-xl font-medium">{ride?.destination}</h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-xl font-medium">₹{ride?.fare}</h3>
                <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-4 mb-4 w-full bg-green-600 rounded-lg p-2 cursor-pointer text-lg text-white font-semibold">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
