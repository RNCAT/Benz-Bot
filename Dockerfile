FROM node:16-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@7.9.5 --activate
RUN pnpm install
RUN pnpm build
RUN pnpm prune --prod
ENV NODE_ENV production

FROM node:16-alpine AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD [ "node", "dist/index.js" ]
