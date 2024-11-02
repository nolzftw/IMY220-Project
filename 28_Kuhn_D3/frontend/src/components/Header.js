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
      <nav className="grid grid-cols-3 grid-rows-2 bg-slate-500">
        <div className="col-start-2 row-start-1 flex justify-center gap-4">
          <Link to="/home" className="hover:text-yellow-400 hover:underline">Home</Link>
          <Link to={`/profile/${this.props.id}`} className="hover:text-yellow-400 hover:underline">Profile</Link>
        </div>
        <div className="col-start-3 row-start-1">
          <SearchInput onSearch={this.handleSearch}  />
        </div>
      </nav>
    );
  }
}

export default Header;
