FROM node:19-slim AS client-app
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:19-slim AS server-build
WORKDIR /root/
COPY --from=client-app /usr/src/app/client/build ./client-app/build
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/ ./server/

EXPOSE 3080

CMD ["node", "./server/server.js"]