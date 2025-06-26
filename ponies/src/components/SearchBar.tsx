import React from 'react';
import '../styles/App.css';

export default function SearchBar({
    handleSearch
}: {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="center-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search players..."
                onChange={handleSearch}
            />
        </div>
    );
}