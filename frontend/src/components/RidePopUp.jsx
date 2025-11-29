import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0 cursor-pointer"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-xl">
        <div className="flex items-center gap-3">
          <img
            className="w-11 h-11 rounded-full object-cover"
            src="https://imgs.search.brave.com/fwp0gr42Nt9lSYWrHICN3stVnMkBCL8tYerrsIsFleU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NDgxODA1My9waG90/by95b3VuZy1pbmRp/YW4tZ2lybC1jbGlj/a2luZy1hLXNlbGZp/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bERxd2lINVYx/ZG5CYk9HSVZlcW56/LVExYW01eG9UU0lo/dWxLdjlySVNYND0"
            alt=""
          />
          <h2 className="text-lg font-medium">RaoSahabni 2.O</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
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
          <button
            onClick={() => props.setConfirmRidePopUpPanel(true)}
            className="mt-4 w-full bg-green-600 rounded-lg p-2 cursor-pointer text-lg text-white font-semibold"
          >
            Accept
          </button>
          <button
            onClick={() => props.setRidePopUpPanel(false)}
            className="mt-3 w-full bg-gray-300 rounded-lg p-2 cursor-pointer text-lg text-gray-700 font-semibold"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
