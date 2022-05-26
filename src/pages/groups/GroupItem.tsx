import React, {FC, useMemo} from "react"
import {Group} from "../../app/group-store/group.interfaces"
import {Link} from "react-router-dom"
import classNames from "classnames"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {User} from "../../app/user-store/user.interfaces"

interface IGroupItemProp {
    group: Group
}

export const GroupItem: FC<IGroupItemProp> = ({ group }) => {
  const user = useSelector<RootState, User>(state => state.user.user!)
  const balance = useMemo(() => group.mates.find(p => p.email === user.email)!.balance, [group])

  return(
    <Link 
      to={`/group/${group.id}`}
      className="w-full flex items-center justify-around hover:bg-grey-blue py-2 text-xl text-blue-dark"
    >
      <span className="w-1/2 px-5 text-center">
        {group.name}
      </span>
      <span className={classNames("text-3xl w-1/2 px-5 text-center",
        balance > 0 ? "text-green-secondary" : "text-red-secondary")}>
        {balance}
      </span>
    </Link>
  )
}