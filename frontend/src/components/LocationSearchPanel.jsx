import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near nsp cafe, Delhi",
    "Maharaja Agrasen Institute of Technology, Delhi",
  ];
  return (
    <div>
      {locations.map((elem, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 border-gray-100 active:border-black rounded-xl p-3 items-center justify-start my-3"
          >
            <h2 className="bg-[#eee] h-7 w-10 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
