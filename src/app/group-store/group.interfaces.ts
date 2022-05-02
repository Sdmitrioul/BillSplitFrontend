import {BaseStore} from "../base-store"

export interface Group {
    name: string
    mates: Person[]
}

export interface Person {
    name: string
    email: string
}

export interface GroupsSlice extends BaseStore {
    groups: Group[]
}