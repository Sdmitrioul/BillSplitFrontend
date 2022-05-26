import {BaseStore} from "../base-store"

export interface Group {
    id: string
    name: string
    mates: GroupPerson[]
    transactions: Transaction[]
}

export interface Person {
    name: string
    email: string
}

export interface GroupPerson extends Person {
    balance: number
}

export interface Transaction {
    name: string
    payer: Person
    amount: number
    people: GroupPerson[]
    id: string
}

export interface GroupsSlice extends BaseStore {
    groups: Group[]
}

export interface GroupCredentials {
    name: string
    mates: Person[]
}

export interface TransactionCredentials extends Transaction {
    groupId: string
}