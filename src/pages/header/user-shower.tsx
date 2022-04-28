import React, {FC} from "react"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {UserStore} from "../login/user-store"

export const UserShower: FC = () => {
  const {hasData, fetching, user} = useSelector<RootState, UserStore>((state) => state.user)

  return(
    <>
      {fetching && (<span className="text-white px-2 py-1">Loading...</span>)}

      {hasData && (
        <div>
          <a 
            className="px-2 py-1 rounded-md text-center border-white hover:bg-blue-darkHover"
            href="/user"
          >
            {user?.name}
          </a>
        </div>
      )}

      {!hasData && !fetching && (
        <div className="flex p-2">
          <a 
            className="mr-2 px-2 py-1 rounded-md text-center
            text-white border-solid border-[1px] border-white hover:bg-blue-darkHover"
            href="/login"
          >
            Sign In
          </a>
          <a 
            className="text-center text-white px-2 py-1 rounded-md bg-green-secondary hover:opacity-60"
            href="/signup"
          >
            Sign Up
          </a>
        </div>
      )}
    </>
  )
}