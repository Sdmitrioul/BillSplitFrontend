import React, {FC, useEffect, useMemo, useState} from "react"
import {Header} from "../header/header"
import {MainPart} from "../../components/MainPart"
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../app/store"
import {addTransaction, getGroups} from "../../app/group-store/group.requests"
import {Group, GroupPerson, Person} from "../../app/group-store/group.interfaces"
import Select from "react-select"
import {groupToOption, personToOption} from "../../utils/common"
import {User} from "../../app/user-store/user.interfaces"
import {faker} from "@faker-js/faker"

export const GroupExpensePage: FC = () => {
  const location = useLocation()
  const split = location.pathname.split("/")
  const id = split[split.length - 1]
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
    
  useEffect(() => {
    dispatch(getGroups(""))
  }, [])

  const people = useSelector<RootState, Person[]>(state => state.friends.people || [])
  const groups = useSelector<RootState, Group[]>(state => state.groups.groups)
  const fetchingGroups = useSelector<RootState, boolean>(state => state.groups.fetching)
  const user = useSelector<RootState, User>(state => state.user.user!)
  const [group, setGroup] = useState<Group | undefined | null>(groups.find(g => g.id === id))
  

  const options = useMemo(() => groups.map(groupToOption), [groups])
  
  const [payer, setPayer] = useState<Person | null | undefined>(null)
  const [amount, setAmount] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [payers, setPayers] = useState<GroupPerson[]>((group?.mates || []).map(item => ({...item, balance: 0})))
  
  const sum = useMemo(() => payers.reduce((acc: number, p) => acc + p.balance, 0), [payers])
  
  if (!fetchingGroups && !groups) return <Navigate to={"/groups"}  replace />
    
  return (
    <>
      <Header />
      <MainPart>
        <>
          {fetchingGroups && <span className="w-full text-center py-4 text-xl">Loading...</span>}
          {!id && !fetchingGroups && (
            <div className="flex flex-col">
              <span className="text-2xl mx-4 my-2">Choose group:</span>
              <Select 
                placeholder="Choose group"
                onChange={g => setGroup(groups.find(gr => gr.id === g?.value))}
                value={groupToOption(group)} 
                options={options} 
                className="mx-4 text-grey-blue"
              />
              <div className="border border-blue-dark mx-4 rounded-md my-4" />
            </div>)}
          {!fetchingGroups && group && (
            <div className="flex flex-col my-4">
              <div className="flex px-4 items-center">
                <span className="text-2xl mr-4">Transaction name:</span>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 h-10 text-grey-blue rounded-md px-4 py-2 border border-blue-medium"
                />
              </div>
              <div className="flex px-4 items-center">
                <span className="text-2xl mr-4">Payer:</span>
                <Select
                  placeholder="Choose payer"
                  onChange={p => setPayer(people.find(pr => pr.email === p?.value))}
                  options={people.map(personToOption)}
                  value={personToOption(payer)}
                  className="my-4 w-1/4 text-grey-blue mr-4"
                />
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(Number.parseInt(e.target.value))} 
                  className="h-10 w-1/4 text-grey-blue rounded-md px-4 py-2 border border-blue-medium"
                />
              </div>
              {payers.map(p => (
                <div key={p.email} className="px-4 py-2 flex hover:bg-blue-bright hover:text-white flex">
                  <span className="text-xl w-1/5">{p.name}</span>
                  <input
                    type="number"
                    value={p.balance}
                    onChange={e => setPayers(pa => pa.map(per => 
                      per.email === p.email ? 
                        {...p, balance: Number.parseInt(e.target.value || "0")} :
                        per))}
                    className="h-10 w-1/4 text-grey-blue rounded-md px-4 py-2 border border-blue-medium"
                  />
                </div>
              ))}
              <button
                className="flex-1 mt-2 mx-4 rounded-full
                bg-blue-bright hover:bg-blue-hover text-xl text-white p-3 disabled:opacity-50"
                onClick={() => {
                  dispatch(addTransaction({
                    amount: amount,
                    id: faker.database.mongodbObjectId(),
                    name: name,
                    payer: payer!,
                    people: payers,
                    groupId: group?.id || ""
                  }))
                  navigate("/home")
                }}
                disabled={!name || !payer || sum !== amount}
              >
                Add expense
              </button>
            </div>
          )}
        </>
      </MainPart>
    </>
  )
}