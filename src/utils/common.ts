import {Group, Person} from "../app/group-store/group.interfaces"

export const groupBalance = (group: Group | undefined, email: string): [number, number, number] => {
  if (!group) return [0, 0, 0]
  const owed = group.transactions.filter(t => t.payer.email === email).reduce((acc: number, curr) =>
    acc + curr.amount - (curr.people.find(p => p.email === email)?.balance || 0), 0)
  
  const owe = group.transactions.filter(t => t.payer.email !== email).reduce((acc: number, curr) =>
    acc + curr.people.filter(u => u.email === email)
      .reduce((acc: number, c) => acc + c.balance, 0), 0)

  return [group.mates.find(p => p.email === email)?.balance || 0, owe, owed]
}

export const groupToOption = (g: Group | undefined | null) => {
  if (!g) return {id: "", label: ""}
  return ({value: g.id, label: g.name})
}

export const personToOption = (p: Person | null | undefined) => {
  if (!p) return {id: "", label: ""}

  return ({value: p.email, label: p.name})
}