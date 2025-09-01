
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    axios.get('https://electricjets.onrender.com/api/deals').then(res => {
      setDeals(res.data);
      setFilteredDeals(res.data);
    });
    axios.get('https://electricjets.onrender.com/api/jets').then(res => setJets(res.data));
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(deals)
      ? deals.filter(deal => {
          return (
            (!filters.from || deal.from.toLowerCase().includes(filters.from.toLowerCase())) &&
            (!filters.to || deal.to.toLowerCase().includes(filters.to.toLowerCase())) &&
            (!filters.maxPrice || deal.price <= parseInt(filters.maxPrice))
          );
        })
      : [];

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
    <div className="min-h-screen bg-slate-50">
      {/* Professional Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-float"></div>
        <div className="container max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Exclusive Offers
            </span>
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
              Premium Flight Opportunities
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional value on repositioning flights and last-minute charters with savings up to 60%
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{filteredDeals.length}</div>
              <div className="text-slate-300 font-medium uppercase tracking-wider text-sm">Active Opportunities</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
              <div className="text-slate-300 font-medium uppercase tracking-wider text-sm">Maximum Savings</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-300 font-medium uppercase tracking-wider text-sm">Booking Available</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-8 py-16">
        {/* Professional Search and Filter Controls */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Departure
              </label>
              <input
                type="text"
                placeholder="From city..."
                value={filters.from}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Destination
              </label>
              <input
                type="text"
                placeholder="To city..."
                value={filters.to}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Maximum Budget
              </label>
              <input
                type="number"
                placeholder="Price limit..."
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Sort Options
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="price">Price (Low to High)</option>
                <option value="date">Departure Date</option>
                <option value="discount">Maximum Savings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.isArray(filteredDeals) && filteredDeals.map(deal => {
            const originalPrice = deal.price * 1.5;
            const discount = calculateDiscount(originalPrice, deal.price);
            const savings = originalPrice - deal.price;
            
            return (
              <div key={deal.id} className="group bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative">
                <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  discount >= 50 ? 'bg-red-600 text-white' :
                  discount >= 30 ? 'bg-orange-500 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {discount}% OFF
                </div>
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getJetImage(deal.jetId)} 
                    alt={getJetName(deal.jetId)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center text-6xl text-white/70">✈️</div>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {getJetName(deal.jetId)}
                  </h3>
                  
                  <div className="flex items-center justify-center mb-4 text-lg font-medium text-slate-700">
                    <span>{deal.from}</span>
                    <span className="mx-3 text-blue-600">→</span>
                    <span>{deal.to}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Departure</div>
                      <div className="text-slate-900 font-medium">{new Date(deal.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Type</div>
                      <div className="text-slate-900 font-medium">Repositioning</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-lg text-slate-500 line-through mb-1">
                      ${originalPrice.toLocaleString()}
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${deal.price.toLocaleString()}
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      You Save ${savings.toLocaleString()}
                    </div>
                    
                    {discount >= 40 && (
                      <div className="mt-3 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">
                        ⏰ {formatTimeRemaining(deal.date)}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                      Included Services
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">✓ Catering</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">✓ WiFi</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">✓ Transport</span>
                      {discount >= 50 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">✓ Priority</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      to="/booking" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                    >
                      Reserve Now
                    </Link>
                    <button className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:bg-slate-200 border border-slate-200">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredDeals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-slate-400 mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Deals Available</h3>
            <p className="text-slate-500">No opportunities match your criteria. Adjust your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
