import React, {FC, useEffect} from "react"
import {BrowserRouter as Routers, Route, Routes} from "react-router-dom"
import {Login} from "./login/login"
import {Home} from "./home/home"
import {User} from "./user/user"
import {SignUp} from "./login/sign-up"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../app/store"
import {getUser} from "../app/user-store/user.requests"
import {Groups} from "./groups/groups"
import {ProtectedRoute} from "./protected-route"
import {NoMatch} from "./no-match/no-match"
import {GroupPage} from "./group/group"
import {Friends} from "./friends/friends"
import {GroupCreate} from "./group-create/group-create"
import {GroupExpensePage} from "./group-expense/group-expense"

export const Router: FC = () => {
  const hasUser = useSelector<RootState>(state => state.user.hasData)
    
  const dispatch = useDispatch<AppDispatch>()
    
  useEffect(() => {
    if (!hasUser) {
      dispatch(getUser(localStorage.getItem("jwt")))
    }
  }, [])
    
  return(
    <Routers>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>} 
        />
        <Route 
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>} 
        />
        <Route
          path="/groups/create"
          element={
            <ProtectedRoute>
              <GroupCreate />
            </ProtectedRoute>}
        />
        <Route path="/groups/expense/*" element={
          <ProtectedRoute>
            <GroupExpensePage />
          </ProtectedRoute>
        }
        />
        <Route path="/group/:id" element={
          <ProtectedRoute>
            <GroupPage />
          </ProtectedRoute>
        } 
        />
        <Route path="/friends" element={
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        }
        />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Routers>
  )
}