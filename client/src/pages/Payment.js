import React, { useState } from 'react';
import axios from 'axios';

export default function Payment() {
  const [form, setForm] = useState({ amount: '', cardNumber: '', cvv: '', expiry: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function processPayment(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/payment', {
        amount: form.amount,
        details: { cardNumber: form.cardNumber, cvv: form.cvv, expiry: form.expiry }
      });
      setResult(response.data);
    } catch (error) {
      setResult({ status: 'error', message: 'Payment failed' });
    }
    
    setLoading(false);
  }

  if (result) {
    return (
      <div className="luxury-bg">
        <h2>Payment Result</h2>
        <div style={{ 
          background: result.status === 'test' ? '#e8f5e8' : '#ffe8e8', 
          borderRadius: '18px', 
          padding: '2rem', 
          maxWidth: 400, 
          margin: '2rem auto',
          textAlign: 'center'
        }}>
          <h3>{result.status === 'test' ? '✅ Payment Processed (Test Mode)' : '❌ Payment Failed'}</h3>
          <p>Amount: ${result.amount}</p>
          <p>Status: {result.status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-bg">
      <h2>Payment (Razorpay Test Mode)</h2>
      
      <form onSubmit={processPayment} style={{ 
        background: '#fff', 
        borderRadius: '18px', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)', 
        padding: '2rem', 
        maxWidth: 400, 
        margin: '2rem auto',
        textAlign: 'left'
      }}>
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Amount ($):
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Card Number:
          <input
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1 }}>
            CVV:
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>

          <label style={{ flex: 1 }}>
            Expiry:
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              required
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#1a2236',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 2rem',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
            marginTop: '1.5rem'
          }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
