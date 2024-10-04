// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearch = (searchTerm, searchType) => {
    // Redirect to SearchPage with both query and category
    this.props.navigate(`/search?q=${searchTerm}&type=${searchType}`);
  };

  render() {
    return (
      <nav>
        <Link to="/home">Home</Link>
        <Link to={`/profile/${this.props.id}`}>Profile</Link>
        <SearchInput onSearch={this.handleSearch} /> {/* Add SearchInput */}
      </nav>
    );
  }
}

export default Header;
