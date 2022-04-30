import React, {FC, useEffect} from "react"
import {BrowserRouter as Routers, Route, Routes} from "react-router-dom"
import {Login} from "./login/login"
import {Home} from "./home/home"
import {User} from "./user/user"
import {SignUp} from "./login/sign-up"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../app/store"
import {getUser} from "../app/user-store/user.requests"

export const Router: FC = () => {
  const hasUser = useSelector<RootState>(state => state.user.hasData)
    
  const dispatch = useDispatch<AppDispatch>()
    
  useEffect(() => {
    if (!hasUser) {
      dispatch(getUser(localStorage.getItem("jwt")))
    }
  }, [])
    
  return(
    <Routers>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Routers>
  )
}