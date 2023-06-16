import React, { useCallback, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Comment } from "./Comment";
import { Loader } from "../../layouts/Loader/Loader";
import { Error } from "../../layouts/Error/Error";
import { useAppDispatch } from "../../../hooks/redux";
import { wait } from "@testing-library/user-event/dist/utils";
import { IComment } from "../../../data/comments";


interface ICommentsProps {
    userId : string;
}

export function Comments({ userId }:ICommentsProps) {
    const dispatch = useAppDispatch()
    const [ isShowComment, setIsShowComments ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState<AxiosError>()
    const [ comments, setComments ] = useState<IComment[]>([])

    const getComments = createAsyncThunk(`posts/loadComments`, async (postId:string) => {
        try {
            setIsLoading(true)
            const response = await axios.get<IComment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            await wait(500)
            setComments(response.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error as AxiosError)
        }
    })

    const handleShowComments = () => {
        setIsShowComments((prev => !prev))

        if (!isShowComment && comments.length === 0) {
            dispatch(getComments(userId))
        }
    }

    return (<>
        <Row className="mt-3 justify-content-center">
            <Button onClick={ handleShowComments} className="w-auto">
                { isShowComment ? 'Скрыть комментарии' : 'Показать комментарии' }
            </Button>
        </Row>
        { isShowComment && <Row className="mt-3">
            { isLoading && <Loader /> }
            { error && <Error error={ error } /> }
            { comments && comments.length > 0 && comments.map((comment) => {
                return <Comment { ...comment } key={ comment.id } />
            }) }
        </Row> }
    </>)
}