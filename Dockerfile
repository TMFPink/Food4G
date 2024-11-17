# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules && npm install && npm uninstall bcrypt && npm i bcrypt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]