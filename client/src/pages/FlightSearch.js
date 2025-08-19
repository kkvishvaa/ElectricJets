import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/FlightSearch.css';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    departure: '',
    arrival: '',
    date: '',
    passengers: 1,
    category: 'all'
  });
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [emptyLegs, setEmptyLegs] = useState([]);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    loadPopularDestinations();
    loadEmptyLegs();
  }, []);

  const loadPopularDestinations = async () => {
    try {
      const response = await axios.get('https://electricjets.onrender.com/api/flights/destinations');
      if (response.data.success) {
        setPopularDestinations(response.data.destinations);
      }
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  };

  const loadEmptyLegs = async () => {
    try {
      const response = await axios.get('https://electricjets.onrender.com/api/flights/empty-legs');
      if (response.data.success) {
        setEmptyLegs(response.data.flights);
      }
    } catch (error) {
      console.error('Error loading empty legs:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.get('https://electricjets.onrender.com/api/flights/search', {
        params: searchParams
      });
      
      if (response.data.success) {
        setSearchResults(response.data.flights);
        setAirports(response.data.airports);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flight-search">
      <div className="search-header">
        <h1>Find Your Perfect Flight</h1>
        <p>Search private jets, discover empty legs, and book luxury travel</p>
      </div>

      <div className="search-tabs">
        <button 
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Flight Search
        </button>
        <button 
          className={`tab ${activeTab === 'empty-legs' ? 'active' : ''}`}
          onClick={() => setActiveTab('empty-legs')}
        >
          Empty Legs
        </button>
        <button 
          className={`tab ${activeTab === 'destinations' ? 'active' : ''}`}
          onClick={() => setActiveTab('destinations')}
        >
          Popular Destinations
        </button>
      </div>

      {activeTab === 'search' && (
        <div className="search-content">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label>From</label>
                <input
                  type="text"
                  name="departure"
                  value={searchParams.departure}
                  onChange={handleInputChange}
                  placeholder="Departure (e.g., JFK)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>To</label>
                <input
                  type="text"
                  name="arrival"
                  value={searchParams.arrival}
                  onChange={handleInputChange}
                  placeholder="Arrival (e.g., LAX)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Departure Date</label>
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Passengers</label>
                <select
                  name="passengers"
                  value={searchParams.passengers}
                  onChange={handleInputChange}
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} passenger{i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Aircraft Category</label>
                <select
                  name="category"
                  value={searchParams.category}
                  onChange={handleInputChange}
                >
                  <option value="all">All Categories</option>
                  <option value="light">Light Jets</option>
                  <option value="midsize">Midsize Jets</option>
                  <option value="heavy">Heavy Jets</option>
                </select>
              </div>
              
              <div className="form-group">
                <button type="submit" className="search-btn" disabled={loading}>
                  {loading ? 'Searching...' : 'Search Flights'}
                </button>
              </div>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="search-results">
              <h2>Available Flights ({searchResults.length})</h2>
              <div className="results-grid">
                {searchResults.map((flight) => (
                  <div key={flight.id} className={`flight-card ${flight.isEmptyLeg ? 'empty-leg' : ''}`}>
                    {flight.isEmptyLeg && <div className="empty-leg-badge">Empty Leg - Save {flight.price.discount}%</div>}
                    
                    <div className="flight-image">
                      <img src={flight.image} alt={flight.aircraft?.type || 'Aircraft'} />
                    </div>
                    
                    <div className="flight-info">
                      <h3>{flight.aircraft?.type || 'Aircraft'}</h3>
                      <p className="operator">{flight.aircraft?.operator}</p>
                      
                      <div className="flight-route">
                        <div className="departure">
                          <strong>{flight.departure.airport}</strong>
                          <span>{formatDateTime(flight.departure.time)}</span>
                        </div>
                        
                        <div className="flight-duration">
                          <div className="duration-line"></div>
                          <span>{flight.duration}</span>
                        </div>
                        
                        <div className="arrival">
                          <strong>{flight.arrival.airport}</strong>
                          <span>{formatDateTime(flight.arrival.time)}</span>
                        </div>
                      </div>
                      
                      <div className="flight-details">
                        <div className="capacity">
                          <i className="fas fa-users"></i>
                          Up to {flight.aircraft?.capacity} passengers
                        </div>
                        
                        <div className="amenities">
                          {flight.amenities?.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="amenity">{amenity}</span>
                          ))}
                          {flight.amenities?.length > 3 && (
                            <span className="amenity">+{flight.amenities.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flight-pricing">
                        {flight.isEmptyLeg && flight.price.original && (
                          <div className="original-price">
                            <span className="crossed-out">{formatPrice(flight.price.original)}</span>
                          </div>
                        )}
                        
                        <div className="current-price">
                          <span className="price">{formatPrice(flight.price.total)}</span>
                          <span className="price-label">Total</span>
                        </div>
                        
                        {flight.isEmptyLeg && (
                          <div className="savings">
                            Save {formatPrice(flight.price.savings)}
                          </div>
                        )}
                      </div>
                      
                      <button className="book-btn">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'empty-legs' && (
        <div className="empty-legs-content">
          <h2>Empty Leg Deals</h2>
          <p>Take advantage of discounted positioning flights</p>
          
          <div className="empty-legs-grid">
            {emptyLegs.map((flight) => (
              <div key={flight.id} className="empty-leg-card">
                <div className="discount-badge">{flight.discount}% OFF</div>
                
                <div className="flight-image">
                  <img src={flight.image} alt={flight.aircraft.type} />
                </div>
                
                <div className="flight-info">
                  <h3>{flight.aircraft.type}</h3>
                  
                  <div className="route">
                    <span>{flight.departure.airport}</span>
                    <i className="fas fa-arrow-right"></i>
                    <span>{flight.arrival.airport}</span>
                  </div>
                  
                  <div className="timing">
                    <span>{formatDateTime(flight.departure.time)}</span>
                    <span className="duration">{flight.duration}</span>
                  </div>
                  
                  <div className="pricing">
                    <div className="original-price">
                      <span className="crossed-out">{formatPrice(flight.originalPrice)}</span>
                    </div>
                    <div className="discounted-price">
                      <span className="price">{formatPrice(flight.discountedPrice)}</span>
                    </div>
                    <div className="savings">
                      Save {formatPrice(flight.savings)}
                    </div>
                  </div>
                  
                  <button className="book-btn">Book This Deal</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'destinations' && (
        <div className="destinations-content">
          <h2>Popular Destinations</h2>
          <p>Discover the most sought-after destinations for private jet travel</p>
          
          <div className="destinations-grid">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <div className="destination-image">
                  <img src={destination.image} alt={destination.city} />
                  <div className="destination-overlay">
                    <h3>{destination.city}</h3>
                    <p>{destination.description}</p>
                    <button className="explore-btn">Explore Flights</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
