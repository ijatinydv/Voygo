import React, { createContext, useState } from 'react'

export const captainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)

    const value = {
        captain,
        setCaptain,
    };

  return (
    <>
        <captainDataContext.Provider value={value}>
            {children}
        </captainDataContext.Provider>
    </>
  )
}

export default CaptainContext