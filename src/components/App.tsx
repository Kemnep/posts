import React from "react";
import { RouterProvider, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/scss/bootstrap.scss";

import { store } from "../redux/store";
import router from "./Router";

function App() {
    return <Provider store={ store }>
        <RouterProvider router={ router } />
    </Provider>
}

export default App