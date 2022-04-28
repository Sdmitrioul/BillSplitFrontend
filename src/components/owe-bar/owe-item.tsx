import React, {FC} from "react"
import {IOweItem} from "./ove-bar.interfaces"

export const OweItem: FC<IOweItem> = ({text, amount}) => {
  return (
    <div
      className="flex flex-col w-1/3 border-r-solid border-r-[2px] border-blue-medium last:border-r-0 px-2 py-1"
    >
      <span className="text-grey-blue text-xs text-center">{text}</span>
      <span className="text-blue-dark text-center">{amount.toLocaleString()}</span>
    </div>
  )
}