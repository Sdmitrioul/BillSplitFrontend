import React, {FC} from "react"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {useSelector} from "react-redux"
import {RootState} from "../../app/store"
import {GroupsSlice} from "../../app/group-store/group.interfaces"
import {GroupItem} from "./GroupItem"

export  const Groups: FC = () => {
  const { groups } = useSelector<RootState, GroupsSlice>(state => state.groups)
  return(
    <>
      <Header />
      <MainPart>
        {groups.map(group => <GroupItem key={group.id} group={group} />)}
      </MainPart>
    </>
  )
}