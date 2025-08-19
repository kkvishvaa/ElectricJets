
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom plane icon
const planeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuNSAxOS4xNjY3TDkuNSAxMi4xNjY3TDIuNSA1LjE2NjY3TDUuNSA1LjE2NjY3TDEzLjUgMTIuMTY2N0w1LjUgMTkuMTY2N0gyLjVaIiBmaWxsPSIjMTA3M0ZGIi8+CjxwYXRoIGQ9Ik0xNi41IDEyLjE2NjdMMjEuNSAxMi4xNjY3IiBzdHJva2U9IiMxMDczRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

export default function FlightTracker() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  async function fetchFlights() {
    try {
      const response = await axios.get('/api/track');
      setFlights(response.data.flights || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setLoading(false);
    }
  }

  return (
    <div className="luxury-bg">
      <h2>Track Flight (Live from OpenSky Network)</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Real-time flight tracking powered by OpenSky Network API
      </p>
      
      {loading && <p>Loading flight data...</p>}
      
      <div style={{ 
        height: '500px', 
        width: '100%', 
        margin: '2rem 0', 
        borderRadius: '18px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)' 
      }}>
        <MapContainer 
          center={[42.3601, -71.0589]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {flights.filter(flight => flight.latitude && flight.longitude).map(flight => (
            <Marker 
              key={flight.icao24} 
              position={[flight.latitude, flight.longitude]}
              icon={planeIcon}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4>{flight.callsign || 'Unknown'}</h4>
                  <p><b>Origin:</b> {flight.origin_country}</p>
                  <p><b>Altitude:</b> {flight.baro_altitude ? `${flight.baro_altitude} ft` : 'N/A'}</p>
                  <p><b>Speed:</b> {flight.velocity ? `${Math.round(flight.velocity)} knots` : 'N/A'}</p>
                  <p><b>Heading:</b> {flight.heading ? `${Math.round(flight.heading)}°` : 'N/A'}</p>
                  <p><b>On Ground:</b> {flight.on_ground ? 'Yes' : 'No'}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <h3>Live Flights ({flights.length})</h3>
        {flights.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#f0f4fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Callsign</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Origin</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Altitude</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Speed</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Heading</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.icao24} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{flight.callsign || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{flight.origin_country}</td>
                    <td style={{ padding: '1rem' }}>{flight.baro_altitude ? `${flight.baro_altitude} ft` : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{flight.velocity ? `${Math.round(flight.velocity)} knots` : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{flight.heading ? `${Math.round(flight.heading)}°` : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: flight.on_ground ? '#f39c12' : '#27ae60',
                        color: '#fff',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {flight.on_ground ? 'Ground' : 'Airborne'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            No flights currently visible in the selected area
          </p>
        )}
      </div>
    </div>
  );
}
