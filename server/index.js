import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Data imports
import jets from './data/jets.js';
import deals from './data/deals.js';
import bookingsData from './data/bookings.js';
import member from './data/member.js';
import dashboard from './data/dashboard.js';
import weather from './data/weather.js';
import flights from './data/flights.js';

// Utility imports
import estimatePrice from './utils/estimatePrice.js';
import calculateOffset from './utils/calculateOffset.js';
import processPayment from './utils/processPayment.js';

const { bookings } = bookingsData;

// Jets endpoint
app.get('/api/jets', (req, res) => res.json(jets));

// Compare endpoint
app.get('/api/compare', (req, res) => res.json({}));

// Deals endpoint
app.get('/api/deals', (req, res) => res.json(deals));

// Bookings endpoint
app.post('/api/bookings', (req, res) => {
  const booking = { id: bookings.length + 1, ...req.body, createdAt: new Date() };
  bookings.push(booking);
  res.json({ success: true, booking });
});

// Price estimation endpoint
app.get('/api/price', (req, res) => {
  const { distance = 0, jetType = 'Midsize' } = req.query;
  const price = estimatePrice(Number(distance), jetType);
  res.json({ price });
});

// Carbon offset endpoint
app.get('/api/carbon', (req, res) => {
  const { distance = 0 } = req.query;
  const offset = calculateOffset(Number(distance));
  res.json({ offset });
});

// Member options endpoint
app.get('/api/member', (req, res) => res.json(member));

// Payment endpoint
app.post('/api/payment', (req, res) => {
  const { amount, details } = req.body;
  const result = processPayment(amount, details);
  res.json(result);
});

// Flight tracking endpoint with OpenSky Network integration
app.get('/api/track', async (req, res) => {
  try {
    // Try to fetch real data from OpenSky Network
    const response = await axios.get('https://opensky-network.org/api/states/all', {
      timeout: 5000,
      params: {
        lamin: 40.0, // Bounding box for US East Coast
        lomin: -80.0,
        lamax: 45.0,
        lomax: -70.0
      }
    });
    
    if (response.data && response.data.states) {
      const liveFlights = response.data.states.slice(0, 10).map(state => ({
        icao24: state[0],
        callsign: state[1] ? state[1].trim() : 'N/A',
        origin_country: state[2],
        time_position: state[3],
        last_contact: state[4],
        longitude: state[5],
        latitude: state[6],
        baro_altitude: state[7],
        on_ground: state[8],
        velocity: state[9],
        heading: state[10]
      })).filter(flight => flight.latitude && flight.longitude);
      
      res.json({ flights: liveFlights });
    } else {
      res.json(flights);
    }
  } catch (error) {
    console.log('OpenSky API unavailable, using dummy data');
    res.json(flights);
  }
});

// Weather endpoint with Open-Meteo integration
app.get('/api/weather', async (req, res) => {
  try {
    const { airport, lat, lon } = req.query;
    
    // If coordinates provided, use them directly
    if (lat && lon) {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
          hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant',
          timezone: 'auto',
          forecast_days: 7
        }
      });
      
      return res.json({
        success: true,
        location: { latitude: lat, longitude: lon },
        current: response.data.current,
        hourly: response.data.hourly,
        daily: response.data.daily,
        source: 'Open-Meteo'
      });
    }
    
    // Airport coordinates mapping for major airports
    const airportCoords = {
      'JFK': { lat: 40.6413, lon: -73.7781, name: 'John F. Kennedy International' },
      'LAX': { lat: 33.9425, lon: -118.4081, name: 'Los Angeles International' },
      'MIA': { lat: 25.7617, lon: -80.1918, name: 'Miami International' },
      'TEB': { lat: 40.8501, lon: -74.0606, name: 'Teterboro Airport' },
      'LAS': { lat: 36.0840, lon: -115.1537, name: 'McCarran International' },
      'MDW': { lat: 41.7868, lon: -87.7522, name: 'Chicago Midway' },
      'DAL': { lat: 32.8470, lon: -96.8518, name: 'Dallas Love Field' },
      'ORD': { lat: 41.9742, lon: -87.9073, name: 'O\'Hare International' },
      'DEN': { lat: 39.8561, lon: -104.6737, name: 'Denver International' },
      'SFO': { lat: 37.6213, lon: -122.3790, name: 'San Francisco International' }
    };
    
    if (airport && airportCoords[airport.toUpperCase()]) {
      const coords = airportCoords[airport.toUpperCase()];
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: coords.lat,
          longitude: coords.lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
          hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant',
          timezone: 'auto',
          forecast_days: 7
        }
      });
      
      return res.json({
        success: true,
        airport: airport.toUpperCase(),
        location: coords,
        current: response.data.current,
        hourly: response.data.hourly,
        daily: response.data.daily,
        source: 'Open-Meteo'
      });
    }
    
    // Fallback to dummy data if no coordinates provided
    res.json({
      success: true,
      ...weather,
      source: 'Dummy Data'
    });
    
  } catch (error) {
    console.error('Weather API error:', error);
    res.json({
      success: false,
      error: 'Weather data unavailable',
      ...weather,
      source: 'Fallback Data'
    });
  }
});

// Flight search endpoint - replacing paid AviationStack API
app.get('/api/flights/search', (req, res) => {
  try {
    const { departure, arrival, date, category, passengers } = req.query;
    let results = flights.routes || [];

    // Filter by departure airport
    if (departure) {
      results = results.filter(flight => 
        flight.departure.airport.toLowerCase() === departure.toLowerCase()
      );
    }

    // Filter by arrival airport
    if (arrival) {
      results = results.filter(flight => 
        flight.arrival.airport.toLowerCase() === arrival.toLowerCase()
      );
    }

    // Filter by aircraft category
    if (category && category !== 'all') {
      results = results.filter(flight => flight.category === category);
    }

    // Filter by passenger capacity
    if (passengers) {
      const passengerCount = parseInt(passengers);
      results = results.filter(flight => flight.aircraft.capacity >= passengerCount);
    }

    // Add empty leg flights to results
    const emptyLegs = (flights.emptyLegs || []).map(flight => ({
      ...flight,
      isEmptyLeg: true,
      price: {
        base: flight.discountedPrice,
        total: flight.discountedPrice,
        currency: "USD",
        original: flight.originalPrice,
        savings: flight.savings,
        discount: flight.discount
      }
    }));

    // Combine regular flights and empty legs
    const allResults = [...results, ...emptyLegs];

    res.json({
      success: true,
      count: allResults.length,
      flights: allResults,
      airports: flights.airports || []
    });
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Flight search failed',
      flights: [],
      count: 0
    });
  }
});

// Get popular destinations
app.get('/api/flights/destinations', (req, res) => {
  try {
    const destinations = [
      { 
        city: "New York", 
        airport: "TEB", 
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
        description: "Business capital with world-class dining and culture"
      },
      { 
        city: "Los Angeles", 
        airport: "LAX", 
        image: "https://images.unsplash.com/photo-1444727607150-c999be6df8b8?w=800&q=80",
        description: "Entertainment hub with beautiful beaches and weather"
      },
      { 
        city: "Miami", 
        airport: "MIA", 
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        description: "Tropical paradise with vibrant nightlife and art scene"
      },
      { 
        city: "Las Vegas", 
        airport: "LAS", 
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        description: "Entertainment capital with world-renowned shows and dining"
      }
    ];

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Destinations error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to load destinations' 
    });
  }
});

// Get empty leg flights
app.get('/api/flights/empty-legs', (req, res) => {
  try {
    const emptyLegs = flights.emptyLegs || [];
    res.json({
      success: true,
      count: emptyLegs.length,
      flights: emptyLegs
    });
  } catch (error) {
    console.error('Empty legs error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to load empty leg flights',
      flights: [],
      count: 0
    });
  }
});

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => res.json({ metrics: dashboard }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
