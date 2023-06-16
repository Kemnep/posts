import { RootState } from "../store";

export const getUsers = (state:RootState) => {
    return state.users.users
}