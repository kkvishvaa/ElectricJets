// Enhanced flight search data - replacing paid AviationStack API with comprehensive dummy data
export default {
  // Popular routes with actual flight data structure
  routes: [
    {
      id: "JFK-LAX-001",
      departure: {
        airport: "JFK",
        city: "New York",
        country: "USA",
        terminal: "T4",
        gate: "A12",
        time: "2024-02-15T08:00:00Z"
      },
      arrival: {
        airport: "LAX", 
        city: "Los Angeles",
        country: "USA",
        terminal: "T1",
        gate: "B6",
        time: "2024-02-15T14:30:00Z"
      },
      aircraft: {
        type: "Gulfstream G650ER",
        registration: "N650GS",
        operator: "Elite Jets",
        capacity: 14
      },
      duration: "6h 30m",
      distance: 2475,
      price: {
        base: 45000,
        total: 52000,
        currency: "USD",
        pricePerPerson: 3714
      },
      status: "Available",
      flightType: "Charter",
      category: "heavy",
      amenities: ["WiFi", "Full Galley", "Master Bedroom", "Entertainment"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"
    },
    {
      id: "LAX-MIA-002",
      departure: {
        airport: "LAX",
        city: "Los Angeles", 
        country: "USA",
        terminal: "T7",
        gate: "C15",
        time: "2024-02-15T10:15:00Z"
      },
      arrival: {
        airport: "MIA",
        city: "Miami",
        country: "USA", 
        terminal: "T2",
        gate: "D8",
        time: "2024-02-15T18:45:00Z"
      },
      aircraft: {
        type: "Challenger 350",
        registration: "N350CH",
        operator: "Luxury Air",
        capacity: 10
      },
      duration: "5h 30m",
      distance: 2342,
      price: {
        base: 35750,
        total: 41000,
        currency: "USD",
        pricePerPerson: 4100
      },
      status: "Available",
      flightType: "Charter",
      category: "midsize",
      amenities: ["WiFi", "Full Galley", "Entertainment", "Conference Seating"],
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80"
    },
    {
      id: "MIA-JFK-003",
      departure: {
        airport: "MIA",
        city: "Miami",
        country: "USA",
        terminal: "T3",
        gate: "E22",
        time: "2024-02-15T14:30:00Z"
      },
      arrival: {
        airport: "JFK",
        city: "New York",
        country: "USA",
        terminal: "T4",
        gate: "A18",
        time: "2024-02-15T17:15:00Z"
      },
      aircraft: {
        type: "Citation CJ3+",
        registration: "N123CJ", 
        operator: "Executive Jets",
        capacity: 9
      },
      duration: "2h 45m",
      distance: 1090,
      price: {
        base: 9625,
        total: 11000,
        currency: "USD",
        pricePerPerson: 1222
      },
      status: "Available",
      flightType: "Charter",
      category: "light",
      amenities: ["WiFi", "Refreshments", "Entertainment System"],
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
    },
    {
      id: "CHI-LAS-004",
      departure: {
        airport: "MDW",
        city: "Chicago",
        country: "USA", 
        terminal: "T1",
        gate: "B5",
        time: "2024-02-15T12:00:00Z"
      },
      arrival: {
        airport: "LAS",
        city: "Las Vegas",
        country: "USA",
        terminal: "T3",
        gate: "C12",
        time: "2024-02-15T15:20:00Z"
      },
      aircraft: {
        type: "Phenom 300E",
        registration: "N300EP",
        operator: "Premier Aviation",
        capacity: 11
      },
      duration: "4h 20m",
      distance: 1514,
      price: {
        base: 18200,
        total: 21000,
        currency: "USD", 
        pricePerPerson: 1909
      },
      status: "Available",
      flightType: "Charter",
      category: "light",
      amenities: ["WiFi", "Entertainment", "LED Lighting", "Refreshment Center"],
      image: "https://images.unsplash.com/photo-1569629810221-9c236b90babe?w=800&q=80"
    }
  ],

  // Empty leg flights - discounted positioning flights
  emptyLegs: [
    {
      id: "EMPTY-001",
      departure: {
        airport: "TEB", 
        city: "Teterboro",
        country: "USA",
        time: "2024-02-16T11:00:00Z"
      },
      arrival: {
        airport: "PBI",
        city: "West Palm Beach",
        country: "USA", 
        time: "2024-02-16T13:45:00Z"
      },
      aircraft: {
        type: "Citation CJ3+",
        registration: "N123CJ",
        operator: "Executive Jets",
        capacity: 9
      },
      duration: "2h 45m",
      distance: 1034,
      originalPrice: 15000,
      discountedPrice: 8500,
      savings: 6500,
      discount: 43,
      status: "Available",
      reason: "Positioning flight",
      category: "light",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
    },
    {
      id: "EMPTY-002", 
      departure: {
        airport: "LAX",
        city: "Los Angeles",
        country: "USA",
        time: "2024-02-16T14:30:00Z"
      },
      arrival: {
        airport: "SFO",
        city: "San Francisco", 
        country: "USA",
        time: "2024-02-16T15:45:00Z"
      },
      aircraft: {
        type: "Phenom 300E",
        registration: "N300EP",
        operator: "Premier Aviation",
        capacity: 11
      },
      duration: "1h 15m",
      distance: 337,
      originalPrice: 8500,
      discountedPrice: 4200,
      savings: 4300,
      discount: 51,
      status: "Available",
      reason: "Return positioning",
      category: "light",
      image: "https://images.unsplash.com/photo-1569629810221-9c236b90babe?w=800&q=80"
    }
  ],

  // Airport data for search
  airports: [
    { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
    { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
    { code: "MIA", name: "Miami International", city: "Miami", country: "USA" },
    { code: "TEB", name: "Teterboro Airport", city: "Teterboro", country: "USA" },
    { code: "LAS", name: "McCarran International", city: "Las Vegas", country: "USA" },
    { code: "MDW", name: "Chicago Midway International", city: "Chicago", country: "USA" },
    { code: "DAL", name: "Dallas Love Field", city: "Dallas", country: "USA" },
    { code: "PBI", name: "Palm Beach International", city: "West Palm Beach", country: "USA" },
    { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "USA" }
  ],

  // Live tracking data (replacing OpenSky format)
  tracking: [
    {
      icao24: "a1b2c3",
      callsign: "EJ123",
      origin_country: "United States",
      time_position: 1692450000,
      last_contact: 1692450300,
      longitude: -98.5795,
      latitude: 39.8283,
      baro_altitude: 45000,
      on_ground: false,
      velocity: 550,
      heading: 90,
      aircraft: "Gulfstream G650ER"
    },
    {
      icao24: "d4e5f6",
      callsign: "LA456",
      origin_country: "United States", 
      time_position: 1692450000,
      last_contact: 1692450300,
      longitude: -95.1376,
      latitude: 29.6516,
      baro_altitude: 43000,
      on_ground: false,
      velocity: 480,
      heading: 85,
      aircraft: "Challenger 350"
    }
  ]
};
