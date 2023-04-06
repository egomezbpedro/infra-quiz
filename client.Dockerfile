## Import the latest nodejs image
FROM node:19-slim

## Set the current working dir to /app
WORKDIR /client

## Copy the package.json
COPY client/package.json /client

RUN npm i --omit=dev

## Copy the app code
COPY /client .

## Set the PORT
ENV PORT 9011
EXPOSE $PORT

## Command Entry point
CMD ["npm", "start"]