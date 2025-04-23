FROM node:lts-alpine

ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules

RUN npm install -g cors-anywhere && \
    mkdir -p /usr/src/app

COPY server.js /usr/src/app/

WORKDIR /usr/src/app

EXPOSE 8080

CMD ["node", "server.js"]
