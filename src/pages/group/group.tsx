import React, {FC, useEffect} from "react"
import {MainPart} from "../../components/MainPart"
import {Header} from "../header/header"
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getGroups} from "../../app/group-store/group.requests"
import {AppDispatch, RootState} from "../../app/store"
import {getFriends} from "../../app/friends-store/friends.requests"
import {Group} from "../../app/group-store/group.interfaces"
import {User} from "../../app/user-store/user.interfaces"
import {OweItem} from "../../components/owe-bar/owe-item"
import {groupBalance} from "../../utils/common"

export const GroupPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getGroups(""))
    dispatch(getFriends(""))
  }, [])

  const groups = useSelector<RootState, Group[]>(state => state.groups.groups)
  const fetchingGroups = useSelector<RootState, boolean>(state => state.groups.fetching)
  const fetchingFriends =  useSelector<RootState, boolean>(state => state.friends.fetching)
  const user = useSelector<RootState, User>(state => state.user.user!)
    
  const fetching = fetchingFriends || fetchingGroups
  const group = groups.find(g => g.id === id)

  const [total, owe, youOwed] = groupBalance(group, user.email)

  return(
    <>
      <Header />
      <MainPart>
        <>
          {fetching && <span className="w-full text-center py-4 text-xl">Loading...</span>}
          {!fetching && !group && (
            <span 
              className="w-full text-center py-4 text-xl text-red-active"
            >
              {"This group doesn't exist"}
            </span>)}
          {!fetching && group && (
            <>
              <div className="flex justify-between items-center py-4 bg-blue-light px-4">
                <div className="flex flex-1 border-solid border-[2px] border-blue-medium rounded-sm p-1">
                  <OweItem text="Total" amount={total} />
                  <OweItem text="You owe" amount={owe} />
                  <OweItem text="You are owed" amount={youOwed} />
                </div>
                <div className="flex items-center">
                  <button
                    className="ml-3 bg-red-light hover:bg-red-hover text-center rounded-md text-white px-3 py-2"
                    onClick={() => navigate(`/groups/expense/${id}`)}
                  >
                    Add an expense
                  </button>
                  <button
                    className="ml-3 bg-green-secondary
                    hover:bg-green-medium text-center rounded-md text-white px-3 py-2"
                    onClick={() => window.alert("Not implemented")}
                  >
                    Settle Up
                  </button>
                </div>
              </div>
              {!group.transactions.length && (
                <span
                  className="w-full text-center py-4 text-xl text-red-active"
                >
                  {"No one spend nothing in this group"}
                </span>)}
              {!!group.transactions.length && group.transactions.map(t => {
                const uTransaction = t.people.find(p => p.email === user.email)!.balance
                const owe = t.payer.email === user.email ? `You are owed: ${t.people
                  .filter(u => u.email !== user.email)
                  .reduce((acc: number, p) => acc + p.balance, 0)}` : 
                  uTransaction === 0 ? "You are not involved" : `You owe ${uTransaction}`
                return(
                  <div 
                    className="w-full px-4 py-2 hover:bg-blue-tertiary
                    flex flex-col hover:text-white hover:bg-blue-bright"
                    key={t.id}
                  >
                    <span className="text-xl">{t.name}</span>
                    <div className="flex flex-1 text-md">
                      <div className="flex w-1/2">
                        <span className="mr-2">Payed:</span>
                        <span className="mr-[100px]">{t.payer.name}</span>
                      </div>
                      {owe}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </>
      </MainPart>
    </>
  )
}