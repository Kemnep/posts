import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ResponseErrorBoundary } from "./ResponseErrorBoundary";
import { RootErrorBoundary } from "./RootErrorBoundary";

export interface IErrorBoundaryProps {
    routeError: unknown;
}

export function ErrorBoundary() {
    const routeError = useRouteError()

    if (isRouteErrorResponse(routeError)) {
        return <ResponseErrorBoundary routeError={ routeError } />
    }

    return <RootErrorBoundary routeError={ routeError } />
}