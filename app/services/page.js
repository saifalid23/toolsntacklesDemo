'use client';

import { useEffect } from 'react';
import './services.css';

const services = [
  {
    title: 'Armature Replacement',
    description: 'Expert replacement for burnt armatures in Drills & Grinders to restore full motor power.',
    icon: '🌀',
    tool: 'Drill/Grinder'
  },
  {
    title: 'Carbon Brush Change',
    description: 'Essential maintenance to prevent sparking and ensure smooth motor operation.',
    icon: '⚡',
    tool: 'Power Tool'
  },
  {
    title: 'Switch & Cord Repair',
    description: 'Repairing faulty triggers and damaged power cords for safe and reliable operation.',
    icon: '🔌',
    tool: 'Tool'
  },
  {
    title: 'Gearbox Greasing',
    description: 'Deep cleaning and high-grade lubrication for Rotary Hammers and heavy-duty gearboxes.',
    icon: '⚙️',
    tool: 'Rotary Hammer'
  },
  {
    title: 'Chuck Replacement',
    description: 'Precision replacement of worn-out or jammed drill chucks (Keyless/Keyed).',
    icon: '🛠️',
    tool: 'Drill'
  },
  {
    title: 'Battery Pack Diagnostic',
    description: 'Health check and performance testing for cordless tool lithium-ion batteries.',
    icon: '🔋',
    tool: 'Cordless Tool'
  },
  {
    title: 'Blade Sharpening',
    description: 'Professional sharpening for TCT blades and saw components to ensure clean cuts.',
    icon: '🪚',
    tool: 'Saw'
  }
];

export default function ServicesPage() {
  const handleBookRepair = (toolName) => {
    // Custom event to open chat and send message
    const event = new CustomEvent('open-chat-service', { 
      detail: { message: `I want to service my ${toolName}` } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="services-page">
      <header className="services-header">
        <div className="container">
          <h1 className="services-title">Professional Tool Servicing</h1>
          <p className="services-subtitle">
            Get your tools back in action with our expert repair services in Ranigunj.
          </p>
        </div>
      </header>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-wrap">
                  <span className="service-icon">{service.icon}</span>
                </div>
                <div className="service-content">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <button 
                    className="book-repair-btn"
                    onClick={() => handleBookRepair(service.title)}
                  >
                    Book Repair
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2>Not sure what's wrong?</h2>
            <p>Visit our store for a free 5-minute diagnostic by our master technicians.</p>
            <button 
              className="cta-primary-btn"
              onClick={() => handleBookRepair('General Tool')}
            >
              Consult with Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
