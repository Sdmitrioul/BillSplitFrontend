import React, {FC, useEffect, useMemo} from "react"
import {OweItem} from "./owe-item"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {User} from "../../app/user-store/user.interfaces"
import {getGroups} from "../../app/group-store/group.requests"
import {Group} from "../../app/group-store/group.interfaces"
import {groupBalance} from "../../utils/common"

export const OweBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
    
  useEffect(() => {
    dispatch(getGroups(""))
  }, [])
    
  const user = useSelector<RootState, User>(state => state.user.user!)
  const groups = useSelector<RootState, Group[]>(state => state.groups.groups)

  const [total, owe, youOwed] = useMemo(() => groups.map((g) => 
    groupBalance(g, user.email)).reduce(([t, o, y], [ct, co, cy]) => [t + ct, o + co, y + cy], [0, 0, 0]), [groups])

  return(
    <div className="flex flex-1 border-solid border-[2px] border-blue-medium rounded-sm p-1">
      <OweItem text="Total" amount={total} />
      <OweItem text="You owe" amount={owe} />
      <OweItem text="You are owed" amount={youOwed} />
    </div>
  )
}

