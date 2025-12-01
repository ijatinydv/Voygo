import React from "react";

const ConfirmRide = (props) => {
  const vehicleType = props.vehicleType;
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0 cursor-pointer"
        onClick={() => {
          props.setConfirmRidePanel(false);
          props.setVehiclePanel(true);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-xl font-medium">
                ₹{props.fare[vehicleType]}
              </h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
          <button
            onClick={() => {
              props.createRide();
              props.setVehicleFound(true);
              props.setConfirmRidePanel(false);
            }}
            className="mt-4 w-full bg-green-600 rounded-lg p-2 cursor-pointer text-lg text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
