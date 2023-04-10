FROM node:16-alpine AS react-app
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . /app
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Set hostname
ARG REACT_APP_HOST_NAME_DOCKER
ENV REACT_APP_HOST_NAME_DOCKER $REACT_APP_HOST_NAME_DOCKER
ARG REACT_APP_IN_DOCKER
ENV REACT_APP_IN_DOCKER $REACT_APP_IN_DOCKER
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
# Start the app
# CMD [ "npx", "serve", "build" ]

FROM nginx:stable-alpine AS nginx-builder
COPY --from=react-app /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
