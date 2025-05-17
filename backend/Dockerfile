# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the app (assumes NestJS or similar)
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# If your app needs other assets (e.g., .env, public folder), copy them too
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.env ./.env

EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
