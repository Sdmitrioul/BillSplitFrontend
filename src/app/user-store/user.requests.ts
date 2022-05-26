import {createAsyncThunk} from "@reduxjs/toolkit"
import {Credentials, RegistrationForm, User} from "./user.interfaces"
import {faker} from "@faker-js/faker"

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: Credentials, {rejectWithValue}) => {
    try {
      const gotUser = JSON.parse(localStorage.getItem("users") || "[]")
        .find((u: any) => u.email === credentials.email)
      
      if (!gotUser || gotUser.password !== credentials.password) {
        return rejectWithValue("Wrong password")
      }

      const user = await new Promise<User>((resolve) => {
        setTimeout(() => resolve({
          id: gotUser.id,
          email: gotUser.email,
          name: gotUser.name,
          depthTotal: gotUser.depthTotal,
          oweTotal: gotUser.oweTotal,
          owers: gotUser.owers,
          myOwers: gotUser.myOwers,
        }), 500)
      })

      localStorage.setItem("jwt", JSON.stringify(user))

      return user 
    } catch {
      return rejectWithValue("error while getting info")
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/register",
  async (form: RegistrationForm, {rejectWithValue}) => {
    try {
      const userRaw = {
        id: faker.database.mongodbObjectId(),
        email: form.email,
        name: form.name,
        depthTotal: 0,
        oweTotal: 0,
        owers: [],
        myOwers: [],
      }
      
      const user =  await new Promise<User>((resolve) => {
        setTimeout(() => resolve(userRaw), 500)
      })
      
      const users =  JSON.parse(localStorage.getItem("users") || "[]")
      
      if (users.some((x: any) => x.email === userRaw.email)) {
        return rejectWithValue("User  already exist")
      }
      
      localStorage.setItem("jwt", JSON.stringify(userRaw))
      localStorage.setItem("users", JSON.stringify([...users, {...userRaw, password: form.password}]))
      
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
        setTimeout(() => resolve(JSON.parse(token)), 500)
      })
      
      localStorage.setItem("jwt", token)
      
      return user
    } catch {
      rejectWithValue("error while registering user")
    }
  }
)