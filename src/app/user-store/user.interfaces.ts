import {IOwer} from "../../components/owe-table/owe-table-interfaces"
import {BaseStore} from "../base-store"

export interface User {
    id: string
    email: string
    name: string
    depthTotal: number
    oweTotal: number
    owers: IOwer[]
    myOwers: IOwer[]
}

export interface Credentials {
    email: string
    password: string
}

export interface RegistrationForm {
    email: string
    name: string
    password: string
}

export interface UserSlice extends BaseStore {
    user?: User
}