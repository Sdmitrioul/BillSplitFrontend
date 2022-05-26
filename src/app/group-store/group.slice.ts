import {GroupsSlice} from "./group.interfaces"
import {createSlice} from "@reduxjs/toolkit"
import {addTransaction, createGroup, getGroups} from "./group.requests"

const initialState: GroupsSlice = {
  groups: [],
  fetching: false,
  hasData: false,
}

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state) => {
      state.groups = [...state.groups]
      state.hasData = true
      state.fetching = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.groups = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(createGroup.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(createGroup.rejected, (state) => {
      state.hasData = false
      state.fetching = false
    }).addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(getGroups.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(getGroups.rejected, (state) => {
      state.groups = []
      state.hasData = false
      state.fetching = false
    }).addCase(addTransaction.fulfilled, (state, action) => {
      state.groups = action.payload
      state.hasData = true
      state.fetching = false
    }).addCase(addTransaction.pending, (state) => {
      state.fetching = true
      state.hasData = false
    }).addCase(addTransaction.rejected, (state) => {
      state.hasData = true
      state.fetching = false
    })
  },
})

export const { addGroup } = groupsSlice.actions

export default groupsSlice.reducer