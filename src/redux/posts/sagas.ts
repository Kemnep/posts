import { call, put, select, takeEvery, SagaReturnType, delay } from "redux-saga/effects"

import { setPosts, fetchPosts, setPaginationCount, setLoading, setError } from "./slice";
import { setUsers } from "./../users/slice";
import {getPagination, getSearchString, getSort} from "./selectors";

import { fetchUsersByIds } from "../../services/users";
import { fetchPosts as fetchPostsAxios } from "../../services/posts";
import { getUserIdsFormPosts } from "../../utils/posts";

export function* sagaPostsWatcher () {
    yield takeEvery(fetchPosts.type, fetchPostsWorker)
}

function* fetchPostsWorker() {
    try {
        yield delay(500)

        const pagination = getPagination(yield  select())
        const searchString = getSearchString(yield select())
        const sort = getSort(yield select())
        const data:SagaReturnType<typeof fetchPostsAxios> = yield call(fetchPostsAxios, pagination.currentPage, pagination.perPage, searchString, sort)

        const userIds = getUserIdsFormPosts(data.posts)
        const users:SagaReturnType<typeof fetchUsersByIds> = yield call(fetchUsersByIds, userIds)

        yield put(setUsers(users))
        yield put(setPosts(data.posts))
        yield put(setPaginationCount(data.count))

        yield put(setLoading(false))
    } catch (e:unknown) {
        yield put(setError(e))
    }
}