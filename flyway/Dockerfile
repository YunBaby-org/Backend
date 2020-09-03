FROM flyway/flyway:latest-alpine
LABEL maintainer="garyparrot"

COPY ./flyway.example.conf  /flyway/conf/flyway.conf
COPY ./sql                  /flyway/sql

CMD [ "migrate" ]
