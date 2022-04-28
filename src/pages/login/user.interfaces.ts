import {IOwer} from "../../components/owe-table/owe-table-interfaces";

export interface User {
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