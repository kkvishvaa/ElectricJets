
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios.get('/api/dashboard').then(res => setMetrics(res.data.metrics));
  }, []);

  if (!metrics) return <div className="luxury-bg"><h2>Dashboard</h2><p>Loading...</p></div>;

  return (
    <div className="luxury-bg">
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={cardStyle}><h3>Users</h3><p style={numStyle}>{metrics.users}</p></div>
        <div style={cardStyle}><h3>Bookings</h3><p style={numStyle}>{metrics.bookings}</p></div>
        <div style={cardStyle}><h3>Carbon Offset</h3><p style={numStyle}>{metrics.carbonOffset} kg CO₂</p></div>
        <div style={cardStyle}><h3>Revenue</h3><p style={numStyle}>${metrics.revenue.toLocaleString()}</p></div>
        <div style={cardStyle}><h3>Empty Legs</h3><p style={numStyle}>{metrics.emptyLegs}</p></div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#fff',
  borderRadius: '18px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
  padding: '2rem',
  minWidth: '180px',
  textAlign: 'center',
  margin: '1rem',
};
const numStyle = {
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#1a2236',
  margin: 0,
};
