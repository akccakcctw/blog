---
title: "利用 Neovim review PR diff"
date: 2024-05-20T16:40:32+08:00
draft: false
categories:
  - vim
  - Git
tags:
description: ""
lastmod: 2024-05-20T16:40:32+08:00
---

因爲有些 PR 實在太大包，改動檔案太多、或者單一檔案大幅修改，上面這些情況使用 GitHub 網頁介面很容易載不出來，這時候其實利用 nvim 來開就很方便，我們只要把 nvim 設定爲 git 的 difftool 即可，調整一下 ~/.gitconfig 設定：

```gitconfig
[difftool]
  prompt = true
[diff]
  tool = nvimdiff
[difftool "nvimdiff"]
  cmd = "nvim -d \"$LOCAL\" \"$REMOTE\""
```

公司專案 host 在 GitHub，因此我習慣利用 `gh` 先切換到需要被 review 的 branch：

```sh
gh pr checkout <PR_NUMBER>
```

然後直接下指令：

```sh
# 可以直接 review 整個 branch 的 diff，會有 prompt 提示，一個一個開檔案來檢查
git difftool develop

# 或者只想要看其中某（幾）支檔案的改動
git difftool develop xxx.js
```

目前這樣用下來覺得比網頁開啓速度快上不少，語法 highlight 因爲是自己的編輯器設定，也很易讀，但美中不足的是想要 comment 時沒辦法直接在 nvim 進行，也許之後再來研究靠套件來解決


## 參考資料

- [Use Neovim as a git difftool](https://oozou.com/til/use-neovim-as-a-git-difftool-57)
- [Vimdiff files between git branches](https://stackoverflow.com/questions/68651723/vimdiff-files-between-git-branches)

