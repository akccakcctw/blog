---
title: "在 macOS 上安裝 Docker"
date: 2018-03-10T15:49:48+08:00
categories:
tags:
description: ""
---

## Option 1： 使用官網提供的安裝包

在[官網](https://docs.docker.com/docker-for-mac/install/)可以直接下載 Stable 或 Edge 版的 `Docker.dmg` 安裝，新的安裝包會安裝「Docker for Mac」，裡面包含 Docker Engine、Docker CLI client、Docker Compose、Docker Machine、Kitematic。

如果電腦比較舊，也可以下載「Docker Toolbox」支援比較舊的電腦。

官網上有詳細的說明，建議直接前往觀看。


## Option 2： 使用 Homebrew 安裝 

因為不需要 GUI 介面，我選擇使用 `brew` 安裝，主要參考[這篇文章](https://pilsniak.com/how-to-install-docker-on-mac-os-using-brew/)，以下為安裝流程。

```sh
brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve
```

`xhyve` 是 [macOS X 上基于 FreeBSD/bhyve 的虛擬技術](https://www.vpsee.com/2015/06/mac-os-x-hypervisor-xhyve-based-on-bhyve/)，（[專案網址](https://github.com/mist64/xhyve)），相較 VirtualBox 來說非常輕量化。由於 `docker-machine-driver-xhyve` 需要 root 權限才能運行，所以要執行以下指令：

```sh
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
```

然後就可以建立新的 docker-machine 了，最後的 `--xhyve-experimental-nfs-share` 讓你可以共享 `/Users/` 底下的檔案

```sh
docker-machine create default --driver xhyve --xhyve-experimental-nfs-share
# docker-machine ls 可看到建立的 machine

# 由於可能 create 很多 machine
# 以下指令能讓你預設使用 "default" 這個 machine
# 如果不想每次新開 session 就重打，可以寫入 bash_profile 內
eval $(docker-machine env default)
```

要啟動或停止則可以使用以下指令：

```sh
docker-machine start default
docker-machine stop default
docker-machine restart default

# 其他可能有用的指令
docker-machine env # 列出 env variables
docker-machine regenerate-certs default # 重新產生 TLS connection certs
docker-machine ip default # 顯示 machine ip
docker-machine ssh default # ssh 進入後，cd 到根目錄應該可以看到共享的 /Users/ 資料夾
docker-machine --help
```

## 參考資料

[How to install Docker on Mac OS using brew?](https://pilsniak.com/how-to-install-docker-on-mac-os-using-brew/)

