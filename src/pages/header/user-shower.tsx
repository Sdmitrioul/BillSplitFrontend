import React, {FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {UserSlice} from "../../app/user-store/user.interfaces"
import {Link, useNavigate} from "react-router-dom"
import {removeUser} from "../../app/user-store/user.slice"

export const UserShower: FC = () => {
  const {hasData, fetching, user} = useSelector<RootState, UserSlice>((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const logout = ()  => {
    dispatch(removeUser())
    navigate("/home")
  }

  return(
    <>
      {fetching && (<span className="text-white px-2 py-1">Loading...</span>)}

      {hasData && (
        <div>
          <Link
            className="px-2 py-1 rounded-md text-center border-white hover:bg-blue-darkHover"
            to="/user"
          >
            {user?.name}
          </Link>
          <button 
            onClick={logout} 
            className="ml-2 text-red-secondary border rounded-md border-red-secondary
            px-2 hover:text-red-hover hover:border-red-hover">
            Logout
          </button>
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
          <Link
            className="text-center text-white px-2 py-1 rounded-md bg-green-secondary hover:opacity-60"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  )
}