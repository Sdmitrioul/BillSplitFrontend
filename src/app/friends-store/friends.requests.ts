import {createAsyncThunk} from "@reduxjs/toolkit"
import {Person} from "../group-store/group.interfaces"

export const getFriends = createAsyncThunk(
  "friends-store/all",
  async (email: string, {rejectWithValue}) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
  
      return await new Promise<Person[]>((resolve) => {
        setTimeout(() => resolve(users.filter((u: any) => u.email !== email).map((u: any) => ({
          name: u.name,
          email: u.email
        }))), 500)
      })
    } catch {
      return rejectWithValue("error while getting info")
    }
  }
)