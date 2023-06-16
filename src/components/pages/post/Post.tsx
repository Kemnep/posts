import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

import { PostInfo } from "./PostInfo";
import { Comments } from "./Comments";
import { Loader } from "../../layouts/Loader/Loader";
import { useGetPostQuery } from "../../../services/postsApi";
import { Error } from "../../layouts/Error/Error";
import { Author } from "./Author";

export function Post() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoading, error, data: post } = useGetPostQuery(String(id))

    const handleBack = () => {
        navigate(-1)
    }

    return (<Container className="mt-3 mb-5">
        <Row className="my-2">
            <Button onClick={ handleBack } className="w-auto">Назад</Button>
        </Row>
        { isLoading && <Loader /> }
        { error && <Error error={ error } /> }
        { post && <>
            <PostInfo { ...post } />
            <Author userId={ post.userId } />
            <Comments userId={ String(id) } />
        </> }
    </Container>)
}