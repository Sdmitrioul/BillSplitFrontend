import React, {FC, useEffect, useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {User} from "../../app/user-store/user.interfaces"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {getFriends} from "../../app/friends-store/friends.requests"
import {FriendsSlice} from "../../app/friends-store/friends.interfaces"

export  const Friends: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getFriends(""))
  }, [])

  const { people, fetching } = useSelector<RootState, FriendsSlice>(state => state.friends)
  const user = useSelector<RootState, User>(state => state.user.user!)

  const userFriends = useMemo(() => people.filter(p => p.email !== user.email), [people, fetching])

  return(
    <>
      <Header />
      <MainPart>
        {fetching && <span className="w-full text-center py-4 text-xl">Loading...</span>}
        {!fetching && userFriends.map(f => (
          <div className="flex w-full py-4 text-center hover:bg-blue-active hover:text-white" key={f.email}>
            <div className="w-1/2 border-r border-r-[3px] border-r-blue-dark">
              {f.name}
            </div>
            <div className="w-1/2">
              {f.email}
            </div>
          </div>
        ))}
        {!fetching && !userFriends.length && (
          <div className="w-full text-center text-blue-dark my-4 text-2xl">
            {"You haven't any friends still"}
          </div>
        )}
      </MainPart>
    </>
  )
}