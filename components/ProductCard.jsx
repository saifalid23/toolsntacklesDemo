import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card" id={`product-${product.id}`}>
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        {product.featured && (
          <span className="product-card-badge">⭐ Featured</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-brand">{product.brand}</span>
          <span className="product-card-trade">{product.trade}</span>
        </div>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          {product.price && (
            <span className="product-card-price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
          <a
            href={`https://wa.me/919959048707?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm product-card-cta"
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
