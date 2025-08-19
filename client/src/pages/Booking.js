
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
      await axios.post('/api/bookings', form);
      setSubmitted(true);
    } catch (err) {
      setError('Booking failed. Please try again.');
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="luxury-bg">
        <div style={{ 
          background: '#e8f5e8', 
          borderRadius: '18px', 
          padding: '3rem', 
          maxWidth: 500, 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2>✅ Booking Confirmed!</h2>
          <p>Thank you for choosing our luxury jet charter service.</p>
          <p>Our team will contact you within 24 hours to finalize your booking details.</p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/dashboard" style={{
              background: '#1a2236',
              color: '#fff',
              padding: '0.7rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600
            }}>View Dashboard</Link>
            
            <Link to="/payment" style={{
              background: '#16a085',
              color: '#fff',
              padding: '0.7rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600
            }}>Make Payment</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-bg">
      <h2>Book Your Private Jet</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Complete the form below to book your luxury flight experience
      </p>
      
      <form onSubmit={handleSubmit} style={{ 
        background: '#fff', 
        borderRadius: '18px', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)', 
        padding: '2.5rem', 
        maxWidth: 600, 
        margin: '0 auto', 
        textAlign: 'left' 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <label>
            Full Name *
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
          
          <label>
            Email *
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              type="email"
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <label>
            Phone Number
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange}
              type="tel"
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
          
          <label>
            Passengers
            <input 
              name="passengers" 
              value={form.passengers} 
              onChange={handleChange}
              type="number"
              min="1"
              max="20"
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
        </div>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Select Aircraft *
          <select 
            name="jetId" 
            value={form.jetId} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">Choose an aircraft...</option>
            {jets.map(jet => (
              <option key={jet.id} value={jet.id}>
                {jet.name} - {jet.type} (Up to {jet.capacity} passengers)
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <label>
            Departure Date *
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              required 
              type="date"
              min={new Date().toISOString().split('T')[0]}
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
          
          <label>
            From (Airport/City) *
            <input 
              name="from" 
              value={form.from} 
              onChange={handleChange} 
              required
              placeholder="e.g., JFK, New York"
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
          
          <label>
            To (Airport/City) *
            <input 
              name="to" 
              value={form.to} 
              onChange={handleChange} 
              required
              placeholder="e.g., LAX, Los Angeles"
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
        </div>

        <label style={{ display: 'block', marginBottom: '2rem' }}>
          Special Requirements / Notes
          <textarea 
            name="notes" 
            value={form.notes} 
            onChange={handleChange}
            rows="3"
            placeholder="Catering preferences, special assistance, etc."
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              background: '#1a2236',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 2rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
          
          <Link to="/pricing" style={{
            background: '#16a085',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem 2rem',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Get Price Quote
          </Link>
        </div>
        
        {error && (
          <p style={{ color: '#e74c3c', textAlign: 'center', marginTop: '1rem' }}>{error}</p>
        )}
      </form>
    </div>
  );
}
