import React, {ChangeEvent, FC, useState} from "react"
import { useNavigate } from "react-router-dom"
import {useDispatch} from "react-redux"
import {AppDispatch} from "../../app/store"
import {loginUser} from "../../app/user-store/user.requests"

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const onChangeAddress = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const apply = () => {
    dispatch(loginUser({email: email, password: password}))
    navigate("/user")
  }

  return(
    <div className="w-full h-full flex items-center justify-around">
      <div 
        className="w-[600px] h-fit px-3 pt-3 pb-5 flex-col font-bold
        items-center rounded-lg border-solid border-2 border-blue-dark">
        <div className="mt-10 text-2xl w-full text-center">Log In</div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Email address</span>
          <input
            placeholder="Email"
            type="email"
            value={email} 
            id="email" 
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={onChangeAddress} 
          />
        </div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Password</span>
          <input
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={onChangePassword}
          />
        </div>
        <button 
          onClick={apply} 
          className="mt-5 rounded-full w-full h-10 bg-blue-dark text-center text-white hover:bg-blue-hover font-bold"
        >
          Log In
        </button>
      </div>
    </div>
  )
}