import React, {FC} from "react"
import {Link, useLocation} from "react-router-dom"

export const NoMatch: FC = () => {
  const location = useLocation()
  return(
    <div
      className="h-full w-full flex flex-col items-center justify-center"
    >
      <span className="text-medium text-3xl mb-5">
        404
      </span>
      <span className="text-medium text-3xl mb-5">
        Page <span className="text-red-light" >{ location.pathname.substring(1) }</span> doesn&apos;t exist
      </span>
      <Link 
        to="/" 
        className="text-center text-xl rounded-full text-white bg-blue-bright hover:bg-blue-hover px-5 py-2"
      >
        Home
      </Link>
    </div>
  )
}