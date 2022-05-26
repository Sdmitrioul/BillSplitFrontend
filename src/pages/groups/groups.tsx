import React, {FC, useEffect} from "react"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {Group} from "../../app/group-store/group.interfaces"
import {GroupItem} from "./GroupItem"
import {getGroups} from "../../app/group-store/group.requests"
import {User} from "../../app/user-store/user.interfaces"
import {useNavigate} from "react-router-dom"

export  const Groups: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
    
  useEffect(() => {
    dispatch(getGroups(""))
  }, [])

  const groups = useSelector<RootState, Group[]>(state => state.groups.groups)
  const fetching = useSelector<RootState, boolean>(state => state.groups.fetching)
  const user = useSelector<RootState, User>(state => state.user.user!)
    
  const userGroups = groups.filter(g => g.mates.some(m => m.email === user.email))

  return(
    <>
      <Header />
      <MainPart>
        <div className="flex">
          <button
            className="flex-1 mt-2 mx-4 rounded-full bg-blue-bright hover:bg-blue-hover text-xl text-white p-3"
            onClick={() => {
              navigate("/groups/create")
            }}
          >
              Create group
          </button>
        </div>
        {fetching && <span className="w-full text-center py-4 text-xl">Loading...</span>}
        {!fetching && userGroups.map(group => <GroupItem key={group.id} group={group} />)}
        {!fetching && !userGroups.length && (
          <>
            <div className="w-full text-center text-blue-dark my-4 text-2xl">
              {"You haven't any group still"}
            </div>
          </>
        )}
      </MainPart>
    </>
  )
}