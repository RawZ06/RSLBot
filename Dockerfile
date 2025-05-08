# Node project
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install python3 environment
RUN apt-get -o Acquire::AllowInsecureRepositories=true \
            -o Acquire::AllowDowngradeToInsecureRepositories=true \
            update && \
    apt-get install -y python3 python3-pip

# Install pnpm
RUN npm install -g pnpm

COPY package.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY src /usr/src/app/src
COPY tsconfig.json /usr/src/app

# Clone plando-random-settings
RUN git clone https://github.com/matthewkirby/plando-random-settings.git /usr/src/app/plando-random-settings

# Clone oot-randomizer franco branch
RUN git clone https://github.com/RawZ06/OoT-Randomizer.git /usr/src/app/OoT-Randomizer

# Checkout commit
RUN (cd plando-random-settings && git fetch && git pull && git checkout 2e8d548)
RUN (cd OoT-Randomizer && git fetch && git pull && git checkout d0a0343)

# Install pip dependencies
RUN pip3 install requests --break-system-packages

# Copy rom
COPY rom/* /usr/src/app/plando-random-settings
COPY rom/* /usr/src/app/OoT-Randomizer

# Copy weights
COPY custom_weights/* /usr/src/app/plando-random-settings/weights/
COPY custom_weights /usr/src/app/custom_weights

# Copy data
COPY data /usr/src/app/data

# Copy env
COPY .env /usr/src/app

# debug
RUN ls -lah /usr/src/app

# Build the app
RUN pnpm run tsc

CMD [ "node", "dist/index.js" ]