# Node.js + Alpine base image
FROM node:20-alpine

# Install dependencies: python3, pip, git, make, g++, etc.
RUN apk add --no-cache \
    python3 \
    py3-pip \
    git \
    build-base \
    curl

# Set working directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy lockfiles and install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy sources and config
COPY src ./src
COPY tsconfig.json ./

# Clone plando-random-settings
RUN git clone https://github.com/matthewkirby/plando-random-settings.git ./plando-random-settings

# Clone oot-randomizer franco branch
RUN git clone https://github.com/RawZ06/OoT-Randomizer.git ./OoT-Randomizer

# Checkout specific commits
RUN git -C plando-random-settings fetch && git -C plando-random-settings checkout 50813f8
RUN git -C OoT-Randomizer fetch && git -C OoT-Randomizer checkout d40d5f4

# Install pip dependencies
RUN pip3 install requests --no-cache-dir --break-system-packages

# Copy ROMs
COPY rom/* ./plando-random-settings/
COPY rom/* ./OoT-Randomizer/

# Copy weights
COPY custom_weights/* ./plando-random-settings/weights/
COPY custom_weights ./custom_weights

# Copy data and env
COPY data ./data
COPY .env ./

# Debug
RUN ls -lah .

# Build the app
RUN pnpm run tsc

# Start the app
CMD [ "node", "dist/index.js" ]