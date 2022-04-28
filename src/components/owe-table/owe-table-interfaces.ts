export interface IOweTableColumn {
    header: string
    owers: IOwer[]
    defaultValue: string
}

export interface IOwer {
    name: string
    amount: number
}