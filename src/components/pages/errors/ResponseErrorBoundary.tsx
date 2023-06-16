import React from "react";
import { Link } from "react-router-dom";

import { ErrorResponse } from "../../../data/errors";
import { IErrorBoundaryProps } from "./ErrorBoundary";

export function ResponseErrorBoundary({ routeError }:IErrorBoundaryProps) {
    const error = routeError as ErrorResponse

    if (error.status === 404) {
        return (<div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Упс!</span> Страница не найдена.</p>
                <p className="lead">
                    Страница, которую вы ищете, не существует.
                </p>
                <Link to="/" className="btn btn-primary">Вернуться на главную страницу</Link>
            </div>
        </div>)
    }

    return (<div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 fw-bold">{ error.status }</h1>
            <p className="fs-3">{ error.statusText }</p>
            <Link to="/" className="btn btn-primary">Вернуться на главную страницу</Link>
        </div>
    </div>)
}