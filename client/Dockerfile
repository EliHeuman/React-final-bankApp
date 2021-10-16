# Use a lighter version of Node as a parent image
FROM node:14-alpine as build
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .
# install dependencies
RUN yarn run build
# NGINX Web server
FROM nginx:1.12-alpine as prod
# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy the build directory contents into the container at /usr/share/nginx/html
COPY --from=build /client/build/ /usr/share/nginx/html
# Run the app when the container launches
CMD ["nginx", "-g", "daemon off;"]