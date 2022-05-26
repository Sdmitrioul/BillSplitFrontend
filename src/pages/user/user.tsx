import React, {FC} from "react"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {OweBar} from "../../components/owe-bar/owe-bar"
import {OweTable} from "../../components/owe-table/owe-table"
import {useNavigate} from "react-router-dom"

export const User: FC = () => {
  const navigate = useNavigate()
  return(
    <>
      <Header />
      <MainPart>
        <div className="flex items-center px-6 py-2 w-full">
          <button 
            className="w-full rounded-full bg-blue-bright hover:bg-blue-hover text-xl text-white p-3"
            onClick={() => navigate("/groups/create")}
          >
                Create group
          </button>
        </div>
        <div className="flex justify-between items-center py-4 bg-blue-light px-4">
          <OweBar />
          <div className="flex items-center">
            <button 
              className="ml-3 bg-red-light hover:bg-red-hover text-center rounded-md text-white px-3 py-2"
              onClick={() => navigate("/groups/expense/")}
            >
                    Add an expense
            </button>
            <button 
              className="ml-3 bg-green-secondary hover:bg-green-medium text-center rounded-md text-white px-3 py-2"
              onClick={() => window.alert("Not implemented")}
            >
                    Settle Up
            </button>
          </div>
        </div>
        <OweTable />
      </MainPart>
    </>
  )
}