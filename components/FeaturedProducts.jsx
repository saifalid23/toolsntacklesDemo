import ProductCard from './ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="section featured-products" id="featured-products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Top-selling tools and hardware from trusted brands
          </p>
        </div>
        <div className="featured-products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="featured-products-cta">
          <Link href="/products" className="btn btn-secondary btn-lg" id="view-all-products-btn">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
