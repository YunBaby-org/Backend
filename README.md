# Backend

整個系統的組態。

## 需求

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## 建立本地開發環境

```shell
docker-compose build && docker-compose run
```

* **這個 Compose setup 是針對測試環境，不能用在 Production**
* 如果 Container 內容有變更，一定要執行 ``docker-compose build`` 來重新編譯

* Postgres(資料庫)
    * username: ``postgres``
    * password: ``password``
    * database: ``postgres``
    * address:  ``127.0.0.1:5432``
* RabbitMQ
    * username: ``guest`` (看附註)
    * password: ``guest``
    * address: ``127.0.0.1:5672``
    * Management console: ``http://127.0.0.1:15672``
* pgAdmin4(Postgres 資料庫 GUI)
    * ``http://127.0.0.1:5050``
    * 進去後輸入帳號密碼 (someone@somewhere, password)
    * 點 Add New Server
    * /General/Name: 隨意取
    * /Connection/Hostname: ``postgres``
    * /Connection/Port: ``5432``
    * /Connection/Username: ``postgres``
    * /Connection/Password: ``password``

## 如何測試你的應用

執行 ``docker-compose run`` 之後，服務會跑在隔離的容器之內。但容器有映射一部份的 Port 映射到 ``127.0.0.1`` 的 Port 上。比如 Postgres 在 ``127.0.0.1:5432``。
