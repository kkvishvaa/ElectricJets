
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Deals.css';

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [jets, setJets] = useState([]);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    maxPrice: '',
    sortBy: 'price'
  });
  const [filteredDeals, setFilteredDeals] = useState([]);

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
    axios.get('/api/deals').then(res => {
      setDeals(res.data);
      setFilteredDeals(res.data);
    });
    axios.get('/api/jets').then(res => setJets(res.data));
  }, []);

  useEffect(() => {
    let filtered = deals.filter(deal => {
      return (
        (!filters.from || deal.from.toLowerCase().includes(filters.from.toLowerCase())) &&
        (!filters.to || deal.to.toLowerCase().includes(filters.to.toLowerCase())) &&
        (!filters.maxPrice || deal.price <= parseInt(filters.maxPrice))
      );
    });

    // Sort deals
    if (filters.sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filters.sortBy === 'discount') {
      filtered.sort((a, b) => calculateDiscount(b.price * 1.5, b.price) - calculateDiscount(a.price * 1.5, a.price));
    }

    setFilteredDeals(filtered);
  }, [deals, filters]);

  function getJetName(jetId) {
    const jet = jets.find(j => j.id === jetId);
    return jet ? jet.name : 'Premium Aircraft';
  }

  function calculateDiscount(originalPrice, dealPrice) {
    return Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
  }

  function handleFilterChange(field, value) {
    setFilters(prev => ({ ...prev, [field]: value }));
  }

  function getDealBadgeType(discount) {
    if (discount >= 50) return 'exclusive';
    if (discount >= 30) return 'limited-time';
    return '';
  }

  function formatTimeRemaining(date) {
    const now = new Date();
    const dealDate = new Date(date);
    const timeDiff = dealDate - now;
    const hoursRemaining = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60)));
    
    if (hoursRemaining < 24) {
      return `${hoursRemaining}h remaining`;
    }
    return `${Math.floor(hoursRemaining / 24)}d remaining`;
  }

  return (
    <div className="deals-page">
      {/* Hero Section */}
      <div className="deals-hero">
        <div className="container">
          <h1>Exclusive Flight Deals</h1>
          <p>Save up to 60% on last-minute flights and empty leg repositioning</p>
          
          <div className="deals-stats">
            <div className="stat-item">
              <div className="stat-number">{filteredDeals.length}</div>
              <div className="stat-label">Active Deals</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">60%</div>
              <div className="stat-label">Max Savings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Availability</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        {/* Search and Filter Controls */}
        <div className="deals-filters">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">From</label>
              <input
                type="text"
                placeholder="Departure city..."
                value={filters.from}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">To</label>
              <input
                type="text"
                placeholder="Destination city..."
                value={filters.to}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Max Price</label>
              <input
                type="number"
                placeholder="Maximum price..."
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                <option value="price">Price (Low to High)</option>
                <option value="date">Departure Date</option>
                <option value="discount">Biggest Savings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="deals-grid">
          {filteredDeals.map(deal => {
            const originalPrice = deal.price * 1.5; // Simulate original price
            const discount = calculateDiscount(originalPrice, deal.price);
            const savings = originalPrice - deal.price;
            
            return (
              <div key={deal.id} className="deal-card">
                <div className={`deal-badge ${getDealBadgeType(discount)}`}>
                  {discount}% OFF
                </div>
                
                <div className="deal-image">
                  <img 
                    src={getJetImage(deal.jetId)} 
                    alt={getJetName(deal.jetId)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '◐';
                    }}
                  />
                </div>
                
                <div className="deal-content">
                  <h3 className="deal-title">{getJetName(deal.jetId)}</h3>
                  
                  <div className="deal-route">
                    <span>{deal.from}</span>
                    <span className="route-arrow">→</span>
                    <span>{deal.to}</span>
                  </div>
                  
                  <div className="deal-details">
                    <div className="detail-item">
                      <div className="detail-label">Departure</div>
                      <div className="detail-value">{new Date(deal.date).toLocaleDateString()}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Flight Type</div>
                      <div className="detail-value">Empty Leg</div>
                    </div>
                  </div>
                  
                  <div className="price-section">
                    <div className="original-price">
                      ${originalPrice.toLocaleString()}
                    </div>
                    <div className="deal-price">
                      ${deal.price.toLocaleString()}
                    </div>
                    <div className="savings">
                      Save ${savings.toLocaleString()}
                    </div>
                    
                    {discount >= 40 && (
                      <div className="countdown-timer">
                        ◉ {formatTimeRemaining(deal.date)}
                      </div>
                    )}
                  </div>
                  
                  <div className="deal-features">
                    <div className="features-title">Included</div>
                    <div className="features-list">
                      <span className="feature-tag">✓ Catering</span>
                      <span className="feature-tag">✓ WiFi</span>
                      <span className="feature-tag">✓ Ground Transport</span>
                      {discount >= 50 && <span className="feature-tag">✓ Priority Boarding</span>}
                    </div>
                  </div>
                  
                  <div className="deal-actions">
                    <Link to="/booking" className="action-btn btn-book">
                      Book Deal
                    </Link>
                    <button className="action-btn btn-details">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredDeals.length === 0 && (
          <div className="no-deals">
            <i>◐</i>
            <p>No deals match your criteria. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  );
}
