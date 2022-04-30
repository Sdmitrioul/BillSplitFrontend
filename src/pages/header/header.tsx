import React, {FC} from "react"
import { UserShower } from "./user-shower"
import {Link} from "react-router-dom"
import {Links} from "./links"

export const Header: FC = () => {
  return(
    <header className="w-full px-4 py-3 flex align-center bg-blue-lighter text-white justify-between items-center">
      <Link to="/" className="text-2xl hover:text-blue-medium">BillSplitter</Link>
      <Links />
      <UserShower />
    </header>
  )
}