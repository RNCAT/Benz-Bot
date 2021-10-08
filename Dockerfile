FROM node:14.18.0-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install -production
CMD [ "node", "index.js" ]
