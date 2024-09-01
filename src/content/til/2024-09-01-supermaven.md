---
title: "Show `docker` command output"
date: 2024-09-01T18:24:51+0800

draft: false
categories:
  - editor
tags:
description: ""
lastmod: 2024-09-01T18:24:51+0800
---

之前看過同事在 VSCode 上使用 copilot，不過因爲我已經付費買 openai（對話式雖然繁瑣，不過可以用在大部分場景），要多買套工具還是有些成本考量，就一直沒有下手。

直到最近，因爲公司想要導入 AI 工具，因此研究了一下能夠配合 nvim 的 code completion tool，發現 [supermaven](https://supermaven.com) 用起來挺順手，也確實能節省不少打程式碼的時間，目前體感大約是一小時的工作可以節省 15-20 分鐘。

爲什麼會挑 supermaven 呢？

因爲：

- 免費
- 有官方 nvim plugin
- 速度快
- token context window 超大（[據 supermaven 官網描述](https://supermaven.com/blog/introducing-supermaven)，它是市面上最快速的 code completion tool，且如果付費的話，甚至支援超大的 1000000 token context window）

總之就先試用一段時間，如果有機會用別的工具，或是升級 Pro 版的話，再來比較看看吧
