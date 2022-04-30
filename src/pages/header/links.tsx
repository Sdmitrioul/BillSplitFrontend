import React, {FC} from "react"
import {Link, useLocation} from "react-router-dom"
import {Point} from "../../components/point"
import classNames from "classnames"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {HeaderLinks} from "./header.constants"

export const Links: FC = () => {
  const hasUser = useSelector<RootState>(state => state.user.hasData)
  const location = useLocation()

  if (!hasUser) return null

  return(
    <div className="flex flex-1 mx-8 items-center w-max-[800px] font-medium">
      {Object.entries(HeaderLinks).map((value, index) => (<Link
        to={`/${value[1]}`}
        key={value[1]}
        className={classNames("flex items-center", 
          index !== 0 && "ml-4",
          location.pathname === `/${value[1]}` && "text-red-secondary")}
      >
        <Point classname="mr-2" />
        {value[0]}
      </Link>))}
    </div>
  )
}