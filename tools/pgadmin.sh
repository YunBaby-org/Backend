#!/bin/bash

PORT=5050
EMAIL=someone@somewhere
PASSWORD=password

docker run  --network host --rm \
            -e "PGADMIN_LISTEN_PORT=${PORT}" \
            -e "PGADMIN_DEFAULT_EMAIL=${EMAIL}" \
            -e "PGADMIN_DEFAULT_PASSWORD=${PASSWORD}" \
            -d dpage/pgadmin4

if [[ -z $! ]]; then
    echo "+-----------------------------------------------------+"
    echo "    pgAdmin4 might takes a minute to loading.          "
    echo "                                                       "
    echo "    Application listen at http://127.0.0.1:${PORT}     "
    echo "    Email: ${EMAIL}                                    "
    echo "    Password: ${PASSWORD}                              "
    echo "+-----------------------------------------------------+"
fi
