# Voygo

Voygo is a full-stack ride-sharing application designed to connect passengers with drivers efficiently. It features real-time tracking, ride management, and separate interfaces for users and captains (drivers).

## ✨ Key Features

- **User & Captain Authentication**: Secure login/signup for both roles.
- **Real-time Ride Booking**: Instant ride requests and matching.
- **Live Tracking**: Real-time location updates using Socket.io.
- **Map Integration**: Route visualization and distance calculation.


## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, GSAP, Socket.io-client, Google Maps API
- **Backend:** Node.js, Express, MongoDB, Socket.io
- **Architecture:** Microservices (API Gateway, Users, Captains, Rides)

## 📂 Project Structure

```
Voygo/
├── frontend/           # React client application
├── services/           # Microservices backend
│   ├── api-gateway/    # Central entry point
│   ├── users/          # User management service
│   ├── captains/       # Captain (driver) management service
│   └── rides/          # Ride matching and map service
└── legacy-backend/     # Monolithic backend implementation (reference)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/ijatinydv/Voygo.git
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup (Microservices)**
   Navigate to each service directory (`services/api-gateway`, `services/users`, etc.) and run:
   ```bash
   npm install
   npm start
   ```
   *Note: Ensure environment variables are configured for database connections and API keys.*
