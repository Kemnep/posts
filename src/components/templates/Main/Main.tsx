import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../layouts/Navigation/Navigation";
import { Footer } from "../../layouts/Footer/Footer";

export function Main() {
    return (<div className="d-flex flex-column min-vh-100">
        <Navigation />
        <Outlet />
        <Footer />
    </div>)
}