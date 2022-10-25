---
title: "使用 netcat 操作 redis"
date: 2022-10-25T18:44:14+08:00
categories:
tags:
description: ""
lastmod: 2022-10-25T18:44:14+08:00
---

以往都是使用圖形介面程式連接 redis 看上面的資料或者做其他操作，今天發現如果只是想要看一下某個值有沒有設成功，或是比較簡單的操作時，其實用 `netcat`（`nc`）可以更快速的做到：

```sh
nc -v <REDIS_SERVER> <REDIS_SERVER_PORT>
```

如果公司的 redis server 有擋 VPN，也可以走 proxy：

```sh
nc -v -X connect -x <PROXY:PORT> <REDIS_SERVER> <REDIS_SERVER_PORT>
```

進去後就用 redis command 執行即可
