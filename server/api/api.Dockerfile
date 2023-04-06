## Import the latest nodejs image
FROM node:19-slim

## Set the current working dir to /app
WORKDIR /api-server

## Copy the package.json
COPY package.json .

## Install all dependencies
ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm i; \
        else npm ci --only=production; \
    fi

## Copy the app code
COPY . ./

## Set the PORT
ENV PORT 5000
EXPOSE $PORT

## Command Entry point
CMD ["node", "index.js"]