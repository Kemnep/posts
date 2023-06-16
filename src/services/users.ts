import axios from "axios";

import { IUser } from "../data/users";

export async function fetchUsersByIds(userIds:number[]=[]) {
    const searchString = userIds.length > 0 ? '?id=' + userIds.join('&id=') : ''
    const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users${ searchString }`)

    return response.data
}

export async function fetchUsersById(userId:number[]) {
    const response = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users?id=${ userId }`)

    return response.data
}