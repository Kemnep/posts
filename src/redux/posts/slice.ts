import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from "../../data/posts";
import { IUser } from "../../data/users";

interface IPagination {
    currentPage: number;
    count: number;
    perPage: number;
}

export type TSort = "" | "asc" | "desc";

interface PostsState {
    posts: IPost[];
    isLoading: boolean;
    error: unknown | void;
    pagination: IPagination;
    searchQuery: string;
    sort: TSort;
}

export type TFilterParams = {
    page: number;
    searchQuery: string;
    sort: TSort;
}

const initialState = {
    posts : [],
    isLoading : false,
    error : null,
    pagination : {
        currentPage : 1,
        count: 0,
        perPage : 10
    },
    searchQuery : '',
    sort : 'asc'
} as PostsState

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPosts(state, action: PayloadAction<TFilterParams>) {
            state.isLoading = true
            state.error = null
            state.pagination.currentPage = action.payload.page
            state.searchQuery = action.payload.searchQuery
            state.sort = action.payload.sort
        },
        setError(state, action: PayloadAction<unknown>) {
            state.error = action.payload
            state.isLoading = false
        },
        setPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload
        },
        setPaginationCount(state, action: PayloadAction<number>) {
            state.pagination.count = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
    },
})

export const { setPosts, fetchPosts, setPaginationCount, setLoading, setError } = postsSlice.actions
export default postsSlice.reducer