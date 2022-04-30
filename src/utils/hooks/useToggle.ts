import {useState} from "react"

export const useToggle = (): [boolean, () => void, () => void, () => void] => {
  const [open, setOpen] = useState<boolean>(false)
  return [open, () => setOpen(true), () => setOpen(false), () => setOpen(prev => !prev)]
}