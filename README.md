# Backend

整個系統的組態。

## 需求

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 建立本地開發環境

```shell
# start
docker-compose up
# build
docker-compose build
# remove data
docker-compose rm
```

- **這個 Compose setup 是針對測試環境，不能用在 Production**
- 如果 Container 內容有變更，一定要執行 `docker-compose build` 來重新編譯

- HTTP service(Nginx)
  - address `0.0.0.0:80`
- Postgres(資料庫)
  - username: `postgres`
  - password: `password`
  - database: `postgres`
  - address: `127.0.0.1:5432`
- RabbitMQ
  - username: `guest` (看附註)
  - password: `guest`
  - address: `0.0.0.0:5672`
  - Management console: `http://127.0.0.1:15672`
  - Authentication route `http://0.0.0.0:12300/authentication`
- pgAdmin4(Postgres 資料庫 GUI)
  - `http://127.0.0.1:5050`
  - 進去後輸入帳號密碼 (someone@somewhere, password)
  - 點 Add New Server
  - /General/Name: 隨意取
  - /Connection/Hostname: `postgres`
  - /Connection/Port: `5432`
  - /Connection/Username: `postgres`
  - /Connection/Password: `password`

## 如何測試你的應用(主動服務)

這個方法針對主動類型(你的 Service 主動和 Docker 內的 Service 互動)

執行 `docker-compose run` 之後，服務會跑在隔離的容器之內。但容器有映射一部份的 Port 映射到 `127.0.0.1` 的 Port 上。比如 Postgres 在 `127.0.0.1:5432`。

## 如何測試你的應用(被動服務)

這個方法針對被動類型(你的 Service 被 Docker 內的其他 Service 使用)
你必須要讓你的 Service 也跑在 Container 內，然後加入 Docker compose 的 Backend Network。

下面這個方法建立一個 Docker container，然後將他加到你獨立寫的 compose file，後面會透過特定指令，使你的 compose file 和 Backend 的主幹 compose file 內容合併。

0. ``cd your-project``
1. 替你的 Service 建立 Dockerfile，假設檔案在 ``./Dockerfile``
2. 撰寫獨立的 my-docker-compose.yml 檔案，位置在你的 project 根目錄，即 ``./my-docker-compose.yml``，內容類似於下者。
    ```yml
    version: "3.7"

    networks:
        backend:
    
    service:
        my-service:
            build: .
            networks:
                - backend
            # More docker compose setting goes here ....
    ```
3. 執行 ``docker-compose up -f ./path/to/backend/docker-compose.yml ./path/to/your-project/my-docker-compose.yml``
4. 執行後你的服務即跑在 Docker compose 的 backend network 內，可以和其他服務互動，如果有需要上 debugger 可以在你的 compose file 內將特定的 debugger port 映射出來

上面的指令中， ``-f`` 可以指定 docker-compose 組合多個 compose file 的內容，詳情看 https://docs.docker.com/compose/reference/overview/#use--f-to-specify-name-and-path-of-one-or-more-compose-files

## Vscode 下開發容器應用

https://code.visualstudio.com/docs/remote/containers