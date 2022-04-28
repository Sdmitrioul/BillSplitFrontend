import {BaseStore} from "../../app/base-store"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Credentials, User} from "./user.interfaces"

export interface UserStore extends BaseStore {
    user?: User
}

const initialState: UserStore = {
  user: undefined,
  fetching: false,
}

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: Credentials, {rejectWithValue}) => {
    try {
      return await new Promise<User>((resolve) => {
        setTimeout(() => resolve({
          email: credentials.email,
          name: credentials.email.split("@")[0],
          depthTotal: 5000,
          oweTotal: 2300,
          owers: [],
          myOwers: [],
        }))
      }) as User
    } catch {
      rejectWithValue("error while getting info")
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.fetching = false
      state.hasData = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(loginUser.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(loginUser.rejected, (state) => {
      state.user = undefined
      state.hasData = true
      state.fetching = false
    })
  },
})

export const { putUser } = userSlice.actions

export default userSlice.reducer


