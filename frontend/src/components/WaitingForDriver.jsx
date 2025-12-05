import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0 cursor-pointer"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{props.ride?.captain.fullName.firstName + " " + props.ride?.captain.fullName.lastName}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Fortuner legender</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mt-4"> OTP : {props.ride?.otp}</h1>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-xl font-medium">{props.ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-xl font-medium">{props.ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-xl font-medium">₹{props.ride?.fare}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
