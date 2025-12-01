import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div>
      {suggestions.map((elem, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              handleSuggestionClick(elem);
            }}
            className="flex gap-4 border-2 border-gray-100 active:border-black rounded-xl p-3 items-center justify-start my-3"
          >
            <h2 className="bg-[#eee] h-7 w-10 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
