
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div className="min-h-screen bg-slate-50">
      {/* Professional Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-float"></div>
        <div className="container max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Executive Fleet
            </span>
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
              Premium Aircraft Collection
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore our meticulously maintained fleet of luxury aircraft, each offering uncompromising safety, comfort, and performance
            </p>
          </div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-8 py-16">
        {/* Professional Search and Filter Controls */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Search Aircraft
              </label>
              <input
                type="text"
                placeholder="Search by name or type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Aircraft Category
              </label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {jetTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Categories' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Professional Jets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.isArray(filtered) && filtered.map(jet => (
            <div key={jet.id} className="group bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={getJetImage(jet.id)} 
                  alt={jet.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center text-6xl text-white/70">✈️</div>';
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  Available
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                  {jet.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Type</span>
                    <span className="text-slate-900 font-semibold">{jet.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Capacity</span>
                    <span className="text-slate-900 font-semibold">{jet.capacity} Passengers</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Range</span>
                    <span className="text-slate-900 font-semibold">{jet.range} NM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Hourly Rate</span>
                    <span className="text-blue-600 font-bold text-lg">
                      ${jet.hourlyRate?.toLocaleString() || 'Contact for pricing'}
                    </span>
                  </div>
                </div>

                {jet.amenities && jet.amenities.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                      Key Features
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {jet.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {amenity}
                        </span>
                      ))}
                      {jet.amenities.length > 4 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          +{jet.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Link 
                    to="/booking" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                  >
                    Charter Now
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-slate-200 border border-slate-200"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-slate-400 mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Aircraft Found</h3>
            <p className="text-slate-500">No jets match your current search criteria. Please adjust your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
