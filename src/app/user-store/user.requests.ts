import {createAsyncThunk} from "@reduxjs/toolkit"
import {Credentials, RegistrationForm, User} from "./user.interfaces"

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: Credentials, {rejectWithValue}) => {
    try {
      const user = await new Promise<User>((resolve) => {
        setTimeout(() => resolve({
          email: credentials.email,
          name: credentials.email.split("@")[0],
          depthTotal: 5000,
          oweTotal: 2300,
          owers: [],
          myOwers: [],
        }), 500)
      })
      localStorage.setItem("jwt", "something")
      return user 
    } catch {
      rejectWithValue("error while getting info")
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/register",
  async (form: RegistrationForm, {rejectWithValue}) => {
    try {
      const user =  await new Promise<User>((resolve) => {
        setTimeout(() => resolve({
          email: form.email,
          name: form.name,
          depthTotal: 5000,
          oweTotal: 2300,
          owers: [],
          myOwers: [],
        }), 500)
      })
      localStorage.setItem("jwt", "something")
      return user
    } catch {
      rejectWithValue("error while registering user")
    }
  }
)

export const getUser = createAsyncThunk(
  "user/get",
  async (token: string | null, {rejectWithValue}) => {
    try {
      if (!token) {
        localStorage.removeItem("jwt")
        return null
      }
      const user =  await new Promise<User>((resolve) => {
        setTimeout(() => resolve({
          email: "dmitri.zd1958@gmail.com",
          name: "Dmitri Skroba",
          depthTotal: 5000,
          oweTotal: 2300,
          owers: [],
          myOwers: [],
        }), 500)
      })
      localStorage.setItem("jwt", "something")
      return user
    } catch {
      rejectWithValue("error while registering user")
    }
  }
)