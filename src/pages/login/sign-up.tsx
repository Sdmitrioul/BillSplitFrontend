import React, {ChangeEvent, FC, useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {AppDispatch} from "../../app/store"
import {registerUser} from "../../app/user-store/user.requests"

export const SignUp: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmation, setConfirmation] = useState<string>("")
  const [name, setName] = useState<string>("")

  const [agree, setAgree] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  
  const apply = () => {
    dispatch(registerUser({email: email, password: password, name: name}))
    navigate("/user")
  }

  return(
    <div className="w-full h-full flex items-center justify-around">
      <div
        className="w-[600px] h-fit px-3 pt-3 pb-5 flex-col font-bold
        items-center rounded-lg border-solid border-2 border-blue-dark">
        <div className="mt-10 text-2xl w-full text-center">Create Account</div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Name</span>
          <input
            placeholder="Your name"
            type="text"
            value={name}
            id="name"
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Email address</span>
          <input
            placeholder="Email"
            type="email"
            value={email}
            id="email"
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Password</span>
          <input
            placeholder="Password"
            type="password"
            value={password}
            id="email"
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex-col w-full h-fit mt-3">
          <span>Confirmation</span>
          <input
            placeholder="Confirmation"
            type="password"
            value={confirmation}
            id="confirmation"
            className="rounded-md mt-2 w-full h-10 px-2 bg-blue-medium"
            onChange={(e:ChangeEvent<HTMLInputElement>) => setConfirmation(e.target.value)}
          />
          {(confirmation !== password && !!confirmation) &&
              (<span className="text-red-light">Passwords do not match</span>)}
        </div>
        <div className="flex-col w-full h-fit mt-3">
          <label>
            <input 
              type="checkbox" 
              className="mr-3 h-4 w-4"
              onClick={() => setAgree(value => !value)}
            />
            I agree to any terms and policies.
          </label>
        </div>
        <button
          onClick={apply}
          disabled={!agree}
          className="mt-5 rounded-full w-full h-10 bg-blue-bright text-center text-white font-bold"
        >
          Register
        </button>
      </div>
    </div>
  )
}