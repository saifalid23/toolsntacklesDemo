'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ProductCard from '@/components/ProductCard';
import './products.css';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  // Sync URL category param
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.trade.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Trade filter
    if (selectedTrades.length > 0) {
      result = result.filter((p) => selectedTrades.includes(p.trade));
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return result;
  }, [search, selectedCategories, selectedBrands, selectedTrades, sortBy]);

  const activeFilterCount =
    selectedCategories.length + selectedBrands.length + selectedTrades.length;

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedTrades([]);
    setSortBy('default');
    setSearch('');
  };

  return (
    <div className="products-page">
      {/* Page header */}
      <div className="products-hero">
        <div className="container">
          <h1 className="products-hero-title">Our Products</h1>
          <p className="products-hero-subtitle">
            Browse our complete range of hardware, tools & supplies
          </p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Top bar: search + mobile filter toggle */}
        <div className="products-top-bar">
          <SearchBar
            value={search}
            onChange={setSearch}
            resultCount={filteredProducts.length}
          />
          <FilterPanel
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedBrands={selectedBrands}
            onBrandChange={setSelectedBrands}
            selectedTrades={selectedTrades}
            onTradeChange={setSelectedTrades}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearAll={handleClearAll}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="products-content">
          {/* Desktop sidebar filter */}
          <div className="products-sidebar">
            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
              selectedTrades={selectedTrades}
              onTradeChange={setSelectedTrades}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearAll={handleClearAll}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Product grid */}
          <div className="products-grid-area">
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="active-filters" id="active-filters">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    className="filter-chip"
                    onClick={() =>
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat)
                      )
                    }
                  >
                    {cat.replace(/-/g, ' ')} ✕
                  </button>
                ))}
                {selectedBrands.map((brand) => (
                  <button
                    key={brand}
                    className="filter-chip"
                    onClick={() =>
                      setSelectedBrands(
                        selectedBrands.filter((b) => b !== brand)
                      )
                    }
                  >
                    {brand} ✕
                  </button>
                ))}
                {selectedTrades.map((trade) => (
                  <button
                    key={trade}
                    className="filter-chip"
                    onClick={() =>
                      setSelectedTrades(
                        selectedTrades.filter((t) => t !== trade)
                      )
                    }
                  >
                    {trade} ✕
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="products-grid" id="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="products-empty" id="products-empty">
                <span className="products-empty-icon">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button
                  className="btn btn-primary"
                  onClick={handleClearAll}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
