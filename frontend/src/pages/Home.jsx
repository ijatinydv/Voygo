import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const showBranding = !panelOpen;

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const Navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userId: user._id, userType: "user" });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    Navigate("/riding", { state: { ride } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    const q = e.target.value;
    setPickup(q);
    if (!q || q.trim().length <= 2) {
      setPickupSuggestions([2]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestinationChange = async (e) => {
    const q = e.target.value;
    setDestination(q);
    if (!q || q.trim().length <= 2) {
      setPickupSuggestions([2]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  async function findTrip() {
    if (pickup && destination) {
      setVehiclePanel(true);
      setPanelOpen(false);
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {showBranding && (
        <img
          src="https://ik.imagekit.io/raosahab/Screenshot_2025-11-22_085343-removebg-preview.png"
          alt="Voygo"
          className="w-30 absolute left-5 top-5 z-10 pointer-events-none"
        />
      )}
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className="absolute bottom-0 h-screen w-screen flex flex-col justify-end pointer-events-none">
        <div className="h-[30%] bg-white p-5 w-full relative pointer-events-auto">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-5 right-5 text-2xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line cursor-pointer"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[42%] left-10 bg-gray-900 rounded-full "></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-xl font-medium mt-3 w-full cursor-pointer text-xm"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white pointer-events-auto">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
        {vehiclePanel && (
          <div className="fixed w-full z-10 bottom-0 px-3 py-10 pt-12 bg-white pointer-events-auto">
            <VehiclePanel
              setVehicleType={setVehicleType}
              fare={fare}
              setVehiclePanel={setVehiclePanel}
              setConfirmRidePanel={setConfirmRidePanel}
            />
          </div>
        )}
        {confirmRidePanel && (
          <div className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white pointer-events-auto">
            <ConfirmRide
              pickup={pickup}
              destination={destination}
              vehicleType={vehicleType}
              createRide={createRide}
              fare={fare}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanel={setVehiclePanel}
              setVehicleFound={setVehicleFound}
            />
          </div>
        )}
        {vehicleFound && (
          <div className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white pointer-events-auto">
            <LookingForDriver
              pickup={pickup}
              destination={destination}
              vehicleType={vehicleType}
              fare={fare}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehicleFound={setVehicleFound}
            />
          </div>
        )}
        {waitingForDriver && (
          <div className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white pointer-events-auto">
            <WaitingForDriver
              ride={ride}
              setWaitingForDriver={setWaitingForDriver}
              setConfirmRidePanel={setConfirmRidePanel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
