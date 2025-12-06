import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishedRidePanel, setFinishedRidePanel] = useState(false);
  const finishedRidePanelRef = useRef(null);
  const location = useLocation();
  const { ride } = location.state || {};

  useGSAP(() => {
    if (finishedRidePanel) {
      gsap.to(finishedRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishedRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishedRidePanel]);

  return (
    <div className="h-screen w-screen">
      <div className="fixed p-6 top-0 flex justify-between w-full items-center">
        <img
          className="w-20"
          src="https://ik.imagekit.io/raosahab/image-removebg-preview.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full cursor-pointer"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 w-screen">
        <img
          src="https://imgs.search.brave.com/pToz-Wc75oi6k8BWvFknE6YjADNc34pUQQYZlkQ7qqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbWFnZS1tYXAt/c3RyZWV0cy13aXRo/LXRydWNrc18yMDc2/MzQtMjE4MC5qcGc_/c2VtdD1haXNfaHli/cmlk"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div
        className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative"
        onClick={() => setFinishedRidePanel(true)}
      >
        <h5
          className="p-1 text-center absolute w-[88%] top-0 cursor-pointer"
          onClick={() => {}}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-medium">4 KM away</h4>
        <button className="bg-green-600 rounded-lg py-2 px-8 cursor-pointer text-lg text-white font-semibold">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishedRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white"
      >
        <FinishRide setFinishedRidePanel={setFinishedRidePanel} ride={ride} />
      </div>
    </div>
  );
};

export default CaptainRiding;
