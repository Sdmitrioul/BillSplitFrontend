import React, {FC} from "react"
import {Group} from "../../app/group-store/group.interfaces"
import {Link} from "react-router-dom"
import classNames from "classnames"

interface IGroupItemProp {
    group: Group
}

export const GroupItem: FC<IGroupItemProp> = ({ group }) => {
  return(
    <Link 
      to={`/group/${group.id}`}
      className="w-full flex items-center justify-around hover:bg-grey-blue px-5 py-2 text-xl text-blue-dark"
    >
      {group.name}
      <span className={classNames("text-3xl", group.balance > 0 ? "text-green-secondary" : "text-red-secondary")}>
        {group.balance}
      </span>
    </Link>
  )
}