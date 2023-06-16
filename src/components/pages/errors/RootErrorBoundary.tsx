import React from "react";
import { IErrorBoundaryProps } from "./ErrorBoundary";
import {Link} from "react-router-dom";

export function RootErrorBoundary({ routeError }:IErrorBoundaryProps) {
    const error = routeError as Error

    return (<div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 fw-bold">ОШИБКА</h1>
            <p className="fs-3">{ error.message || JSON.stringify(error) }</p>
        </div>
    </div>)
}