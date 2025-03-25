import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({
    handleSearch
}: {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search players..."
                onChange={handleSearch}
            />
            <button className="search-button">Search</button>
        </div>
    );
}