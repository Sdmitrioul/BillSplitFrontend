import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User, UserSlice} from "./user.interfaces"
import {getUser, loginUser, registerUser} from "./user.requests"

const initialState: UserSlice = {
  user: undefined,
  fetching: false,
  hasData: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.fetching = false
      state.hasData = true
    },
    removeUser: (state) => {
      state.user = undefined
      state.hasData = false
      localStorage.removeItem("jwt")
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
      state.hasData = false
      state.fetching = false
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(registerUser.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(registerUser.rejected, (state) => {
      state.user = undefined
      state.hasData = false
      state.fetching = false
    }).addCase(getUser.fulfilled, (state, action) => {
      if (!action.payload) {
        state.user = undefined
        state.hasData = false
      } else {
        state.user = action.payload
        state.hasData = true
      }
      state.fetching = false
    }).addCase(getUser.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(getUser.rejected, (state) => {
      state.user = undefined
      state.hasData = true
      state.fetching = false
    })
  },
})

export const { putUser, removeUser } = userSlice.actions

export default userSlice.reducer


