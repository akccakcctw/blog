---
title: Pacman 更新 404 錯誤
date: 2025-03-16T23:14:38.000+08:00
tags:
  - Linux
---

今天更新 pacman 套件時，遇到 404 錯誤，錯誤訊息說是找不到 community.db，一開始以爲是鏡像源出問題了，改了一輪發現都沒有用，後來爬論壇發現是 `[community]` 這個 repo 被 merge 進 `[extra]`，且早在 2 年前就已經 deprecated 了，直到 `2025-03-01` 才正式移除，原來我 lag 兩年了 XD

修正的方式其實也很簡單，編輯 `/etc/pacman.conf`，把以下兩行移除即可


```conf
[community]
Include = /etc/pacman.d/mirrorlist
```

## 參考資料
- https://bbs.archlinux.org/viewtopic.php?id=303841
- https://archlinux.org/news/cleaning-up-old-repositories/
