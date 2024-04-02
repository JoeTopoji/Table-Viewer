# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Install dependencies in the root directory
COPY package*.json ./
RUN npm install

# Move to client directory and install/build client-side dependencies
COPY client /app/client
RUN cd client && npm install && npm run build

# Copy the rest of the application
COPY . /app 

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node","app"] 
