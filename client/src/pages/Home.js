import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlightSearchBox from '../components/FlightSearchBox';

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
    <div className="overflow-x-hidden bg-slate-50">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center text-white overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-float"></div>
        <div className="absolute top-40 left-40 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-gradient-to-br from-slate-600/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium tracking-wider uppercase border border-white/20">
                Premium Private Aviation
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight animate-slide-up">
              Executive Jet
              <span className="block bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent font-normal">
                Charter Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-slate-300 font-light leading-relaxed max-w-4xl mx-auto animate-slide-up delay-300">
              Experience uncompromising luxury and efficiency with our curated fleet of premium aircraft. 
              <span className="text-blue-400 font-medium"> Tailored for discerning executives</span> who value time, comfort, and discretion.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center animate-slide-up delay-500 mb-16">
              <Link 
                to="/jets" 
                className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 min-w-52 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10">View Fleet</span>
              </Link>
              
              <Link 
                to="/deals" 
                className="group relative overflow-hidden px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-52 text-center border border-white/30 hover:border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10">Special Offers</span>
              </Link>
              
              <Link 
                to="/pricing" 
                className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-600/25 min-w-52 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10">Request Quote</span>
              </Link>
            </div>
          </div>
          
          {/* Flight Search Component */}
          <div className="animate-scale-in delay-700">
            <FlightSearchBox />
          </div>
        </div>
      </section>

      {/* Professional Membership Section */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 to-blue-50/50"></div>
        
        <div className="container max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Membership Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Tailored Aviation Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the membership tier that aligns with your travel requirements and business objectives
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 relative overflow-hidden animate-scale-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-600"></div>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center mb-10">
                {['Jet Card', 'On-Demand Charter'].map((type, index) => (
                  <button
                    key={type}
                    onClick={() => setMemberType(type)}
                    className={`group relative overflow-hidden px-8 py-5 rounded-xl font-semibold text-lg transition-all duration-300 min-w-64 ${
                      memberType === type
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-xl">{index === 0 ? '💳' : '✈️'}</span>
                      <span>{type}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-100">
                <div className="text-slate-700 text-lg leading-relaxed">
                  {memberType === 'Jet Card' 
                    ? (
                      <div>
                        <div className="text-3xl mb-4">💎</div>
                        <p><strong className="text-blue-600">Prepaid flight hours</strong> with guaranteed aircraft availability and fixed hourly rates. Includes priority scheduling, dedicated account management, and complimentary concierge services for seamless travel coordination.</p>
                      </div>
                    )
                    : (
                      <div>
                        <div className="text-3xl mb-4">🎯</div>
                        <p><strong className="text-blue-600">Pay-per-flight basis</strong> with flexible aircraft selection and scheduling. Ideal for occasional travelers requiring luxury transportation without long-term commitments or membership obligations.</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Featured Jets Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-float"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Premium Fleet
            </span>
            <h3 className="text-4xl md:text-6xl font-light mb-8 leading-tight animate-slide-up">
              Featured Aircraft
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Meticulously maintained aircraft from leading manufacturers, ensuring the highest standards of safety, comfort, and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {Array.isArray(featuredJets) && featuredJets.map((jet, index) => (
              <div 
                key={jet.id} 
                className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-3xl relative overflow-hidden animate-scale-in ${index === 1 ? 'delay-300' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="relative w-full h-52 mb-6 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent z-10"></div>
                    <img 
                      src={getJetImage(jet.id)} 
                      alt={jet.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center text-6xl text-white/70">✈️</div>';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-20 uppercase tracking-wide">
                      Available
                    </div>
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl text-white mb-6 font-semibold group-hover:text-blue-400 transition-colors duration-300">
                    {jet.name}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-blue-400 text-lg mb-1">✈️</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Aircraft Type</div>
                      <div className="text-white font-medium">{jet.type}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-blue-400 text-lg mb-1">👥</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Capacity</div>
                      <div className="text-white font-medium">{jet.capacity} Passengers</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-blue-400 text-lg mb-1">🌍</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Range</div>
                      <div className="text-white font-medium">{jet.range} NM</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-blue-400 text-lg mb-1">⚡</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Max Speed</div>
                      <div className="text-white font-medium">{jet.speed} MPH</div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/jets" 
                    className="group/link relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/25 text-center block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/link:translate-x-full transition-transform duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>View Specifications</span>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
