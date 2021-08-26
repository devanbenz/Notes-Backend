FROM node:alpine

WORKDIR /

COPY . /

RUN yarn install

EXPOSE $PORT

ENTRYPOINT [ "node","index.js" ]