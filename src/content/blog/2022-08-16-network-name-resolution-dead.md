---
title: "Network Name Resolution Dead 錯誤排除記錄"
date: 2022-08-16T18:56:13+08:00
draft: false 
categories:
tags:
description: ""
lastmod: 2022-08-16T18:56:13+08:00
---

今天上班上一半，突然網路就不能使用了，幾乎所有網頁都進不去，重新啟動電腦依然不行，但是發現手機網路還是好的，只好來檢查一下

使用 `ping -c 2 google.com` 發現完全沒有回應，但是 `ping 8.8.8.8` 卻可以！？

猜測是 DNS 解析出了問題，執行幾個指令試試看：

```sh
sudo resolvectl status 
sudo resolvectl flush-caches 
```

都回應我：
```sh
Unit dbus-org.freedesktop.resolve1.service not found.
```

用關鍵字上網 google 找解答，找到[這篇](https://superuser.com/questions/1427311/activation-via-systemd-failed-for-unit-dbus-org-freedesktop-resolve1-service)，檢查一下看是不是同一個問題

```sh
sudo systemctl status systemd-resolved.service
```

確認是 `systemd-resolved.service` 這個服務掛掉了，照順序執行

```sh
sudo systemctl enable systemd-resolved.service
sudo systemctl restart systemd-resolved.service
```

網路終於恢復正常！

