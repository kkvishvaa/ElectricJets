
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Jets.css';

export default function Jets() {
  const [jets, setJets] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');

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
    axios.get('https://electricjets.onrender.com/api/jets').then(res => {
      setJets(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    let result = Array.isArray(jets)
      ? jets.filter(jet =>
          (jet.name.toLowerCase().includes(search.toLowerCase()) ||
           jet.type.toLowerCase().includes(search.toLowerCase())) &&
          (typeFilter === 'All' || jet.type === typeFilter)
        )
      : [];
    setFiltered(result);
  }, [search, jets, typeFilter]);

  const jetTypes = Array.isArray(jets) ? ['All', ...new Set(jets.map(jet => jet.type))] : ['All'];

  return (
    <div className="jets-page">
      {/* Hero Section */}
      <div className="jets-hero">
        <div className="container">
          <h1>Our Premium Fleet</h1>
          <p>Discover luxury aircraft for every journey</p>
        </div>
      </div>
      
      <div className="container">
        {/* Search and Filter Controls */}
        <div className="jets-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Search Aircraft</label>
              <input
                type="text"
                placeholder="Search by name or type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Aircraft Type</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                {jetTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jets Grid */}
        <div className="jets-grid">
          {Array.isArray(filtered) && filtered.map(jet => (
            <div key={jet.id} className="jet-card">
              <div className="jet-image">
                <img 
                  src={getJetImage(jet.id)} 
                  alt={jet.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '◐';
                  }}
                />
              </div>
              
              <h3 className="jet-title">{jet.name}</h3>
              
              <div className="jet-details">
                <div className="jet-detail">
                  <span className="jet-detail-label">Type:</span>
                  <span className="jet-detail-value">{jet.type}</span>
                </div>
                <div className="jet-detail">
                  <span className="jet-detail-label">Capacity:</span>
                  <span className="jet-detail-value">{jet.capacity} passengers</span>
                </div>
                <div className="jet-detail">
                  <span className="jet-detail-label">Range:</span>
                  <span className="jet-detail-value">{jet.range} nm</span>
                </div>
                <div className="jet-detail">
                  <span className="jet-detail-label">Hourly Rate:</span>
                  <span className="jet-detail-value">${jet.hourlyRate?.toLocaleString() || 'Contact for pricing'}</span>
                </div>
              </div>

              {jet.amenities && jet.amenities.length > 0 && (
                <div className="jet-amenities">
                  <div className="amenities-title">Amenities</div>
                  <div className="amenities-list">
                    {jet.amenities.slice(0, 6).map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                    {jet.amenities.length > 6 && (
                      <span className="amenity-tag">
                        +{jet.amenities.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="jet-actions">
                <Link to="/booking" className="action-btn btn-book">
                  Book Now
                </Link>
                <Link to="/pricing" className="action-btn btn-quote">
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="no-results">
            <i>◐</i>
            <p>No jets found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
