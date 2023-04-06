## Import the latest nodejs image
FROM node:19-slim

## Set the current working dir to /app
WORKDIR /api-server

## Copy the package.json
COPY /server/package.json /api-server

RUN npm i --omit=dev
RUN apt update && apt install curl -y

## Copy the app code
COPY /server /api-server

## Set the PORT
ENV PORT 9001
EXPOSE $PORT

## Command Entry point
CMD ["node", "server.js"]



