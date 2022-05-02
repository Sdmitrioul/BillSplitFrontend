import {useSelector} from "react-redux"
import {RootState} from "../../app/store"

export const useAuthorized = (): boolean => {
  const hasUser = useSelector<RootState, boolean>(state => state.user.hasData)
    
  return hasUser
}