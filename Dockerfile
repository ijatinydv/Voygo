# ==============================================
# Voygo Modular Monolith Dockerfile
# ==============================================
# This Dockerfile builds a single container that runs
# the unified backend (users, captains, rides services)
# ==============================================

# Use Node.js LTS Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for native modules (bcrypt needs python/make/g++)
RUN apk add --no-cache python3 make g++

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of the application
# Note: We copy everything needed for the monolith
COPY server.js ./
COPY socket.js ./
COPY services/ ./services/

# Remove unnecessary files from services (individual package.json, server.js, etc.)
# These are not needed in the monolith as we use the root-level files
RUN rm -f services/*/package*.json \
    && rm -f services/*/server.js \
    && rm -rf services/api-gateway

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Run the application
CMD ["node", "server.js"]
