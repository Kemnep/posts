import { createAction } from "@reduxjs/toolkit";
import { fetchPosts, TFilterParams } from "./slice";

export const fetchPostsAction = createAction<TFilterParams>(fetchPosts.type)