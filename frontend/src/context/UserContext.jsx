import React, { useState } from 'react'
import { createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)
     const value = {
        user,
        setUser,
    };
  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext