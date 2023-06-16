import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { postsApi } from "../services/postsApi";
import { sagaPostsWatcher } from "./posts/sagas";
import postsReducer from "./posts/slice";

import { usersApi } from "../services/usersApi";
import usersReducer from "./users/slice";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath] : postsApi.reducer,
        [usersApi.reducerPath] : usersApi.reducer,
        posts : postsReducer,
        users : usersReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(postsApi.middleware, usersApi.middleware)
            .prepend(sagaMiddleware)
    },
})

sagaMiddleware.run(sagaPostsWatcher)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>