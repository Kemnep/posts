import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IPost } from "../data/posts";
import { IComment } from "../data/comments";

interface IPagination {
    start: number;
    limit: number;
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),
    endpoints: (builder) => ({
        getPost: builder.query<IPost, string>({
            query: (postId) => `posts/${ postId }`,
        }),
        getPosts: builder.query<IPost[], IPagination>({
            query: (pagination) => `posts?_start=${ pagination.start }&_limit=${ pagination.limit }`
        }),
        getComments: builder.query<IComment[], string>({
            query: (postId) => `posts/${ postId }/comments`
        }),
        getPostsWithCommentsByUserId: builder.query<IPost[], string>({
            query: (userId) => {
                return `posts?_embed=comments&userId=${userId}`
            },
        }),
    }),
})

export const { useGetPostQuery, useGetPostsQuery, useLazyGetPostsWithCommentsByUserIdQuery } = postsApi


