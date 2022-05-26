import { configureStore } from "@reduxjs/toolkit"
import userStore from "./user-store/user.slice"
import groupsStore from "./group-store/group.slice"
import friendsStore from "./friends-store/friends.slices"

export const store = configureStore({
  reducer: {
    user: userStore,
    groups: groupsStore,
    friends: friendsStore,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
