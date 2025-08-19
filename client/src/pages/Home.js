import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [memberType, setMemberType] = useState('Jet Card');
  const [featuredJets, setFeaturedJets] = useState([]);

  // Jet images array
  const jetImages = [
    '/jet1.png',
    '/jet2.png', 
    '/jet3.png',
    '/jet4.png',
    '/jet5.png',
    '/jet6.png',
    '/jet7.png',
    '/jet8.png'
  ];

  // Function to get image for jet
  const getJetImage = (jetId) => {
    const imageIndex = (jetId - 1) % jetImages.length;
    return jetImages[imageIndex];
  };

  useEffect(() => {
    axios.get('https://electricjets.onrender.com/api/jets').then(res => setFeaturedJets(res.data.slice(0, 2)));
  }, []);

  return (
    <div className="home">
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Luxury Private Jet Charter</h1>
          <p className="hero-subtitle">
            Experience the pinnacle of luxury travel with our premium jet charter services
          </p>
          
          <div className="cta-buttons">
            <Link to="/jets" className="cta-primary">
              Browse Jets
            </Link>
            <Link to="/deals" className="cta-secondary">
              View Deals
            </Link>
            <Link to="/pricing" className="cta-tertiary">
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Membership Section */}
      <section className="membership-section">
        <div className="container">
          <div className="membership-card">
            <h3>Membership Options</h3>
            <div className="membership-toggle">
              {['Jet Card', 'Single Charter'].map(type => (
                <button
                  key={type}
                  onClick={() => setMemberType(type)}
                  className={`toggle-btn ${memberType === type ? 'active' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="membership-description">
              {memberType === 'Jet Card' 
                ? 'Pre-pay for flight hours with guaranteed availability and fixed pricing. Enjoy priority access to our premium fleet with transparent, all-inclusive rates.'
                : 'Pay per flight with flexible scheduling and aircraft selection. Perfect for occasional travelers seeking luxury without long-term commitments.'
              }
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Jets Section */}
      <section className="featured-jets">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Featured Aircraft</h3>
          </div>
          <div className="jets-grid">
            {Array.isArray(featuredJets) && featuredJets.map(jet => (
              <div key={jet.id} className="jet-card">
                <div className="jet-image-home">
                  <img 
                    src={getJetImage(jet.id)} 
                    alt={jet.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '◐';
                    }}
                  />
                </div>
                <h4>{jet.name}</h4>
                <div className="jet-details">
                  <div className="jet-detail">
                    <span><strong>Type:</strong></span>
                    <span>{jet.type}</span>
                  </div>
                  <div className="jet-detail">
                    <span><strong>Capacity:</strong></span>
                    <span>{jet.capacity} passengers</span>
                  </div>
                  <div className="jet-detail">
                    <span><strong>Range:</strong></span>
                    <span>{jet.range} nm</span>
                  </div>
                  <div className="jet-detail">
                    <span><strong>Speed:</strong></span>
                    <span>{jet.speed} mph</span>
                  </div>
                </div>
                <Link to="/jets" className="jet-link">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
