import React, { useState } from 'react';

const FlightSearchBox = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'one-way'
  });

  // Popular business destinations with IATA codes
  const popularAirports = [
    { code: 'JFK', city: 'New York', country: 'USA' },
    { code: 'LAX', city: 'Los Angeles', country: 'USA' },
    { code: 'LHR', city: 'London', country: 'UK' },
    { code: 'CDG', city: 'Paris', country: 'France' },
    { code: 'NRT', city: 'Tokyo', country: 'Japan' },
    { code: 'DXB', city: 'Dubai', country: 'UAE' },
    { code: 'SIN', city: 'Singapore', country: 'Singapore' },
    { code: 'ZUR', city: 'Zurich', country: 'Switzerland' },
    { code: 'GVA', city: 'Geneva', country: 'Switzerland' },
    { code: 'MIA', city: 'Miami', country: 'USA' },
    { code: 'SFO', city: 'San Francisco', country: 'USA' },
    { code: 'FRA', city: 'Frankfurt', country: 'Germany' }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search initiated:', searchData);
    // Handle search logic here
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 max-w-6xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Charter Your Private Jet</h3>
        <p className="text-gray-600">Select your departure and destination to begin your luxury travel experience</p>
      </div>

      {/* Trip Type Selection */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleInputChange('tripType', 'one-way')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            searchData.tripType === 'one-way'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => handleInputChange('tripType', 'round-trip')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            searchData.tripType === 'round-trip'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Round Trip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* From Airport */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <input
            type="text"
            placeholder="Departure Airport"
            value={searchData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            list="from-airports"
          />
          <datalist id="from-airports">
            {popularAirports.map(airport => (
              <option key={airport.code} value={`${airport.code} - ${airport.city}, ${airport.country}`} />
            ))}
          </datalist>
        </div>

        {/* To Airport */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <input
            type="text"
            placeholder="Destination Airport"
            value={searchData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            list="to-airports"
          />
          <datalist id="to-airports">
            {popularAirports.map(airport => (
              <option key={airport.code} value={`${airport.code} - ${airport.city}, ${airport.country}`} />
            ))}
          </datalist>
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
          <input
            type="date"
            value={searchData.departDate}
            onChange={(e) => handleInputChange('departDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Return Date */}
        {searchData.tripType === 'round-trip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
            <input
              type="date"
              value={searchData.returnDate}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={searchData.departDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
          <select
            value={searchData.passengers}
            onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[...Array(14)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Passenger' : 'Passengers'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Popular Business Routes:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'JFK → LHR',
            'LAX → NRT',
            'SFO → CDG',
            'MIA → LHR',
            'JFK → DXB',
            'LAX → SIN'
          ].map((route, index) => (
            <button
              key={index}
              onClick={() => {
                const [from, to] = route.split(' → ');
                handleInputChange('from', from);
                handleInputChange('to', to);
              }}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
            >
              {route}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Search Available Aircraft
      </button>
    </div>
  );
};

export default FlightSearchBox;
