###########################
## Frontend static files ##
###########################
FROM docker.pkg.github.com/yunbaby-org/frontend/frontend-static-files:latest as frontend-static

###########
## Nginx ##
###########
FROM nginx:mainline

# Copy frontend static files to nginx
COPY --from=frontend-static ./dist /usr/share/nginx/html

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
