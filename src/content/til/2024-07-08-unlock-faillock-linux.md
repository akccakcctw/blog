---
title: "unset faillock"
date: 2024-05-20T16:40:32+08:00
draft: false
categories:
  - Linux
tags:
description: ""
lastmod: 2024-05-20T16:40:32+08:00
---

今天不小心 `sudo` 打錯太多次密碼，結果自己被鎖，錯誤訊息如下：

```sh
The account is locked due to 3 failed logins.
(10 minutes left to unlock)
```

查了資料發現如果已經在系統內，可以下指令 `reset`，不用真的等 10 分鐘：

```sh
# 查詢登入失敗的記錄
faillock --user myUsername

# reset
faillock --user myUsername --reset
```

## 參考資料

- [How to unlock linux user after too many failed login attempts](https://superuser.com/questions/1597162/how-to-unlock-linux-user-after-too-many-failed-login-attempts)
