import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section className="contact-cta" id="contact-cta">
      <div className="container contact-cta-inner">
        <div className="contact-cta-content">
          <h2 className="contact-cta-title">Need Help Finding the Right Tool?</h2>
          <p className="contact-cta-text">
            Our team of experts is ready to help you find exactly what you need.
            Call us or send a WhatsApp message — we respond quickly!
          </p>
        </div>
        <div className="contact-cta-actions">
          <a
            href="tel:09154905787"
            className="btn btn-lg contact-cta-call"
            id="cta-call-btn"
          >
            📞 Call Now
            <span className="contact-cta-number">9154905787</span>
          </a>
          <a
            href="https://wa.me/919154905787?text=Hi%2C%20I%20need%20help%20finding%20a%20product"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg contact-cta-whatsapp"
            id="cta-whatsapp-btn"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
