'use client';

import './SearchBar.css';

export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar-inner">
        <span className="search-bar-icon">🔍</span>
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search tools, brands, trades..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="search-input"
          aria-label="Search products"
        />
        {value && (
          <button
            className="search-bar-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
            id="search-clear-btn"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <span className="search-bar-count">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
