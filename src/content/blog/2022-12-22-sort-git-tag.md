---
title: "依 semver 排序 git tag"
date: 2022-12-22T13:45:52+08:00
draft: false 
categories:
tags:
  - command-line
description: ""
lastmod: 2022-12-22T13:45:52+08:00
---

由於 `git tag` 輸出不會按照 SemVer（語義化版本）的順序，需要自己調整，以下的方式可以讓輸出以正確的順序排列

```sh
git tag | tr - \~ | sort -V | tr \~ -
```
