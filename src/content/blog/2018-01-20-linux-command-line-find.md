---
title: "Linux command-line: find 指令用法"
date: 2018-01-20T17:32:21+08:00
categories:
  - command-line
  - Linux
tags:
  - find
description: ""
---


## 常用參數

  - `type`
    - `f`: file
    - `d`: directory
    - `l`: symbolic
    - `p`: pipe
    - `s`: socket
  - `name`
  - `iname`: ignore case
  - `path`
  - `mtime`: modify time (day)
  - `atime`: access time (day)
  - `ctime`: create time (day)
  - `mmin`: (minute)
  - `amin`: (minute)
  - `cmin`: (minute)
  - `size`
  - `or`: 可以簡寫為 -o
  - `not`: 可以簡寫為 !
  - `exec`: execute
  - `delete`


## 基本用法

```sh
# name
find . -name findme # 找 'findme'
find . -name '*.js' # 找當前目錄底下的 js 檔
find . -name '*.py' -or -name '*.r' # 增加條件
find . -name '*.js' -not -path '*/node_modules/*' # 排除條件

# path
find . -path '**/lib/**/*.ext' # 找當前目錄底下路徑包含 lib 且為 .ext 的檔案

# time
find . -mtime 2 # 找 2 天前修改過的檔案
find . -mtime -1 # 找當前目錄底下 1 天內有修改過的檔案
find . -mtime +1 # 找當前目錄底下超過 1 天前有修改過的檔案

# type && size && iname
find /var -type f -size +50MB # 找 /var 底下大於 50MB 的檔案
find ~/Download -size +500k -size -10MB -iname '*.Tar.gZ'

# exec
# {} 代表的是所取得的 file 路徑
# （find 配合 rm 使用請非常小心）
find /tmp -mtime +180 -exec rm {} \; # 刪除 /tmp 底下修改時間超過 180 天的檔案
```


##  進階參數

  - `ok`
  - `execdir`
  - `okdir`
  - `user`
  - `group`
  - `regex`
  - `empty`
  - `perm`: permission


## 一些使用情境

```sh
# 不小心把檔案解壓，想要刪除 5 分鐘內建立的檔案..
find . -cmin -5 -exec rm -i {} \;
```


## 其他進階用法

```sh
# ok
# 執行指令前需要一一確認
find . -name '*.txt' -ok rm {} \;

# empty
# 在所有空目錄裡增加 .gitkeep
find . -type d -empty -exec touch {}/.gitkeep \;

# perm
find . -type f -perm 0777
find . -type f -not -perm 0777

# user
# 搜尋特定使用者的檔案
find /home -user rextsou -name '*.txt'

# group
# 指定檔案群組
find /home -group developer
```


## 參考資料

  - [Using the Linux find command with caution](https://www.networkworld.com/article/3233305/linux/using-the-linux-find-command-with-caution.html)
  - [Unix/Linux 的 find 指令使用教學、技巧與範例整理](https://blog.gtwang.org/linux/unix-linux-find-command-examples/)
