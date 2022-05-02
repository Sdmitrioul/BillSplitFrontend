import {GroupsSlice} from "./group.interfaces"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: GroupsSlice = {
  groups: [
    {
      id: "9344249fkds",
      name: "Homeless",
      mates: [],
      balance: -2342,
    },
    {
      id: "9344249fkdrewrs",
      name: "Homeless2",
      mates: [],
      balance: 2342,
    }
  ],
  fetching: false,
  hasData: false,
}

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<string>) => {
      state.groups = [...state.groups, {
        id: (Math.random() * 1000).toLocaleString(),
        name: action.payload,
        mates: [],
        balance: 0}
      ]
      state.hasData = true
      state.fetching = false
    }
  }
})

export const { createGroup } = groupsSlice.actions

export default groupsSlice.reducer