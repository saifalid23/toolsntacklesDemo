'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';
import { brands, trades } from '@/data/products';
import './FilterPanel.css';

export default function FilterPanel({
  selectedCategories,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  selectedTrades,
  onTradeChange,
  sortBy,
  onSortChange,
  onClearAll,
  activeFilterCount,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleArrayItem = (arr, item, setter) => {
    if (arr.includes(item)) {
      setter(arr.filter((i) => i !== item));
    } else {
      setter([...arr, item]);
    }
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        className="filter-mobile-toggle btn btn-ghost"
        onClick={() => setMobileOpen(!mobileOpen)}
        id="filter-toggle-btn"
      >
        🎛️ Filters
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="filter-backdrop"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Filter panel */}
      <aside className={`filter-panel ${mobileOpen ? 'filter-panel--open' : ''}`} id="filter-panel">
        <div className="filter-panel-header">
          <h3 className="filter-panel-title">Filters</h3>
          {activeFilterCount > 0 && (
            <button
              className="filter-clear-all"
              onClick={onClearAll}
              id="filter-clear-all-btn"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
          <button
            className="filter-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <h4 className="filter-group-title">Sort By</h4>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            id="sort-select"
          >
            <option value="default">Default</option>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Category filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">Category</h4>
          <div className="filter-options">
            {categories.map((cat) => (
              <label key={cat.id} className="filter-checkbox" id={`filter-cat-${cat.slug}`}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() =>
                    toggleArrayItem(selectedCategories, cat.slug, onCategoryChange)
                  }
                />
                <span className="filter-checkbox-custom"></span>
                <span className="filter-checkbox-label">
                  {cat.icon} {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">Brand</h4>
          <div className="filter-options">
            {brands.map((brand) => (
              <label key={brand} className="filter-checkbox" id={`filter-brand-${brand.toLowerCase()}`}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleArrayItem(selectedBrands, brand, onBrandChange)
                  }
                />
                <span className="filter-checkbox-custom"></span>
                <span className="filter-checkbox-label">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Trade filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">Trade / Use</h4>
          <div className="filter-options">
            {trades.map((trade) => (
              <label key={trade} className="filter-checkbox" id={`filter-trade-${trade.toLowerCase()}`}>
                <input
                  type="checkbox"
                  checked={selectedTrades.includes(trade)}
                  onChange={() =>
                    toggleArrayItem(selectedTrades, trade, onTradeChange)
                  }
                />
                <span className="filter-checkbox-custom"></span>
                <span className="filter-checkbox-label">{trade}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile apply button */}
        <div className="filter-mobile-apply">
          <button
            className="btn btn-primary"
            onClick={() => setMobileOpen(false)}
            style={{ width: '100%' }}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
