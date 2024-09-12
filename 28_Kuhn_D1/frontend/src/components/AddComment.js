// frontend/src/components/AddComment.js
import React, { Component } from 'react';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            content: '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert('Comment added: ' + JSON.stringify(this.state));
    };

    render() {
        const { author, content } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="add-comment-form">
                <h3>Add a Comment</h3>
                <div>
                    <label>Author: </label>
                    <input type="text" name="author" value={author} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Comment: </label>
                    <textarea name="content" value={content} onChange={this.handleChange} required />
                </div>
                <button type="submit">Add Comment</button>
            </form>
        );
    }
}

export default AddComment;
