import {IOwer} from "../../components/owe-table/owe-table-interfaces";

export interface User {
    name: string | null
    depthTotal: number | null
    oweTotal: number | null
    owers: IOwer[]
    myOwers: IOwer[]
}

export interface Credentials {
    email: string
    password: string
}