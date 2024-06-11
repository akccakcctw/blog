---
title: "Spotlight 找不到程式"
date: 2018-07-07T10:05:34+08:00
categories:
tags:
  - iTerm
  - macOS
description: ""
---

因為可以綁快速鍵，一直以來我都是以 Spotlight 開啟 iTerm，但是今天更新之後，在 Spotlight 搜尋卻怎麼樣都找不到 iTerm，簡直就是災難！（有沒有這麼誇張）

找了一下解決辦法發現超簡單，關掉再重開就好了，記錄一下作法：

```sh
# 關掉 Spotlight:
sudo mdutil -a -i off

# 重新開啟 Spotlight:
sudo mdutil -a -i on
```


## 參考資料

[StackExchange: Applications Don't Show Up in Spotlight](https://apple.stackexchange.com/questions/62715/applications-dont-show-up-in-spotlight)
