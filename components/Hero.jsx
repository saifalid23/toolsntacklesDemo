import Link from 'next/link';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img
          src="/images/hero-banner.png"
          alt="The Tool Shop HYD hardware store"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="container hero-content">
        <div className="hero-badge">🏪 Your Local Hardware Partner</div>
        <h1 className="hero-title">
          All Hardware & Tools
          <span className="hero-title-accent"> Under One Roof</span>
        </h1>
        <p className="hero-subtitle">
          Quality tools, electrical supplies, plumbing fittings, and industrial hardware
          — everything you need for every project, from Bosch to Stanley.
        </p>
        <div className="hero-actions">
          <Link href="/products" className="btn btn-primary btn-lg" id="hero-browse-btn">
            Browse Products
          </Link>
          <a
            href="tel:09154905787"
            className="btn btn-outline btn-lg hero-call-btn"
            id="hero-call-btn"
          >
            📞 Call Us
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">500+</span>
            <span className="hero-stat-label">Products</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">50+</span>
            <span className="hero-stat-label">Brands</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">15+</span>
            <span className="hero-stat-label">Years</span>
          </div>
        </div>
      </div>
    </section>
  );
}
