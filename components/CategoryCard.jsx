import Link from 'next/link';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={category.path || `/products?category=${category.slug}`}
      className="category-card"
      id={`category-${category.slug}`}
    >
      <div className="category-card-image-wrap">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-image"
          loading="lazy"
        />
        <div className="category-card-overlay"></div>
      </div>
      <div className="category-card-body">
        <span className="category-card-icon">{category.icon}</span>
        <h3 className="category-card-title">{category.name}</h3>
        <p className="category-card-desc">{category.description}</p>
        <span className="category-card-cta">
          View Products →
        </span>
      </div>
    </Link>
  );
}
