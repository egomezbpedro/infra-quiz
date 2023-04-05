## Import the latest nodejs image
FROM node:19-slim

## Set the current working dir to /app
WORKDIR /api-server

## Copy the package.json
COPY ./server/package.json .

RUN npm i --omit=dev

## Copy the app code
COPY /server .

## Set the PORT
ENV PORT 9001
EXPOSE $PORT

## Command Entry point
CMD ["node", "index.js"]



