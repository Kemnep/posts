import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../../data/users";

interface UsersState {
    users: IUser[];
}

const initialState = {
    users: [],
    isLoading : false,
    error : null,
} as UsersState

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IUser[]>) {
            state.users = action.payload
        },
    },
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer