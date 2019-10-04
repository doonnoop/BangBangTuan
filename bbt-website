FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM abiosoft/caddy


COPY --from=build-stage /app/build /www

EXPOSE 80


COPY Caddyfile /etc/Caddyfile
