import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {captain, setCaptain} = useContext(captainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setCaptain(response.data)
        setIsLoading(false)
      }
    })
    .catch(err => {
      localStorage.removeItem('token')
      navigate('/captain-login')
    })
  }, []);

  if(isLoading){
    return (
      <div className="h-screen w-full md:bg-gray-100 md:flex md:items-center md:justify-center">
        <div className="w-full h-screen md:w-[375px] md:h-[90vh] md:rounded-2xl md:shadow-2xl md:overflow-hidden bg-white relative flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
