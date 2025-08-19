
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Compare.css';

export default function Compare() {
  const [jets, setJets] = useState([]);
  const [jetA, setJetA] = useState('');
  const [jetB, setJetB] = useState('');

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
    axios.get('/api/jets').then(res => setJets(res.data));
  }, []);

  const selectedJetA = Array.isArray(jets) ? jets.find(j => j.id === jetA) : undefined;
  const selectedJetB = Array.isArray(jets) ? jets.find(j => j.id === jetB) : undefined;
  const canCompare = selectedJetA && selectedJetB && jetA !== jetB;

  function compareFeature(valueA, valueB, type = 'number') {
    if (type === 'number') {
      const numA = parseFloat(valueA) || 0;
      const numB = parseFloat(valueB) || 0;
      if (numA > numB) return 'A';
      if (numB > numA) return 'B';
      return 'tie';
    }
    return 'tie';
  }

  function formatValue(value, unit = '') {
    if (typeof value === 'number') {
      return `${value.toLocaleString()}${unit}`;
    }
    return value || 'N/A';
  }

  return (
    <div className="compare-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="container">
          <h1>Compare Aircraft</h1>
          <p>Make informed decisions with side-by-side comparisons</p>
        </div>
      </div>
      
      <div className="container">
        {/* Jet Selector */}
        <div className="jet-selector">
          <h3 className="selector-title">Select Aircraft to Compare</h3>
          <div className="selector-grid">
            <div className="jet-select-group">
              <label className="jet-select-label">Aircraft A</label>
              <select
                value={jetA}
                onChange={(e) => setJetA(e.target.value)}
                className="jet-select"
              >
                <option value="">Choose first aircraft...</option>
                {jets.map(jet => (
                  <option key={jet.id} value={jet.id} disabled={jet.id === jetB}>
                    {jet.name} ({jet.type})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="jet-select-group">
              <label className="jet-select-label">Aircraft B</label>
              <select
                value={jetB}
                onChange={(e) => setJetB(e.target.value)}
                className="jet-select"
              >
                <option value="">Choose second aircraft...</option>
                {jets.map(jet => (
                  <option key={jet.id} value={jet.id} disabled={jet.id === jetA}>
                    {jet.name} ({jet.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            className="compare-button"
            disabled={!canCompare}
            onClick={() => {
              if (canCompare) {
                document.querySelector('.comparison-table').scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }
            }}
          >
            Compare Selected Aircraft
          </button>
        </div>

        {/* Comparison Table */}
        {canCompare && (
          <div className="comparison-table">
            <div className="table-header">
              <h2 className="table-title">Detailed Comparison</h2>
            </div>
            
            <div className="comparison-grid">
              {/* Headers */}
              <div className="grid-header">Specifications</div>
              <div className="grid-header">
                <div className="jet-header">
                  <div className="jet-image-compare">
                    <img 
                      src={getJetImage(selectedJetA.id)} 
                      alt={selectedJetA.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '◐';
                      }}
                    />
                  </div>
                  <div className="jet-name">{selectedJetA.name}</div>
                  <div className="jet-type">{selectedJetA.type}</div>
                </div>
              </div>
              <div className="grid-header">
                <div className="jet-header">
                  <div className="jet-image-compare">
                    <img 
                      src={getJetImage(selectedJetB.id)} 
                      alt={selectedJetB.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '◐';
                      }}
                    />
                  </div>
                  <div className="jet-name">{selectedJetB.name}</div>
                  <div className="jet-type">{selectedJetB.type}</div>
                </div>
              </div>

              {/* Capacity */}
              <div className="feature-row">
                <div className="feature-label">Passenger Capacity</div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.capacity, selectedJetB.capacity) === 'A' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetA.capacity)} passengers
                  </div>
                </div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.capacity, selectedJetB.capacity) === 'B' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetB.capacity)} passengers
                  </div>
                </div>
              </div>

              {/* Range */}
              <div className="feature-row">
                <div className="feature-label">Maximum Range</div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.range, selectedJetB.range) === 'A' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetA.range)} nm
                  </div>
                </div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.range, selectedJetB.range) === 'B' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetB.range)} nm
                  </div>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="feature-row">
                <div className="feature-label">Hourly Rate</div>
                <div className="feature-value">
                  {compareFeature(selectedJetB.hourlyRate, selectedJetA.hourlyRate) === 'A' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    ${formatValue(selectedJetA.hourlyRate || 0)}
                  </div>
                  <div className="value-secondary">per hour</div>
                </div>
                <div className="feature-value">
                  {compareFeature(selectedJetB.hourlyRate, selectedJetA.hourlyRate) === 'B' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    ${formatValue(selectedJetB.hourlyRate || 0)}
                  </div>
                  <div className="value-secondary">per hour</div>
                </div>
              </div>

              {/* Speed */}
              <div className="feature-row">
                <div className="feature-label">Cruise Speed</div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.speed || 500, selectedJetB.speed || 500) === 'A' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetA.speed || 500)} mph
                  </div>
                </div>
                <div className="feature-value">
                  {compareFeature(selectedJetA.speed || 500, selectedJetB.speed || 500) === 'B' && 
                    <div className="winner-badge">Best</div>}
                  <div className="value-highlight">
                    {formatValue(selectedJetB.speed || 500)} mph
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="feature-row">
                <div className="feature-label">Amenities</div>
                <div className="feature-value">
                  <div className="amenity-list">
                    {(selectedJetA.amenities || []).slice(0, 6).map((amenity, index) => (
                      <span key={index} className="amenity-item">{amenity}</span>
                    ))}
                    {(selectedJetA.amenities || []).length > 6 && (
                      <span className="amenity-item">+{selectedJetA.amenities.length - 6} more</span>
                    )}
                  </div>
                </div>
                <div className="feature-value">
                  <div className="amenity-list">
                    {(selectedJetB.amenities || []).slice(0, 6).map((amenity, index) => (
                      <span key={index} className="amenity-item">{amenity}</span>
                    ))}
                    {(selectedJetB.amenities || []).length > 6 && (
                      <span className="amenity-item">+{selectedJetB.amenities.length - 6} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="feature-row">
                <div className="feature-label">Aircraft Category</div>
                <div className="feature-value">
                  <div className="value-highlight">
                    {selectedJetA.category || selectedJetA.type}
                  </div>
                </div>
                <div className="feature-value">
                  <div className="value-highlight">
                    {selectedJetB.category || selectedJetB.type}
                  </div>
                </div>
              </div>
            </div>

            <div className="comparison-actions">
              <Link to="/booking" className="action-link">
                Book {selectedJetA.name}
              </Link>
              <Link to="/booking" className="action-link">
                Book {selectedJetB.name}
              </Link>
              <Link to="/jets" className="action-link secondary">
                View All Aircraft
              </Link>
            </div>
          </div>
        )}

        {!canCompare && (
          <div className="no-selection">
            <i>≏</i>
            <p>Select two different aircraft to see a detailed comparison</p>
          </div>
        )}
      </div>
    </div>
  );
}
