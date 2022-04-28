import React, {FC} from "react"
import {OweItem} from "./owe-item"

export const OweBar: FC = () => {
  const total = Math.random() * 10000 - 5000
  const owe = Math.random() * 10000
  const youOwed = total - owe

  return(
    <div className="flex flex-1 border-solid border-[2px] border-blue-medium rounded-sm p-1">
      <OweItem text="Total" amount={total} />
      <OweItem text="You owe" amount={owe} />
      <OweItem text="You are owed" amount={youOwed} />
    </div>
  )
}

