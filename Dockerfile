FROM node:15.14.0-alpine3.10 AS base
RUN npm install -g npm@7.10.0 && npm --version

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build

COPY / ./

RUN npm install && npm run build

FROM base AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/next.config.js ./

RUN npm install next

EXPOSE 3000
CMD npm run start