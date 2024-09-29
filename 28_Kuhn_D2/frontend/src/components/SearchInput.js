// frontend/src/components/SearchInput.js
import React, { Component } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert(`Searching for: ${this.state.searchTerm}`);
    };

    render() {
        const { searchTerm } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="search-input-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={this.handleChange}
                    placeholder="Search..."
                    required
                />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchInput;
