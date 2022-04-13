FROM node:16.14-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn install --prod
CMD [ "yarn", "start" ]
