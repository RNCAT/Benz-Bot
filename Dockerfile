FROM node:14.17.0-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install -P
CMD [ "node", "index.js" ]
