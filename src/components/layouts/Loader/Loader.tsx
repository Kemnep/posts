import React from "react";
import { Spinner } from "react-bootstrap";

export function Loader() {
    return (<div>
        <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">
                Идёт загрузка.. Пожалуйста подождите..
            </span>
        </Spinner>
    </div>)
}