import React, {FC} from "react"

interface IMainPart {
    children: React.ReactNode
}

export const MainPart: FC<IMainPart> = ({ children }) => {
  return(
    <div className="w-full h-full flex justify-around">
      <div
        className="flex flex-col m-auto h-full w-[800px] bg-blue-tertiary
                     border-x-solid border-x-[1px] border-x-blue-medium"
      >
        {children}
      </div>
    </div>
  )
}