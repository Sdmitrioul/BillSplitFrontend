import { configureStore } from "@reduxjs/toolkit"
import userStore from "./user-store/user.slice"
import groupsStore from "./group-store/group.slice"

export const store = configureStore({
  reducer: {
    user: userStore,
    groups: groupsStore,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
