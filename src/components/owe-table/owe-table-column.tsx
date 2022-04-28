import React, {FC} from "react"
import {IOweTableColumn} from "./owe-table-interfaces"

export const OweTableColumn: FC<IOweTableColumn> = ({header, owers}) => {
  return(
    <div className="w-1/2 flex flex-col border-r-solid border-r-[2px] border-blue-medium last:border-r-0 px-2 py-1">
      <span className="text-grey-blue text-lg">{header}</span>
      {owers.map(person => (
        <span key={person.name} >
          <span className="text-red-light">{person.amount.toLocaleString()}</span>
          {"  -  " + person.name}
        </span>))}
    </div>
  )
}