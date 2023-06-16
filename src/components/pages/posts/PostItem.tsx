import React from "react";
import { Accordion, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IPostProps } from "../../../data/posts";

export function PostItem({ id, title, body, user, userId }:IPostProps) {
    return (<Accordion.Item eventKey={ id.toString() }>
        <Accordion.Header>
            <span className="fw-medium">{ title }</span>
        </Accordion.Header>
        <Accordion.Body>
            { body }

            <div className="d-flex justify-content-between mt-3">
                { user ? <div>
                    <Link to={ `/profile/${ user.id }` }>
                        <Image src="/avatar.svg" style={ { width : `25px` } } className="mx-1" roundedCircle />
                        { user.name }
                    </Link>
                </div> : null }

                <div className="">
                    <Button href={ `/posts/${ id }` }>
                        Подробнее
                    </Button>
                </div>
            </div>
        </Accordion.Body>
    </Accordion.Item>)
}