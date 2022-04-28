import React, {FC} from "react"
import {BrowserRouter as Routers, Route, Routes} from "react-router-dom"
import {Login} from "./login/Login"
import {Home} from "./home/Home"
import {User} from "./user/User"

export const Router: FC = () => {
  return(
    <Routers>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Routers>
  )
}