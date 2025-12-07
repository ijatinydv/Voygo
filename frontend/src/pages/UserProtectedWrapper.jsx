import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(!token){
        navigate('/login')
    }
    },[token])

    useEffect(() => {
      if (!token) return;

      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.status === 200) {
          setUser(response.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        localStorage.removeItem('token')
        navigate('/login')
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

  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper