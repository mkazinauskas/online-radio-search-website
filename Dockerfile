FROM node:15.14.0-alpine3.10 AS base
RUN npm install -g npm@7.10.0 && npm --version

FROM base AS build
WORKDIR /build

COPY / ./

RUN npm install && npm run build

FROM base AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/ ./

RUN ls -la

# COPY --from=build /build/package*.json ./
# COPY --from=build /build/.next ./.next
# COPY --from=build /build/public ./public
# COPY --from=build /build/.env ./
# COPY --from=build /build/.env.production ./
# COPY --from=build /build/next.config.js ./

# COPY --from=build /build/tailwind.config.js ./
# COPY --from=build /build/postcss.config.js ./

# RUN npm install next

EXPOSE 3000
CMD npm run start