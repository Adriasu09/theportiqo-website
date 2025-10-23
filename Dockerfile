# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy application source
COPY . .

# Build argument for API URL
ARG NEXT_PUBLIC_API_URL
ENV VITE_API_URL=${NEXT_PUBLIC_API_URL}

# Build the application
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
