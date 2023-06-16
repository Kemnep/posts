import {IUser} from "./users";
import {IComment} from "./comments";

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
    user: IUser | void;
    comments: IComment[];
}

export interface IPostProps extends IPost {

}

export interface IPostDetailProps extends IPost {

}