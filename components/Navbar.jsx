'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand" id="navbar-brand">
          <span className="navbar-logo-icon">🔧</span>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">The Tool Shop HYD</span>
            <span className="navbar-brand-tagline">Hardware Store</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav--open' : ''}`} id="navbar-nav">
          <Link href="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <a href="tel:09154905787" className="navbar-link navbar-link--phone" onClick={() => setMenuOpen(false)}>
            📞 Call Now
          </a>
          <a
            href="https://wa.me/919154905787?text=Hi%2C%20I%20would%20like%20to%20know%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm navbar-cta"
            onClick={() => setMenuOpen(false)}
            id="navbar-whatsapp-btn"
          >
            💬 WhatsApp
          </a>
        </nav>

        <button
          className={`navbar-toggle ${menuOpen ? 'navbar-toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
