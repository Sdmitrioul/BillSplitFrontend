import React, {FC} from "react"
import { UserShower } from "./user-shower"

export const Header: FC = () => {
  return(
    <header className="w-full px-4 py-3 flex align-center bg-blue-lighter text-white justify-between items-center">
      <a href="/src/pages" className="text-2xl hover:text-blue-medium">BillSplitter</a>
      <UserShower />
    </header>
  )
}