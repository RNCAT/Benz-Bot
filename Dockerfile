FROM node:16.13.0-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn install
CMD [ "yarn", "start" ]