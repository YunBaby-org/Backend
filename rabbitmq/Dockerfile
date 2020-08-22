FROM rabbitmq:3.8-management
LABEL maintainer="garyparrot"

COPY ./rabbitmq-plugins /etc/rabbitmq/enabled_plugins
COPY ./rabbitmq.config  /etc/rabbitmq/
COPY ./definitions.json /etc/rabbitmq/
