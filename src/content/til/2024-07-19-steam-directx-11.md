---
title: "Steam DirectX 11 問題"
date: 2024-07-19T18:25:43+08:00
draft: false
categories:
  - Linux
tags:
description: ""
lastmod: 2024-07-19T18:25:43+08:00
---

想要在新買的觸控平板（StarLite MK V，作業系統是 Manjaro）上面跑世紀帝國，發現沒辦法開啓，提示訊息大概意思是說找不到 DirectX 11 或是系統不支援 DirectX 11，查了一下網路資料，發現要安裝 `Vulkan`。

因爲平板是 intel 內顯，後來是安裝 `extra/vulkan-intel` 這個套件就成功了。


## 參考資料

- [Install And Test Vulkan On Linux](https://linuxconfig.org/install-and-test-vulkan-on-linux)

