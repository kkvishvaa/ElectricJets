import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductionRange() {
  const [jets, setJets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productionStats, setProductionStats] = useState({
    totalAircraft: 0,
    yearsInProduction: 25,
    facilitiesWorldwide: 12,
    annualProduction: 150
  });

  // Production facility data
  const productionFacilities = [
    {
      location: "Wichita, Kansas",
      aircraft: "Citation Series",
      capacity: "50+ aircraft/year",
      specialization: "Light & Midsize Jets",
      established: "1996"
    },
    {
      location: "Savannah, Georgia", 
      aircraft: "Gulfstream Series",
      capacity: "80+ aircraft/year",
      specialization: "Large Cabin & Ultra Long Range",
      established: "1967"
    },
    {
      location: "São José dos Campos, Brazil",
      aircraft: "Phenom & Praetor Series", 
      capacity: "60+ aircraft/year",
      specialization: "Very Light & Light Jets",
      established: "1999"
    }
  ];

  const categories = ['All', 'Light', 'Midsize', 'Heavy', 'Ultra Long Range'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/jets').then(res => {
      setJets(res.data);
      setProductionStats(prev => ({ ...prev, totalAircraft: res.data.length }));
    });
  }, []);

  const filteredJets = selectedCategory === 'All' 
    ? jets 
    : jets.filter(jet => jet.type.includes(selectedCategory) || jet.category === selectedCategory.toLowerCase());

  return (
    <div className="overflow-x-hidden bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-float"></div>
        <div className="absolute top-40 left-40 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 text-center">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium tracking-wider uppercase border border-white/20">
              Manufacturing Excellence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
            Production Range
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-normal">
              & Manufacturing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-slate-300 font-light leading-relaxed max-w-4xl mx-auto">
            Discover our comprehensive production capabilities spanning 
            <span className="text-blue-400 font-medium"> light jets to ultra-long-range aircraft</span>, 
            manufactured with precision and delivered to perfection.
          </p>

          {/* Production Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{productionStats.totalAircraft}+</div>
              <div className="text-sm text-slate-300 uppercase tracking-wider">Aircraft Models</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{productionStats.yearsInProduction}</div>
              <div className="text-sm text-slate-300 uppercase tracking-wider">Years Production</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{productionStats.facilitiesWorldwide}</div>
              <div className="text-sm text-slate-300 uppercase tracking-wider">Global Facilities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{productionStats.annualProduction}+</div>
              <div className="text-sm text-slate-300 uppercase tracking-wider">Annual Production</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Link 
              to="/jets" 
              className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 min-w-52 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <span className="relative z-10">Browse Fleet</span>
            </Link>
            
            <Link 
              to="/booking" 
              className="group relative overflow-hidden px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-52 text-center border border-white/30 hover:border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <span className="relative z-10">Custom Order</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Production Facilities Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Global Manufacturing
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Production Facilities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              State-of-the-art manufacturing facilities across three continents, ensuring quality and precision in every aircraft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productionFacilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">{facility.location}</h3>
                  <div className="text-blue-600 font-medium">{facility.aircraft}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600 uppercase tracking-wider">Capacity</span>
                    <span className="text-slate-900 font-semibold">{facility.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600 uppercase tracking-wider">Specialization</span>
                    <span className="text-slate-900 font-semibold">{facility.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600 uppercase tracking-wider">Established</span>
                    <span className="text-slate-900 font-semibold">{facility.established}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft Categories Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Production Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Aircraft Production Range
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From entry-level light jets to flagship ultra-long-range aircraft, each category represents decades of engineering excellence
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Aircraft Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJets.map((jet, index) => (
              <div key={jet.id} className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center text-6xl text-white/70">
                    ✈️
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-20">
                    In Production
                  </div>
                  <div className="absolute bottom-4 left-4 text-white font-semibold z-20">
                    {jet.yearBuilt}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{jet.name}</h3>
                  <div className="text-blue-600 font-medium mb-4">{jet.manufacturer}</div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Type</span>
                      <span className="text-slate-900 font-semibold">{jet.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Capacity</span>
                      <span className="text-slate-900 font-semibold">{jet.capacity} pax</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Range</span>
                      <span className="text-slate-900 font-semibold">{jet.range} NM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Production Year</span>
                      <span className="text-slate-900 font-semibold">{jet.yearBuilt}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/jets`}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/25 text-center block"
                  >
                    View Specifications
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="container max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Manufacturing Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Production Process
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Every aircraft undergoes rigorous quality control and testing to ensure safety, performance, and luxury standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Design & Engineering", description: "Advanced CAD modeling and aerodynamic optimization" },
              { step: "02", title: "Manufacturing", description: "Precision machining and assembly with quality control" },
              { step: "03", title: "Testing & Certification", description: "Rigorous flight testing and regulatory compliance" },
              { step: "04", title: "Delivery & Support", description: "Customer handover and ongoing maintenance support" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}