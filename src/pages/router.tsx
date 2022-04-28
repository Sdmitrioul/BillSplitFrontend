import React, {FC} from "react"
import {BrowserRouter as Routers, Route, Routes} from "react-router-dom"
import {Login} from "./login/login"
import {Home} from "./home/home"
import {User} from "./user/user"
import {SignUp} from "./login/sign-up"

export const Router: FC = () => {
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