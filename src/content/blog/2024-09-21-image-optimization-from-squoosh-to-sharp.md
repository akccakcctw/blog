---
title: 圖片優化方案：從 squoosh 到 sharp
date: 2024-09-21T07:31:11.282Z
---

最近在研究 blog 的圖床架設，研究到圖片優化的部分時，想到一直以來用得順手的 web app `Squoosh.app` 應該也有 CLI 的執行方式，因此網路上找了下，看到[保哥的文章](https://blog.miniasp.com/post/2023/10/30/Useful-tool-Squoosh-and-Squoosh-CLI-to-Compress-Images)，才發現 [2023 年年初美國 Google 大裁員](https://www.bnext.com.tw/article/73822/microsoft-layoff-20210118)，直接導致了相關開發團隊的縮編，[因此 Squoosh CLI 和 `libsquoosh` 專案已經被 Google 放棄了](https://github.com/GoogleChromeLabs/squoosh/pull/1321)，不過 web app 倒是有持續開發就是。

後來繼續找，看是否有替代方案，發現了 [sharp](https://github.com/lovell/sharp) 這個開源專案，GitHub 目前星星數已經 28.9k！而且還不少人推薦的樣子，重要的是有人寫了 [CLI 介面](https://github.com/vseventer/sharp-cli)，看樣子可以來試試看了！

## 參考資料

- https://blog.miniasp.com/post/2023/10/30/Useful-tool-Squoosh-and-Squoosh-CLI-to-Compress-Images
- https://github.com/doggy8088/squoosh/tree/cli
- https://github.com/GoogleChromeLabs/squoosh
- https://github.com/lovell/sharp
- https://github.com/vseventer/sharp-cli
- https://github.com/donmccurdy/glTF-Transform/issues/751
- https://www.reddit.com/r/nextjs/comments/14mvsll/the_sharp_package_for_image_optimization_is_a/