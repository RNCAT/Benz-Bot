FROM node:16-bullseye-slim AS build
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@7.26.2 --activate
RUN pnpm install
RUN pnpm build
RUN pnpm prune --prod
ENV NODE_ENV production

FROM gcr.io/distroless/nodejs:16 AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD [ "dist/index.js" ]