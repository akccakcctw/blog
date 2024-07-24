---
title: "Show `docker` command output"
date: 2024-07-24T13:25:27+08:00

draft: false
categories:
  - Linux
tags:
description: ""
lastmod: 2024-07-24T13:25:27+08:00
---

爲了找 `dockerfile` 哪一個步驟造成 php 版本被改變，我在檔案內加了不少 `RUN php -v`，但是發現都沒有顯示結果，查資料才知道需要下 `--progress` 參數

```sh
--progress string    Set type of progress output (auto, plain, tty). Use plain to show container output (default "auto")
```

指令執行起來會像這樣：

```sh
docker --progress=plain --no-cache XXX build 
docker compose --progress=plain --no-cache XXX build 
```

或者也可以利用環境變數 `BUILDKIT_PROGRESS` 取代這個 flag

```sh
export BUILDKIT_PROGRESS=plain
```


## 參考資料

- [stackoverflo: Why is docker build not showing any output from commands?](https://stackoverflow.com/a/64805337)

