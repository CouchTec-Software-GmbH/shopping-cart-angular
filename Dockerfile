   ### STAGE 1: Build ###
   FROM node:18.13-alpine AS build
   WORKDIR /usr/src/app
   COPY package.json package-lock.json ./
   RUN npm install --legacy-peer-deps
   COPY . .
   RUN npm run build

   ### STAGE 2: Run ###
   FROM nginx:1.17.1-alpine
   COPY nginx.conf /etc/nginx/nginx.conf
   COPY --from=build /usr/src/app/dist/browser /usr/share/nginx/html
