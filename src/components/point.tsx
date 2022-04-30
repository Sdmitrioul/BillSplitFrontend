import React, {FC} from "react"
import classNames, {Argument} from "classnames"

interface IPoint {
    classname?: Argument
}

export const Point: FC<IPoint> = ({classname}) => 
  (<div className={classNames("w-1 h-1 rounded-full bg-grey-blue", classname)} />)