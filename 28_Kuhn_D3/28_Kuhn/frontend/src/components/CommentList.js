// frontend/src/components/CommentList.js
import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments || [],
        };
    }

    render() {
        const { comments } = this.state;

        return (
            <div className="comment-list">
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Comment key={index} author={comment.author} content={comment.content} />
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        );
    }
}

export default CommentList;
