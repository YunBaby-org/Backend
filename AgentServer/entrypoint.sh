#!/bin/bash

# Configuration source:
# 
# -----------
# Environment
# -----------
#
# * AGENT_SERVER_CONFIG_FILE: The connection environment variable for TypeORM.js
#  Default path: /run/secrets/agent-server.env
#    TYPEORM_CONNECTION=postgres
#    TYPEORM_HOST=localhost
#    TYPEORM_PORT=5432
#    TYPEORM_DATABASE=postgres
#    TYPEORM_USERNAME=postgres
#    TYPEORM_PASSWORD=password

echo "Agent Server"

AGENT_SERVER_CONFIG_FILE="${AGENT_SERVER_CONFIG_FILE:-/run/secrets/agent-server.env}"

if [[ -f "${AGENT_SERVER_CONFIG_FILE}" ]]; then
    echo "[INFO] Loading config from " $AGENT_SERVER_CONFIG_FILE
    environments=`cat "$AGENT_SERVER_CONFIG_FILE" | sed 's/#.*//g' | xargs`
    export $environments
fi

# Execute whatever you invoked in cmd
exec "$@"
