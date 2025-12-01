import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0"
        onClick={() => props.setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black border-white rounded-xl mb-2"
        onClick={() => {
          props.setVehicleType("car");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="w-16"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-1/2 -ml-1">
          <h4 className="font-medium ">
            Voygo Premium{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable, Premium rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black border-white rounded-xl mb-2"
        onClick={() => {
          props.setVehicleType("motorcycle");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="w-16"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          alt=""
        />
        <div className="w-1/2 -ml-4">
          <h4 className="font-medium ">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.motorcycle}</h2>
      </div>
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black border-white rounded-xl mb-2"
        onClick={() => {
          props.setVehicleType("auto");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="w-16"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          alt=""
        />
        <div className="w-1/2 -ml-1">
          <h4 className="font-medium ">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">4 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
