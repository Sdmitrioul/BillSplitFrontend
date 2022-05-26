import {createAsyncThunk} from "@reduxjs/toolkit"
import {Group, GroupCredentials, GroupPerson, TransactionCredentials} from "./group.interfaces"
import {faker} from "@faker-js/faker"

export const createGroup = createAsyncThunk(
  "group/create",
  async (credentials: GroupCredentials, {rejectWithValue}) => {
    try {
      const groups = JSON.parse(localStorage.getItem("groups") || "[]")

      if (!groups || groups.some((g: any) => g.name === credentials.name)) {
        return rejectWithValue("Wrong name")
      }
      
      let id = faker.database.mongodbObjectId()
      while (groups.some((g: any) => g.id === id)) {
        id = faker.database.mongodbObjectId()
      }

      const group = await new Promise<Group>((resolve) => {
        setTimeout(() => resolve({
          id: id,
          name: credentials.name,
          mates: credentials.mates.map(m => ({...m, balance: 0})),
          transactions: [],
        }), 500)
      })

      const newGroups = [...groups, group]

      localStorage.setItem("groups", JSON.stringify(newGroups))

      return newGroups
    } catch {
      return rejectWithValue("error while getting info")
    }
  }
)

export const getGroups = createAsyncThunk(
  "group/all",
  async (id: string, {rejectWithValue}) => {
    try {
      const groups = JSON.parse(localStorage.getItem("groups") || "[]")

      return await new Promise<Group[]>((resolve) => {
        setTimeout(() => resolve(groups), 500)
      })
    } catch {
      return rejectWithValue("error while getting info")
    }
  }
)

export const addTransaction = createAsyncThunk(
  "group/add",
  async (credentials: TransactionCredentials, {rejectWithValue}) => {
    try {
      const groups: Group[] = JSON.parse(localStorage.getItem("groups") || "[]")
      const group = groups.find(g => g.id === credentials.groupId)

      if (!group) {
        return rejectWithValue("Wrong name")
      }

      const newMates: GroupPerson[] = group.mates.map(m => {
        const mate = credentials.people.find(p => m.email === p.email)

        if (!mate) {
          return m
        }

        if (mate.email === credentials.payer.email) {
          return {...m, balance: m.balance + credentials.amount - mate.balance}
        }

        return {...m, balance: m.balance - mate.balance}
      })

      const newGroup: Group = {
        name: group.name,
        id: group.id,
        transactions: [...group.transactions, credentials],
        mates: newMates
      }


      const newGroups =  await new Promise<Group[]>((resolve) => {
        setTimeout(() => resolve([...groups.filter(g => g.id !== group.id), newGroup]), 500)
      })

      localStorage.setItem("groups", JSON.stringify(newGroups))
      return newGroups
    } catch {
      return rejectWithValue("error while getting info")
    }
  }
)
