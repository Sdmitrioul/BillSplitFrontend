import React, {FC} from "react"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {UserStore} from "../login/user-store"

export const UserShower: FC = () => {
  const {hasData, user} = useSelector<RootState, UserStore>((state) => state.user)

  return(
    <>
      {hasData && (
        <div>
          <a className="">{user?.name}</a>
        </div>
      )}

      {!hasData && (
        <div className="flex p-2">
          <a 
            className="mr-2 text-center text-blue-dark border-solid border-[1px] border-blue-dark" 
            href="/login"
          >
            Sign In
          </a>
          <a className="text-center text-white" href="/signup">Sign Up</a>
        </div>
      )}
    </>
  )
}