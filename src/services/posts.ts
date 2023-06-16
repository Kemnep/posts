import axios, { AxiosHeaders } from "axios";

import { getStartAndLimit } from "../utils/pagination";
import { IPost } from "../data/posts";
import {TSort} from "../redux/posts/slice";

export const fetchPosts = async (page:number, perPage:number, searchQuery:string='', sort:TSort='') => {
    let count = 0
    const params = getStartAndLimit(page, perPage)
    const url = `https://jsonplaceholder.typicode.com/posts?_start=${ params.start }&_limit=${ params.limit }&title_like=${ searchQuery }&_sort=title&_order=${ sort }`

    const response = await axios.get<IPost[]>(url)

    if (response.headers instanceof AxiosHeaders && response.headers.has('x-total-count')) {
        count = Number(response.headers.get('x-total-count'))
    }

    return {
        posts : response.data,
        count
    }
}