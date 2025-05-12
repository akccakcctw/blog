---
title: scss highlighting in vue
date: 2025-05-12T21:28:36.000+08:00
tags:
  - vue
---

在公司拿到了一臺新 mac，編輯 `.vue` 檔時，scss 不管在 mason 裝什麼 LSP 都沒有 hightlight 顏色提示，找了好久才在一篇 [reddit 的留言](https://www.reddit.com/r/neovim/comments/1arokom/comment/kqkyuf9/)看到解法，記錄一下：

```vim
:TSInstall scss
```
