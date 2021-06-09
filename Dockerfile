FROM node:16.3.0-alpine
RUN npm install -g yarn
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn install --prod
CMD [ "yarn", "start" ]
