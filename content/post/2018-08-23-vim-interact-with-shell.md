---
title: "在 Vim 裡面使用 shell command"
date: 2018-08-23T11:44:31+08:00
categories:
  - vim
tags:
---

在 Vim 裡面驚嘆號指令挺常用的，可以在不離開 Vim 的狀態下執行 shell 指令，這也是 Vim 相對於其他編輯器最大的優勢。

語法為 `:!{command}`。

```
:!date # 取得今天的日期
:!ls # 列出目前資料夾內的檔案
```

如果在前面加上 `r` 的話，則可以將 shell command 的 output 內容插入 Vim 正在編輯的文件中：

```
# 語法為 `:r !{command}`。

:r !date # 插入 date  
:r !ls # 資料夾內檔案
:r !pwd # 所在資料夾路徑
```

## 參考資料

- [VIM Tip of the Day: running external commands in a shell](https://www.endpoint.com/blog/2009/03/10/vim-tip-of-day-running-external)
