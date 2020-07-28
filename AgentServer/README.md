Agent Server
------------

Docker container environment
----------------------------

* ``AGENT_SERVER_CONFIG_FILE``: Path to configuration for Agent Server, the content will transform into environment variable before running the application

AGENT\_SERVER\_CONFIG\_FILE defeault value
---------------------------

``
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_DATABASE=postgres
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=password
SESSION_STORAGE_URL=redis://localhost
SESSION_SECRET=TH1$_1S_MY_D1RTY_L1TTLE_SECRET:3
``
