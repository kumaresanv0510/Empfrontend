# Use official Node.js image to build the project
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project and build it
COPY . .
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy built frontend to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the application port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
