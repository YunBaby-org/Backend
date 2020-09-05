###########################
## Frontend static files ##
###########################
FROM frontend-static-files as frontend-static

###########
## Nginx ##
###########
FROM nginx:mainline

# Copy frontend static files to nginx
COPY --from=frontend-static ./dist /usr/share/nginx/html
