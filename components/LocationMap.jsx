import './LocationMap.css';

export default function LocationMap() {
  return (
    <section className="section location-section" id="location">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Visit Our Store</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Conveniently located in Ranigunj, Secunderabad
          </p>
        </div>
        <div className="location-grid">
          <div className="location-info">
            <div className="location-detail">
              <span className="location-icon">📍</span>
              <div>
                <h3 className="location-label">Address</h3>
                <p>Ranigunj, Secunderabad,<br />Telangana, India</p>
              </div>
            </div>
            <div className="location-detail">
              <span className="location-icon">📞</span>
              <div>
                <h3 className="location-label">Phone</h3>
                <p>
                  <a href="tel:09959048707" className="location-link">
                    099590 48707
                  </a>
                </p>
              </div>
            </div>
            <div className="location-detail">
              <span className="location-icon">🕐</span>
              <div>
                <h3 className="location-label">Business Hours</h3>
                <p>Mon – Sat: 9:00 AM – 8:00 PM</p>
                <p>Sunday: 10:00 AM – 6:00 PM</p>
              </div>
            </div>
            <div className="location-detail">
              <span className="location-icon">💬</span>
              <div>
                <h3 className="location-label">WhatsApp</h3>
                <a
                  href="https://wa.me/919959048707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-link"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.4983!3d17.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzIzLjYiTiA3OMKwMjknNTMuOSJF!5e0!3m2!1sen!2sin!4v1600000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tools & Tackles store location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
