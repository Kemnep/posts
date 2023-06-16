import { IPost } from "../data/posts";
import { IUser } from "../data/users";

interface IUsersList {
    [key:number] : IUser;
}

export const mergePostsWithUsers = (posts:IPost[], users:IUser[]):IPost[] => {
    const usersList:IUsersList = {}

    users.forEach((user) => {
        usersList[user.id] = user
    })

    return posts.map(post => ({
            ...post,
            ...{
                user : usersList[post.userId]
            }
        })
    )
}

export const getUserIdsFormPosts = (posts:IPost[]) => {
    const ids:number[] = []

    posts.forEach((post) => {
        if (!ids.includes(post.userId)) ids.push(post.userId)
    })

    return ids
}