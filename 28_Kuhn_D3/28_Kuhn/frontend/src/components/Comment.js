// frontend/src/components/Comment.js
import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: props.author || 'Anonymous',
            content: props.content || '',
        };
    }

    render() {
        const { author, content } = this.state;

        return (
            <div className="comment">
                <h4>{author}</h4>
                <p>{content}</p>
            </div>
        );
    }
}

export default Comment;
