import React, { useState } from "react";
import { IComment } from "../../../data/comments";
import { Button } from "react-bootstrap";
import { Comment } from "../post/Comment";

interface ICommentsProps {
    comments: IComment[];
}

export function UserPostsComments({ comments }:ICommentsProps) {
    const [ isShowComments, setIsShowComments ] = useState(false)

    return (<div className="mt-3">
        <div className="mb-4">
            <Button onClick={ () => setIsShowComments((prev) => !prev ) }>
                { isShowComments ? 'Скрыть комментарии' : 'Показать комментарии' }
            </Button>
        </div>

        { isShowComments && <div>
            { comments.map((comment) => <Comment key={ comment.id } { ...comment } />) }
        </div> }
    </div>)
}