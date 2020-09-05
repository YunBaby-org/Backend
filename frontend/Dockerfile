###################
## Builder Stage ##
###################
FROM node as builder

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
