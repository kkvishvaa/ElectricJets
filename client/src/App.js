import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jets from './pages/Jets';
import Compare from './pages/Compare';
import Booking from './pages/Booking';
import Deals from './pages/Deals';
import Dashboard from './pages/Dashboard';
import FlightTracker from './pages/FlightTracker';
import FlightSearch from './pages/FlightSearch';
import Weather from './pages/Weather';
import PriceEstimator from './pages/PriceEstimator';
import Payment from './pages/Payment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jets" element={<Jets />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track" element={<FlightTracker />} />
            <Route path="/search" element={<FlightSearch />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/pricing" element={<PriceEstimator />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
