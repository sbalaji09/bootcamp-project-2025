import React from 'react';
import style from './comment.module.css';

export type IComment = {
    user: string;
    comment: string;
    time: Date;
}

type CommentProps = {
    comment: IComment;
}

/**
 * Parses a Date object into a readable format like "September 16 2024 8:30AM"
 */
function parseCommentTime(time: Date): string {
    const date = new Date(time);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${month} ${day} ${year} ${hours}:${minutesStr}${ampm}`;
}

function Comment({ comment }: CommentProps) {
    return (
        <div className={style.comment}>
            <div className={style.commentHeader}>
                <h4 className={style.commentUser}>{comment.user}</h4>
                <span className={style.commentTime}>{parseCommentTime(comment.time)}</span>
            </div>
            <p className={style.commentText}>{comment.comment}</p>
        </div>
    );
}

export default Comment;
