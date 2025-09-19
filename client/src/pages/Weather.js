
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('JFK');
  const [error, setError] = useState(null);

  const airports = [
    { code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
    { code: 'MIA', name: 'Miami International', city: 'Miami' },
    { code: 'TEB', name: 'Teterboro Airport', city: 'Teterboro' },
    { code: 'LAS', name: 'McCarran International', city: 'Las Vegas' },
    { code: 'MDW', name: 'Chicago Midway', city: 'Chicago' },
    { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas' },
    { code: 'ORD', name: 'O\'Hare International', city: 'Chicago' },
    { code: 'DEN', name: 'Denver International', city: 'Denver' },
    { code: 'SFO', name: 'San Francisco International', city: 'San Francisco' }
  ];

  const weatherCodes = {
    0: { description: 'Clear sky', icon: '☀️' },
    1: { description: 'Mainly clear', icon: '🌤️' },
    2: { description: 'Partly cloudy', icon: '⛅' },
    3: { description: 'Overcast', icon: '☁️' },
    45: { description: 'Fog', icon: '🌫️' },
    48: { description: 'Depositing rime fog', icon: '🌫️' },
    51: { description: 'Light drizzle', icon: '🌦️' },
    53: { description: 'Moderate drizzle', icon: '🌦️' },
    55: { description: 'Dense drizzle', icon: '🌧️' },
    61: { description: 'Slight rain', icon: '🌧️' },
    63: { description: 'Moderate rain', icon: '🌧️' },
    65: { description: 'Heavy rain', icon: '⛈️' },
    71: { description: 'Slight snow', icon: '🌨️' },
    73: { description: 'Moderate snow', icon: '❄️' },
    75: { description: 'Heavy snow', icon: '❄️' },
    95: { description: 'Thunderstorm', icon: '⛈️' }
  };

  useEffect(() => {
    fetchWeather(selectedAirport);
  }, [selectedAirport]);

  const fetchWeather = async (airport) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?airport=${airport}`);
      if (response.data.success) {
        setWeatherData(response.data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Weather service unavailable');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherInfo = (code) => {
    return weatherCodes[code] || { description: 'Unknown', icon: '❓' };
  };

  const windDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #10B981 50%, #F9FAFB 100%)',
      padding: '2rem 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: '300' }}>
            ☁️ Aviation Weather
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Real-time weather conditions for flight planning powered by Open-Meteo
          </p>
        </div>

        {/* Airport Selector */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Select Airport</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {airports.map(airport => (
              <button
                key={airport.code}
                onClick={() => setSelectedAirport(airport.code)}
                style={{
                  background: selectedAirport === airport.code 
                    ? 'linear-gradient(135deg, #000000, #10B981)' 
                    : 'rgba(16, 185, 129, 0.1)',
                  color: selectedAirport === airport.code ? 'white' : '#333',
                  border: selectedAirport === airport.code 
                    ? '2px solid #10B981' 
                    : '2px solid rgba(16, 185, 129, 0.3)',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {airport.code}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {airport.city}
                </div>
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.2rem',
            padding: '2rem'
          }}>
            🌤️ Loading weather data...
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(255, 107, 107, 0.9)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {weatherData && !loading && (
          <div>
            {/* Current Weather */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Current Conditions - {selectedAirport}
              </h2>
              
              {weatherData.current && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                      {getWeatherInfo(weatherData.current.weather_code).icon}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
                      {Math.round(weatherData.current.temperature_2m)}°C
                    </div>
                    <div style={{ color: '#666' }}>
                      {getWeatherInfo(weatherData.current.weather_code).description}
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>🌡️ Feels like:</strong> {Math.round(weatherData.current.apparent_temperature)}°C
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>💧 Humidity:</strong> {weatherData.current.relative_humidity_2m}%
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>☁️ Cloud Cover:</strong> {weatherData.current.cloud_cover}%
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>💨 Wind:</strong> {Math.round(weatherData.current.wind_speed_10m)} km/h {windDirection(weatherData.current.wind_direction_10m)}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>🌪️ Gusts:</strong> {Math.round(weatherData.current.wind_gusts_10m)} km/h
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>🏔️ Pressure:</strong> {Math.round(weatherData.current.pressure_msl)} hPa
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 7-Day Forecast */}
            {weatherData.daily && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                  7-Day Forecast
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  {weatherData.daily.time.slice(0, 7).map((date, index) => (
                    <div key={date} style={{
                      background: index === 0 ? 'linear-gradient(135deg, #000000, #10B981)' : 'rgba(16, 185, 129, 0.1)',
                      color: index === 0 ? 'white' : '#333',
                      padding: '1.5rem 1rem',
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: index === 0 ? 'none' : '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {index === 0 ? 'Today' : formatDate(date)}
                      </div>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {getWeatherInfo(weatherData.daily.weather_code[index]).icon}
                      </div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>{Math.round(weatherData.daily.temperature_2m_max[index])}°</strong>
                        <span style={{ opacity: 0.7 }}> / {Math.round(weatherData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        💧 {weatherData.daily.precipitation_probability_max[index]}%
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        💨 {Math.round(weatherData.daily.wind_speed_10m_max[index])} km/h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flight Planning Advisory */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                ✈️ Flight Planning Advisory
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  background: weatherData.current?.wind_speed_10m > 25 ? 'rgba(255, 107, 107, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  border: `2px solid ${weatherData.current?.wind_speed_10m > 25 ? '#ff6b6b' : '#22c55e'}`,
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: weatherData.current?.wind_speed_10m > 25 ? '#ff6b6b' : '#22c55e', marginBottom: '1rem' }}>
                    Wind Conditions
                  </h4>
                  <p style={{ color: '#333' }}>
                    {weatherData.current?.wind_speed_10m > 25 
                      ? '⚠️ High winds may affect takeoff/landing'
                      : '✅ Wind conditions favorable for flight'
                    }
                  </p>
                </div>

                <div style={{
                  background: weatherData.current?.cloud_cover > 80 ? 'rgba(255, 193, 7, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  border: `2px solid ${weatherData.current?.cloud_cover > 80 ? '#ffc107' : '#22c55e'}`,
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: weatherData.current?.cloud_cover > 80 ? '#ffc107' : '#22c55e', marginBottom: '1rem' }}>
                    Visibility
                  </h4>
                  <p style={{ color: '#333' }}>
                    {weatherData.current?.cloud_cover > 80 
                      ? '⚠️ Overcast conditions, IFR may be required'
                      : '✅ Good visibility for VFR conditions'
                    }
                  </p>
                </div>

                <div style={{
                  background: weatherData.current?.precipitation > 0 ? 'rgba(255, 107, 107, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  border: `2px solid ${weatherData.current?.precipitation > 0 ? '#ff6b6b' : '#22c55e'}`,
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: weatherData.current?.precipitation > 0 ? '#ff6b6b' : '#22c55e', marginBottom: '1rem' }}>
                    Precipitation
                  </h4>
                  <p style={{ color: '#333' }}>
                    {weatherData.current?.precipitation > 0 
                      ? '⚠️ Active precipitation, monitor conditions'
                      : '✅ No precipitation expected'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
