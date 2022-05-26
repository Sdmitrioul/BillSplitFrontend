import React, {FC} from "react"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"

export const Home: FC = () => {
  return(
    <>
      <Header />
      <MainPart>
        <span  className="w-full text-xl py-6 px-4 text-center">
              Bill Splitter - is an app that help you to pay justice easy in companies or party!
        </span>
      </MainPart>
    </>
  )
}