import React from "react";
import { IPostDetailProps } from "../../../data/posts";
import { Row } from "react-bootstrap";

export function PostInfo({ title, body }:IPostDetailProps) {
    return (<Row>
        <h1>{ title }</h1>

        <p>
            { body }
        </p>
    </Row>)
}