FROM node:15.8.0-alpine3.13 AS base
RUN npm install -g npm


FROM base AS build
ENV NODE_ENV=production
WORKDIR /build

COPY /package*.json ./
COPY /pages ./pages
COPY /public ./public
COPY /styles ./styles
COPY /next.config.js ./

RUN npm install --only=prod && npm run build

RUN ls -la
RUN du -sh node_modules

FROM base AS production
WORKDIR /app

COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/next.config.js ./

RUN npm install next

EXPOSE 3000
CMD npm run start