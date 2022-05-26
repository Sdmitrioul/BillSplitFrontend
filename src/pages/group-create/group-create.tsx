import React, {ChangeEvent, FC, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {useNavigate} from "react-router-dom"
import {createGroup, getGroups} from "../../app/group-store/group.requests"
import {GroupsSlice, Person} from "../../app/group-store/group.interfaces"
import {User} from "../../app/user-store/user.interfaces"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {FriendsSlice} from "../../app/friends-store/friends.interfaces"
import {getFriends} from "../../app/friends-store/friends.requests"

export  const GroupCreate: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getGroups(""))
    dispatch(getFriends(""))
    return () => {
      dispatch(getGroups(""))
    }
  }, [])

  const { groups } = useSelector<RootState, GroupsSlice>(state => state.groups)
  const { people, fetching } = useSelector<RootState, FriendsSlice>(state => state.friends)
  const user = useSelector<RootState, User>(state => state.user.user!)

  const userFriends = useMemo(() => people.filter(p => p.email !== user.email), [people])
    
  const [name, setName] = useState<string>("")
  const [users, setUsers] = useState<Person[]>([{name: user.name, email: user.email }])
    
  const validName = groups.every(g => g.name !== name)
    
  const addPerson = (person: Person) => () => {
    setUsers(u => {
      if (u.some(us => us.email === person.email)) {
        return u.filter(us => us.email !== person.email)
      }

      return [...u, person]
    })
  }
  
  const apply = () => {
    dispatch(createGroup({name: name, mates: users}))
    navigate("/home")
  }

  return(
    <>
      <Header />
      <MainPart>
        <>
          <span className="w-full py-4 px-4 text-blue-dark text-2xl">Input group name</span>
          <input 
            placeholder="Group name"
            id="name"
            type="text" 
            value={name}
            className="mx-4 mb-4 rounded-md h-10 px-2 bg-blue-medium"
            onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <span className="w-full py-4 px-4 text-blue-dark text-2xl">Choose participants</span>
          {fetching && <span className="w-full text-center py-4 text-xl">Loading...</span>}
          {!fetching && userFriends.map(person => (
            <label key={person.email} className="w-full px-4 py-4 mb-4 last:mb-0 flex items-center">
              <input 
                type="checkbox" 
                checked={users.some(u => u.email === person.email)}
                onChange={addPerson(person)}
                className="w-4 h-4 mr-4"
              />
              <span className="mr-2">{person.name}</span>
              <span className="text-red-active">{person.email}</span>
            </label>
          ))}
          {<div className="flex">
            <button
              disabled={!(validName && users.length > 1)}
              className="mt-5 mx-4 rounded-full w-full h-10
              bg-blue-bright text-center text-white font-bold disabled:opacity-50"
              onClick={apply}
            >
                  Create group
            </button>
          </div>}
        </>
      </MainPart>
    </>
  )
}