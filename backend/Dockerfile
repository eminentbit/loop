# Stage 1: Builder
FROM node:23-alpine AS builder

WORKDIR /app

# Copy and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Generate Prisma client if needed
RUN npx prisma generate --no-engine

# Uncomment this if you have a build step
# RUN npm run build  # If you have a build step, uncomment this

# Stage 2: Runtime
FROM node:23-alpine

WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder /app .

# Expose port 5000
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "run", "serve"]  