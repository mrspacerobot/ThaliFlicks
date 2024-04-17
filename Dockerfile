# Use an official Node.js runtime as the base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install git
RUN apk update && apk add --no-cache git

# Clone the Nuxt.js app from the Git repository
RUN git clone https://github.com/mrspacerobot/ThaliFlicks.git .

# Install dependencies
RUN npm install

# Build the Nuxt.js app
RUN npm run build

# Expose the port that Nuxt.js runs on
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
