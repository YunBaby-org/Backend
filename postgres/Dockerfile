FROM postgres:13-alpine
LABEL maintainer="garyparrot"

COPY ./passwd /run/secrets/postgres-passwd

ENV POSTGRES_PASSWORD_FILE=/run/secrets/postgres-passwd
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres
