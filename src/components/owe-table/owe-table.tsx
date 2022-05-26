import React, {FC} from "react"
import {OweTableColumn} from "./owe-table-column"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {User} from "../../app/user-store/user.interfaces"

export const OweTable: FC = () => {
  const user = useSelector<RootState, User>(state => state.user.user!)

  return(
    <div className="w-full pt-2 flex">
      <OweTableColumn 
        header="You owe" owers={user.owers}
        defaultValue="You don't owe to anyone"
      />
      <OweTableColumn 
        header="You are owed" 
        owers={user.myOwers}
        defaultValue="You are not owed anything" 
      />
    </div>
  )
}