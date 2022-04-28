import React, {FC} from "react"
import {OweTableColumn} from "./owe-table-column"

export const OweTable: FC = () => {
  return(
    <div className="w-full pt-2 flex">
      <OweTableColumn 
        header="You owe" owers={[]} 
        defaultValue="You don't owe to anyone"
      />
      <OweTableColumn 
        header="You are owed" 
        owers={[{amount: 10000, name: "Fedya Nadutkin"}]} 
        defaultValue="You are not owed anything" 
      />
    </div>
  )
}