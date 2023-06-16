import React from "react";
import { Link } from "react-router-dom";
import { Row, Image } from "react-bootstrap";

import { Loader } from "../../layouts/Loader/Loader";
import { Error } from "../../layouts/Error/Error";
import { useGetUserQuery } from "../../../services/usersApi";

interface IAuthorProps {
    userId: number;
}

export function Author({ userId }:IAuthorProps) {
    const { isLoading, error, data: user } = useGetUserQuery(userId)

    return (<Row className="mt-3 mb-5">
        { isLoading && <Loader /> }
        { error && <Error error={ error } /> }
        { user && <>
            <Link to={ `/profile/${ user.id }` } className="d-flex">
                <Image src="/avatar.svg" style={ { width : `25px` } } className="mx-1" roundedCircle />
                { user.name }
            </Link>
        </> }
    </Row>)
}