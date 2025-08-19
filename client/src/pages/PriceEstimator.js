import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PriceEstimator() {
  const [form, setForm] = useState({ distance: '', jetType: 'Midsize' });
  const [pricing, setPricing] = useState(null);
  const [carbonOffset, setCarbonOffset] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function estimatePrice() {
    if (!form.distance) return;
    
    const [priceRes, carbonRes] = await Promise.all([
      axios.get(`/api/price?distance=${form.distance}&jetType=${form.jetType}`),
      axios.get(`/api/carbon?distance=${form.distance}`)
    ]);
    
    setPricing(priceRes.data);
    setCarbonOffset(carbonRes.data);
  }

  return (
    <div className="luxury-bg">
      <h2>Price Estimation & Carbon Offset</h2>
      
      <div style={{ 
        background: '#fff', 
        borderRadius: '18px', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)', 
        padding: '2rem', 
        maxWidth: 500, 
        margin: '2rem auto',
        textAlign: 'left'
      }}>
        <h3>Calculate Your Trip</h3>
        
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Distance (nautical miles):
          <input
            name="distance"
            type="number"
            value={form.distance}
            onChange={handleChange}
            placeholder="e.g., 1200"
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Jet Type:
          <select
            name="jetType"
            value={form.jetType}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="Ultra Long Range">Ultra Long Range</option>
            <option value="Midsize">Midsize</option>
            <option value="Light">Light</option>
          </select>
        </label>

        <button
          onClick={estimatePrice}
          style={{
            background: '#1a2236',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 2rem',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Get Pricing
        </button>

        {pricing && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px' }}>
            <h4>Estimated Cost: ${pricing.price.toLocaleString()}</h4>
            {carbonOffset && (
              <p>Carbon Offset: {carbonOffset.offset} kg CO₂</p>
            )}
            <button
              onClick={() => navigate('/booking')}
              style={{
                background: '#16a085',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Book This Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
