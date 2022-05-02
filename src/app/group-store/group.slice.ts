import {GroupsSlice} from "./group.interfaces"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: GroupsSlice = {
  groups: [],
  fetching: false,
  hasData: false,
}

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<string>) => {
      state.groups = [...state.groups, {name: action.payload, mates: []}]
      state.hasData = true
      state.fetching = false
    }
  }
})

export const { createGroup } = groupsSlice.actions

export default groupsSlice.reducer