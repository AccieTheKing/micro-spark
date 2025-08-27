FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install dependencies using yarn (which handles version conflicts better)
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Remove dev dependencies to reduce image size
RUN yarn install --production --ignore-scripts --prefer-offline

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]