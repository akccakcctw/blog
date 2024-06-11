---
title: "Use `host.docker.internal` as Hostname in Linux and mac Docker Container"
date: 2022-10-14T18:12:15+08:00
categories:
tags:
description: ""
lastmod: 2022-10-14T18:12:15+08:00
---

首先有一個 nginx conf 設定檔

```nginx
server {
  listen 80;
  listen [::]:80;

  server_name dev.mydomain.com;

  location / {
    proxy_pass http://host.docker.internal:16686;
  }
}
```

原本是只有給 mac 的 docker 開發使用，所以在 `proxy_pass` 的 hostname 設定爲 `host.docker.internal`

如果這個檔案是在 linux 的 docker 下執行，因爲拿不到 `host.docker.internal`，會造成 nginx container 掛掉，linux 環境的使用者需要把這行改爲

```nginx
proxy_pass http://172.17.0.1:16686
```

{{<note>}}
linux 可以使用 `ip addr show docker0` 找到 docker 使用的 host 爲 `172.17.0.1`
{{</note>}}


如果想要同時滿足 mac / linux 使用，可以利用 docker 的 `--add-host` 參數：

```sh
docker --add-host=host.docker.internal:host-gateway
```

或是 docker-compose 的 `extra_hosts` 設定：

```docker
your_service:
  ...
  extra_hosts:
    - "host.docker.internal:host-gateway"
```

如此一來，在 mac / linux 都可以使用 `host.docker.internal` 與 host 連線了


## 參考資料

- https://stackoverflow.com/questions/48546124/what-is-linux-equivalent-of-host-docker-internal
- https://stackoverflow.com/questions/70725881/what-is-the-equivalent-of-add-host-host-docker-internalhost-gateway-in-a-comp
