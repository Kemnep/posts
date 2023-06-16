import React from "react";
import { isAxiosError } from "axios";
import Alert from "react-bootstrap/Alert";

import { isFetchBaseQueryError, isErrorWithMessage } from "../../../services/helpers";

interface ErrorProps {
    error : unknown;
}

export function Error({ error } : ErrorProps) {
    let message = ""

    if (isAxiosError(error)) {
        message = error.message
    } else if (isFetchBaseQueryError(error)) {
        message = 'error' in error ? error.error : JSON.stringify(error.data)
    } else if (isErrorWithMessage(error)) {
        message = error.message
    }

    return (<Alert variant="danger">
        { message }
    </Alert>)
}