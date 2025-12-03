import React,{useContext} from "react";
import {captainDataContext} from "../context/CaptainContext"

const CaptainDetails = () => {
  const {captain} = useContext(captainDataContext)
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-start gap-4">
          <img
            className="w-11 rounded-full h-11 object-cover"
            src="https://imgs.search.brave.com/HcOsG-F8M33AfmSy-SRJUOI0agp_YCqYqQXQ53AEOI4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/NTMxNDE0Ni9waG90/by95b3VuZy13b21h/bi10YWtpbmctYS1z/ZWxmaWUtaW4tbWV0/cm9wb2xpdGFuLXBh/cmstd2l0aC1hLXZp/ZXctdG8tZmluYW5j/aWFsLWRpc3RyaWN0/LW4tc2FudGlhZ28u/d2VicD9hPTEmYj0x/JnM9NjEyeDYxMiZ3/PTAmaz0yMCZjPS1Z/cFBuSkVYRnR1YmFG/QVVVcVF5NEV3TTZ3/NU9qc3J5RjlqNnd4/VnNvMk09"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullName.firstName + " " + captain.fullName.lastName}</h4>
        </div>
        <div>
          <h5 className="text-xl font-semibold">₹205.12</h5>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="p-3 bg-gray-100 rounded-xl flex justify-evenly items-start gap-5 h-full">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium mb-1">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium mb-1">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium mb-1">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
