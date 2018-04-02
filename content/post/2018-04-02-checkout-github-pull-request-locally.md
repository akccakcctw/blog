---
title: "Checkout Github Pull Request Locally"
date: 2018-04-02T17:45:39+08:00
categories:
  - Git
tags:
description: ""
---

專案目錄底下的 `.git/config` 檔案內，記錄有 github 的 remote url，長相類似這樣：

```
[remote "origin"]
  url = git@github.com:akccakcctw/project.git
  fetch = +refs/heads/*:refs/remotes/origin/*
```

只要在下面新增一行 `fetch = +refs/pull/*/head:refs/remotes/origin/pr/*`，像這樣：

```
[remote "origin"]
  url = git@github.com:akccakcctw/project.git
  fetch = +refs/heads/*:refs/remotes/origin/*
  fetch = +refs/pull/*/head:refs/remotes/origin/pr/*
```

使用 `git fetch origin` 時就可以 fetch 到 PR 的 branch：

```
$ git fetch origin
From github.com:akccakcctw/project
 * [new ref]         refs/pull/1000/head -> origin/pr/1000
 * [new ref]         refs/pull/1002/head -> origin/pr/1002
 * [new ref]         refs/pull/1004/head -> origin/pr/1004
 * [new ref]         refs/pull/1009/head -> origin/pr/1009
...
```

成功 fetch 後就能 checkout 到該 branch 了：

```
$ git checkout pr/1002
Branch pr/1002 set up to track remote branch pr/1002 from origin.
Switched to a new branch 'pr/1002'
```


## 參考資料

 - [Gist: piscisaureus/pr.md](https://gist.github.com/piscisaureus/3342247)

