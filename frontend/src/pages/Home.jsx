import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding:24
      });
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding:0
      });
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative">
      <img
        src="https://ik.imagekit.io/raosahab/Screenshot_2025-11-22_085343-removebg-preview.png"
        alt=""
        className="w-30 absolute left-5 top-5"
      />
      <div className="h-screen w-screen">
        <img
          src="https://imgs.search.brave.com/pToz-Wc75oi6k8BWvFknE6YjADNc34pUQQYZlkQ7qqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbWFnZS1tYXAt/c3RyZWV0cy13aXRo/LXRydWNrc18yMDc2/MzQtMjE4MC5qcGc_/c2VtdD1haXNfaHli/cmlk"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className=" absolute bottom-0 h-screen w-screen flex flex-col justify-end ">
        <div className="h-[30%] bg-white p-5 w-full relative">
          <h5 ref={panelCloseRef} onClick={()=>setPanelOpen(false)} className="absolute top-5 right-5 text-2xl opacity-0">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[42%] left-10 bg-gray-900 rounded-full "></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white">
          <LocationSearchPanel/>
        </div>
      </div>
    </div>
  );
};

export default Home;
