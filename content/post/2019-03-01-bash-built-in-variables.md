---
title: "Bash Built in Variables"
date: 2019-03-01T15:13:38+08:00
categories:
  - Bash
tags:
  - Bash
description: ""
lastmod: 2019-03-01T15:13:38+08:00
---

shell script 對我來說是個「目的性」很強的語言，雖然每天都要使用，但直接在指令列使用和寫成 `xxx.sh` 總感覺不是同一件事（而且我其實用的是 zsh）。由於缺乏系統性的學習，儘管日常使用沒有問題，但要寫成檔案時還是感覺生疏，其實我連 if 判斷怎麼下都不是非常肯定（一點都不誇張，if condition 一個方括號和兩個方括號的差別我也是最近才知道）。

因此，我覺得有必要稍微補強這方面的知識，作點筆記應該會有幫助。這篇用來記錄 bash 內建變數，在寫 shell script 時，如果可以善用內建的變數，指令看起來會更簡潔易讀。

## 指令列表

| 內建變數 | 解釋                                                | 用途                         |
|----------|-----------------------------------------------------|------------------------------|
| $#       | 參數數量                                            |                              |
| $*       | 所有參數（合起來當成「一個」字串，`"$1 $2 ..."`）   |                              |
| $@       | 所有參數（每個參數當作獨立的字串，`"$1" "$2" ...`） |                              |
| $_       | 上一個指令的最後一個參數                            |                              |
| $-       | 傳遞給指令的 flag                                   |                              |
| $?       | 最後執行指令的回傳值（exit code）                   | 檢查上一個指令或函式是否正確 |
| $$       | 指令自身的 process ID                               | 常用來創造一個臨時的檔名     |
| $!       | 最後一個背景執行指令的 process ID                   |                              |
| $0       | 指令名稱（指令路徑）                                |                              |
| $n       | 第 n 個參數（index 從 1 開始）                      |                              |

## 參考資料 

- [$#, $@ & $?: Bash Built-in variables](https://coderwall.com/p/85jnpq/bash-built-in-variables)
- [Bash Special Variables](https://www.mylinuxplace.com/bash-special-variables/)
