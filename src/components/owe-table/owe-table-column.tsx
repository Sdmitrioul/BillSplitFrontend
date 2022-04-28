import React, {FC} from "react"
import {IOweTableColumn} from "./owe-table-interfaces"

export const OweTableColumn: FC<IOweTableColumn> = ({header, owers, defaultValue}) => {
  return(
    <div className="w-1/2 flex flex-col border-r-solid border-r-[2px] border-blue-medium last:border-r-0 py-1">
      <span className="px-2 text-grey-blue text-lg">{header}</span>
      {!owers.length && <span className="px-2 text-grey-blue text-md">{ defaultValue }</span> }
      {!!owers.length && owers.map(person => (
        <span key={person.name} className="px-2 py-1 hover:bg-grey-blue">
          <span className="text-red-light">{person.amount.toLocaleString()}</span> &nbsp; - &nbsp;
          {person.name}
        </span>))}
    </div>
  )
}