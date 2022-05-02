import {BaseStore} from "../base-store"

export interface Group {
    id: string
    name: string
    mates: Person[]
    balance: number
}

export interface Person {
    name: string
    email: string
}

export interface GroupsSlice extends BaseStore {
    groups: Group[]
}