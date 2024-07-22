---
title: "修正 /dev/tpmrm0 造成開機緩慢"
date: 2024-07-22T17:33:45+08:00
draft: false
categories:
  - Linux
tags:
description: ""
lastmod: 2024-07-22T17:33:45+08:00
---

測試了一陣子 StarLite MK V，一直覺得開機速度很慢，後來發現是因爲開機程序會去執行 `/dev/tpmrm0`，但是沒有回應，會一直等到 timeout（花了 1 分半在等待 orz）。

查到網路上有人和我的情形很像，解法是：

```sh
systemctl mask dev-tpmrm0.device
```

簡而言之就是把這個服務遮蔽（mask）啦，這行指令會建立一個 symlink，將 `dev-tpmrm0` 指向 `/dev/null`，確保它無法被任何服務使用，效果比 stop 和 disable 更強一些，如果要取消遮蔽的話，可以下：

```sh
systemctl unmask dev-tpmrm0.device
```

不過因爲我目前沒有需要使用 TPM，就先遮蔽掉了~


## 參考資料

- [Boot process slowdown because of /dev/tpmrm0 start job.](https://bbs.archlinux.org/viewtopic.php?id=296699)

