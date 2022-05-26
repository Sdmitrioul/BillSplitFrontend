import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {FriendsSlice} from "./friends.interfaces"
import {getFriends} from "./friends.requests"
import {Person} from "../group-store/group.interfaces"

const initialState: FriendsSlice = {
  people: [],
  fetching: false,
  hasData: false,
}

export const friendsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putFriend: (state, action: PayloadAction<Person>) => {
      state.people = [...state.people, action.payload]
      state.fetching = false
      state.hasData = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.people = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(getFriends.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(getFriends.rejected, (state) => {
      state.people = []
      state.hasData = false
      state.fetching = false
    })
  },
})

export const { putFriend } = friendsSlice.actions

export default friendsSlice.reducer


