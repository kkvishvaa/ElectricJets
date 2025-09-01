
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Booking() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    jetId: '', 
    date: '', 
    from: '', 
    to: '',
    passengers: 1,
    notes: ''
  });
  const [jets, setJets] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://electricjets.onrender.com/api/jets').then(res => setJets(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('https://electricjets.onrender.com/api/bookings', form);
      setSubmitted(true);
    } catch (err) {
      setError('Booking failed. Please try again.');
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16">
        <div className="bg-white rounded-2xl p-12 shadow-xl border border-slate-200 max-w-2xl mx-auto text-center">
          <div className="text-6xl text-green-600 mb-6">✅</div>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Booking Confirmed</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Thank you for choosing our executive jet charter service. Our dedicated team will contact you within 24 hours to finalize your booking details and arrange your luxury travel experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
            >
              View Dashboard
            </Link>
            <Link 
              to="/payment" 
              className="bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 hover:from-slate-700 hover:to-slate-800 hover:shadow-lg"
            >
              Process Payment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-float"></div>
        <div className="container max-w-4xl mx-auto px-8 relative z-10 text-center">
          <span className="inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            Charter Booking
          </span>
          <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            Reserve Your Executive Flight
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Complete your booking details below for a seamless luxury aviation experience
          </p>
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-8 py-16">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Full Name *
              </label>
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Email Address *
              </label>
              <input 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Phone Number
              </label>
              <input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange}
                type="tel"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Number of Passengers
              </label>
              <input 
                name="passengers" 
                value={form.passengers} 
                onChange={handleChange}
                type="number"
                min="1"
                max="20"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Select Aircraft *
            </label>
            <select 
              name="jetId" 
              value={form.jetId} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Choose your preferred aircraft...</option>
              {jets.map(jet => (
                <option key={jet.id} value={jet.id}>
                  {jet.name} - {jet.type} (Capacity: {jet.capacity} passengers)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Departure Date *
              </label>
              <input 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                required 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Departure Location *
              </label>
              <input 
                name="from" 
                value={form.from} 
                onChange={handleChange} 
                required
                placeholder="JFK, New York"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Destination *
              </label>
              <input 
                name="to" 
                value={form.to} 
                onChange={handleChange} 
                required
                placeholder="LAX, Los Angeles"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Special Requirements & Notes
            </label>
            <textarea 
              name="notes" 
              value={form.notes} 
              onChange={handleChange}
              rows="4"
              placeholder="Catering preferences, ground transportation, special assistance, or any other requirements..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="submit" 
              disabled={loading}
              className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing Booking...' : 'Confirm Booking'}
            </button>
            
            <Link 
              to="/pricing" 
              className="bg-slate-100 text-slate-700 py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-slate-200 border border-slate-200 text-center"
            >
              Get Price Quote
            </Link>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
