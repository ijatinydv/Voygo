import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  const FinishHandler = async () => {
    props.setFinishedRidePanel(false);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setFinishedRidePanel(false);
    }
    navigate("/home");
  };
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0 cursor-pointer"
        onClick={() => {
          props.setFinishedRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-xl">
        <div className="flex items-center gap-3">
          <img
            className="w-11 h-11 rounded-full object-cover"
            src="https://imgs.search.brave.com/fwp0gr42Nt9lSYWrHICN3stVnMkBCL8tYerrsIsFleU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NDgxODA1My9waG90/by95b3VuZy1pbmRp/YW4tZ2lybC1jbGlj/a2luZy1hLXNlbGZp/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bERxd2lINVYx/ZG5CYk9HSVZlcW56/LVExYW01eG9UU0lo/dWxLdjlySVNYND0"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullName.firstName +
              " " +
              props.ride?.user.fullName.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance}</h5>
      </div>
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
          <div className="mt-10">
            <button
              onClick={FinishHandler}
              className="mt-4 w-full flex justify-center items-center bg-green-600 rounded-lg p-2 cursor-pointer text-lg text-white font-semibold"
            >
              Finish Ride
            </button>
            <p className="mt-10 text-xs text-gray-600">
              Click on finish ride button if you have completed the payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
