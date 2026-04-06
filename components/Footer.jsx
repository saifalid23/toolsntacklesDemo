import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🔧</span>
              <div>
                <span className="footer-brand-name">The Tool Shop HYD</span>
                <span className="footer-brand-tagline">Hardware Store</span>
              </div>
            </div>
            <p className="footer-desc">
              Your trusted hardware partner in Secunderabad. Quality tools, fair prices,
              and expert advice for every project.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">All Products</Link></li>
              <li><Link href="/products?category=hand-tools">Hand Tools</Link></li>
              <li><Link href="/products?category=power-tools">Power Tools</Link></li>
              <li><Link href="/products?category=electrical">Electrical</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link href="/products?category=plumbing">Plumbing</Link></li>
              <li><Link href="/products?category=fasteners">Fasteners</Link></li>
              <li><Link href="/products?category=safety-gear">Safety Gear</Link></li>
              <li><Link href="/products?category=industrial">Industrial</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>📍 Ranigunj, Secunderabad, Telangana</li>
              <li>
                📞{' '}
                <a href="tel:09154905787">099590 48707</a>
              </li>
              <li>🕐 Mon–Sat: 9 AM – 8 PM</li>
              <li>🕐 Sun: 10 AM – 6 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} The Tool Shop HYD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
