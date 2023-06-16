import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "../data/users";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    endpoints: (builder) => ({
        getUser: builder.query<IUser, number>({
            query: (userId) => `users/${userId}`
        }),
        getUsers: builder.query<IUser[], void>({
            query: () => 'users'
        }),
    }),
})

export const { useGetUserQuery, useGetUsersQuery } = usersApi