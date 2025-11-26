import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0 cursor-pointer"
        onClick={() => {
          props.setVehicleFound(false);
          props.setConfirmRidePanel(true);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>
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
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1">NSP, Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1">NSP, Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-xl font-medium">₹193.2</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
