# Pull node.js image
FROM node:16-alpine as build

WORKDIR /

# Install npm packages and cache this layer
COPY package*.json /

RUN npm install

# Build copy all source files and build React app
COPY ./ /
RUN npm run build

# Pull NGINX image
# FROM nginx:1.20

# Move all build files to NGINX serve folder
COPY --from=build /build /var/www/thatsmyplane.com/html

EXPOSE 80
