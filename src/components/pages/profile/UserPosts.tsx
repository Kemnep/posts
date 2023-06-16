import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion } from "react-bootstrap";

import { useLazyGetPostsWithCommentsByUserIdQuery } from "../../../services/postsApi";
import { Loader } from "../../layouts/Loader/Loader";
import { Error } from "../../layouts/Error/Error";
import { UserPostsComments } from "./UserPostsComments";

interface IUserPostsProps {
    userId : string;
}

export function UserPosts({ userId }:IUserPostsProps) {
    const [isShowPosts, setIsShowPosts] = useState(false)
    const [fetchUserPosts, { isLoading, error, data:posts }] = useLazyGetPostsWithCommentsByUserIdQuery()

    const handleShowUserPosts = () => {
        setIsShowPosts((prev) => !prev)

        fetchUserPosts(userId)
    }

    return (<div className="mt-4">
        <div className="my-4">
            <Button onClick={ handleShowUserPosts }>
                { isShowPosts ? 'Скрыть посты' : 'Показать посты' }
            </Button>
        </div>

        { isLoading && <Loader /> }
        { error && <Error error={ error } /> }
        { (posts && isShowPosts) && <>
            <Accordion defaultActiveKey="0">
                { posts.map((post) => (<Accordion.Item key={ post.id } eventKey={ post.id.toString() }>
                    <Accordion.Header>
                        <span className="fw-medium">{ post.title }</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        { post.body }

                        <div className="d-flex justify-content-between mt-3">
                            { (post.comments && post.comments.length > 0) && <UserPostsComments comments={ post.comments } /> }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>)) }
            </Accordion>
        </> }
    </div>)
}