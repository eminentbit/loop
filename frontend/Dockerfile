# Use Node.js as the base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the static files
FROM nginx:alpine

# Copy the build files to nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Copy nginx configuration (if you have a custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]