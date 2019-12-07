---
title: "Terminal Color Test"
date: 2019-12-07T16:54:58+08:00
categories:
tags:
  - command-line
  - Linux
description: ""
lastmod: 2019-12-07T16:54:58+08:00
---

今天更新了 terminal 內使用的套件庫，順便調整了些 vim 以及 tmux 的設定，意外發現了 iTerm2 的 GitHub 上有些有趣的測試可以拿來玩，例如 [24-bit-color.sh](https://github.com/gnachman/iTerm2/blob/master/tests/24-bit-color.sh)。

它的用途是檢查 terminal 是否支援 true color，大部分的 terminal 都已經支援了（[支援列表在這](https://gist.github.com/XVilka/8346728#now-supporting-truecolour)）。用法就是載回來存成 .sh 並記得 `+x` 後，直接在 teminal 內執行即可。有支援的話就會顯示如下的完美漸層：

![Imgur](https://i.imgur.com/OL5BDt5.jpg)


## 參考資料

- [iTerm2 tests](https://github.com/gnachman/iTerm2/tree/master/tests)
- [Terminals supporting truecolour](https://gist.github.com/XVilka/8346728#now-supporting-truecolour)
