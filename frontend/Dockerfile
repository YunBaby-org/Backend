###################
## Builder Stage ##
###################
FROM node as builder

# Building arguments
ARG VUE_APP_BASE_URL
ARG VUE_APP_GMAP_API
ARG VUE_APP_ROAD_API
ARG VUE_APP_AMQP_USER
ARG VUE_APP_AMQP_PASSWORD

# Copy package
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY ./ ./

# Building static frontend data 
RUN npm run build

###################
## Packing Stage ##
###################
FROM alpine

# Copy the static file
COPY --from=builder ./dist /dist
