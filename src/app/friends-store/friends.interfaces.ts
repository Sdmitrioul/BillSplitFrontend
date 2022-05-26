import {BaseStore} from "../base-store"
import {Person} from "../group-store/group.interfaces"

export interface FriendsSlice extends BaseStore {
    people: Person[]
}