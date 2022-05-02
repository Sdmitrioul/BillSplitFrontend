import React, {FC} from "react"
import {useAuthorized} from "../utils/hooks/useAuthorized"
import {Navigate} from "react-router-dom"

interface IProtectedRouteProp {
    children: React.ReactNode
}

export const ProtectedRoute: FC<IProtectedRouteProp> = ({ children }) => {
  const authorized = useAuthorized()
  
  if (!authorized) {
    return <Navigate to={"/home"}  replace />
  }
    
  return(
    <>
      { children }
    </>
  )
}