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
- **Architecture:** Modular Monolith (unified backend with logical service separation)

## 📂 Project Structure

```
Voygo/
├── server.js           # 🚀 Unified entry point (Super Server)
├── socket.js           # 📡 Centralized Socket.io handler
├── package.json        # 📦 Merged dependencies
├── Dockerfile          # 🐳 Container configuration
├── docker-compose.yml  # 🐳 Full stack orchestration
├── .env.example        # ⚙️  Environment template
├── frontend/           # React client application
├── services/           # Modular backend services
│   ├── users/          # User management module
│   ├── captains/       # Captain (driver) management module
│   └── rides/          # Ride matching and map module
└── legacy-backend/     # Old monolithic backend (reference only)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (or Docker)
- Google Maps API Key

### Option 1: Docker (Recommended) 🐳

The easiest way to run Voygo is using Docker Compose:

```bash
# 1. Clone the repository
git clone https://github.com/ijatinydv/Voygo.git
cd Voygo

# 2. Create environment file
cp .env.example .env
# Edit .env and add your GOOGLE_MAPS_API key

# 3. Start everything (MongoDB + Backend)
docker-compose up --build

# Backend will be available at http://localhost:3000
# MongoDB at localhost:27017
```

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ijatinydv/Voygo.git
   cd Voygo
   ```

2. **Backend Setup (Modular Monolith)**
   ```bash
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB URI and Google Maps API key
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🌐 API Endpoints

| Route | Service | Description |
|-------|---------|-------------|
| `/users/*` | Users | User registration, login, profile |
| `/captains/*` | Captains | Captain registration, login, profile |
| `/rides/*` | Rides | Create, confirm, start, end rides |
| `/maps/*` | Maps | Geocoding, distance, suggestions |
| `/health` | Health | Server health check |

## ⚙️ Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/voygo

# Authentication
JWT_SECRET=your-secret-key

# Google Maps
GOOGLE_MAPS_API=your-google-maps-api-key

# Service URLs (all point to same server in monolith)
USER_SERVICE_URL=http://localhost:3000
CAPTAIN_SERVICE_URL=http://localhost:3000
GATEWAY_URL=http://localhost:3000
```

## 🔄 Service-to-Service Communication

In the modular monolith architecture, controllers that make axios calls to other services (e.g., `ride.controller.js` calling the User service) simply loop back to the same server:

```
┌─────────────────────────────────────────────────────────┐
│                    Express Server                        │
│                    (localhost:3000)                      │
├─────────────────────────────────────────────────────────┤
│  /users/*     → userRoutes     → userController         │
│  /captains/*  → captainRoutes  → captainController      │
│  /rides/*     → rideRoutes     → rideController         │
│  /maps/*      → mapsRoutes     → mapController          │
├─────────────────────────────────────────────────────────┤
│  axios.get("http://localhost:3000/users/:id")           │
│       ↓                                                  │
│  Same server handles the request internally              │
└─────────────────────────────────────────────────────────┘
```

This allows you to keep the existing axios calls without any code changes!
