import React, {FC} from "react"

export const Header: FC = () => {
  return(
    <header className="w-full px-4 py-3 flex align-center bg-blue-lighter text-white justify-between items-center">
      <a href="/" className="text-2xl hover:text-blue-medium">BillSplitter</a>
      <div className="rounded-md bg-blue-bright hover:bg-blue-hover items-center p-2 cursor-pointer">
           Dmitrii Skroba
      </div>
    </header>
  )
}