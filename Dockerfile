# Use Node.js LTS version as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application (output goes to 'dist')
RUN npm run build

# Install a static file server to serve the dist directory
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the app from the 'dist' folder on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
