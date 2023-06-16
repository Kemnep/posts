import React from "react";
import { Card } from "react-bootstrap";

import { ICommentProps } from "../../../data/comments";

export function Comment({ id, postId, name, email, body }:ICommentProps) {
    return (<Card className="mb-3">
        <Card.Header as="h5">{ email }</Card.Header>
        <Card.Body>
            <Card.Title>{ name }</Card.Title>
            <Card.Text>
                { body }
            </Card.Text>
        </Card.Body>
    </Card>)
}