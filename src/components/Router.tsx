import { createBrowserRouter, createHashRouter } from "react-router-dom";

import { ErrorBoundary } from "./pages/errors/ErrorBoundary";
import { Main } from "./templates/Main/Main";
import { Profile } from "./pages/profile/Profile";

//Публичная часть
const MainRouter = {
    path: "/",
    async lazy() {
        const { Main } = await import("./templates/Main/Main")

        return { Component: Main }
    },
    errorElement: <ErrorBoundary />,
    children: [
        {
            path: "",
            index: true,
            async lazy() {
                const { Posts } = await import("./pages/posts/Posts")

                return { Component: Posts }
            },
        },
        {
            path: "/posts/:id",
            async lazy() {
                const { Post } = await import("./pages/post/Post")

                return { Component: Post }
            },
        }
    ],
}

//Профиль пользователя
const ProfileRouter = {
    path: "/profile",
    async lazy() {
        const { Profile } = await import("./templates/Profile/Profile")

        return { Component: Profile }
    },
    errorElement: <ErrorBoundary />,
    children: [
        {
            path: "",
            async lazy() {
                const { Profile } = await import("./pages/profile/Profile")

                return { Component: Profile }
            },
        },
        {
            path: "/profile/:id",
            async lazy() {
                const { Profile } = await import("./pages/profile/Profile")

                return { Component: Profile }
            },
        }
    ]
}

const router = createHashRouter([
    MainRouter,
    ProfileRouter
])

export default router