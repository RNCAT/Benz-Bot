FROM node:16-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@7.9.1 --activate
RUN pnpm install
RUN pnpm build
ENV NODE_ENV production

FROM node:16-alpine AS production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/dist ./dist
RUN corepack enable
RUN corepack prepare pnpm@7.9.1 --activate
RUN NODE_ENV=production pnpm install
CMD [ "node", "dist/index.js" ]