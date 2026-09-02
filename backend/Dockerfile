# Use lightweight Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for efficient caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 8000

# Set environment variable defaults
ENV PORT=8000 \
    NODE_ENV=production

# Start server
CMD ["node", "server.js"]
