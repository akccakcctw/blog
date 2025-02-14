---
title: docker keep container running
date: 2025-02-14T10:30:33.000+08:00
tags:
  - Docker
  - Nuxt
---

最近開發 Nuxt 專案，嘗試利用 docker 開了一個 node.js container，但 node.js 如果經由 docker 啟動，沒有跑程式時整個 container 會自動關閉

後來發現在 Dockerfile 中使用以下指令可以讓 container 保持運行：

```dockerfile
CMD ["tail", "-f", "/dev/null"]
```

