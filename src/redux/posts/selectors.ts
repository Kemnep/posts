import { RootState } from "../store";
import { mergePostsWithUsers } from "../../utils/posts";

export const getPosts = (state:RootState) => {
    return state.posts.posts
}

export const getLoading = (state:RootState) => {
    return state.posts.isLoading
}

export const getError = (state:RootState) => {
    return state.posts.error
}

export const getCurrentPage = (state:RootState) => {
    return state.posts.pagination.currentPage
}

export const getPerPage = (state:RootState) => {
    return state.posts.pagination.perPage
}

export const getPagination = (state:RootState) => {
    return state.posts.pagination
}

export const getSearchString = (state:RootState) => {
    return state.posts.searchQuery
}

export const getSort = (state:RootState) => {
    return state.posts.sort
}