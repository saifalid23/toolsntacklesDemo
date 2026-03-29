import CategoryCard from './CategoryCard';
import { categories } from '@/data/categories';
import './FeaturedCategories.css';

export default function FeaturedCategories() {
  return (
    <section className="section featured-categories" id="categories">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            From hand tools to industrial supplies — find exactly what you need
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
