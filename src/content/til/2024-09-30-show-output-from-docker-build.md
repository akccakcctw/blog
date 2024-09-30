---
title: show output from docker build
date: 2024-09-30T13:17:47.233Z
---

今天在 build dockerfile 時遇到錯誤，但因爲 echo 一直出不來，找了一下原因，原來只要把設定打開就可以了

```sh
docker compose build --progress=plain <container_name>
# or
DOCKER_BUILDKIT=0 docker compose build ...
```

## 參考資料
https://stackoverflow.com/questions/64804749/why-is-docker-build-not-showing-any-output-from-commands