# Use official Node.js runtime as base image
FROM node:23-alpine AS builder

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all source files
COPY . .

RUN npm run build

FROM node:23-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port (typical for backend services)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]