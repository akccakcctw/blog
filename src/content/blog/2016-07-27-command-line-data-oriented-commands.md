---
title: "Command Line 資料重導向相關命令"
date: "2016-07-27T01:11:00"
categories:
  - bash
  - command-line
---

## `stdin`、`stdout`、`stderr`
- `0：stdin`（Standard input）標準輸入
- `1：stdout`（Standard output）標準輸出
- `2：stderr`（Standard error）標準錯誤輸出

## `>`
**redirect output to a file（將`stdout`導向檔案，會覆寫原有檔案）**
```bash
# 將現在路徑輸出至 path.txt
pwd > path.txt
```

## `>>`
**redirect output to an existing file（將`stdout`導向檔案末尾，原檔案內容保留）**
```bash
# 將現在路徑內的檔案列表輸出至 path.txt 末，但保留 path.txt 原有的資料
ls >> path.txt
```

## `<`
**read input from a file （將檔案當作`stdin`）**
```bash
# 列出 text.txt 內含有字元 t 的行
grep t < text.txt

# 輸出至 output.txt
grep t < text.txt > output.txt
```

## `|`
**pass output to another command（將`stdout`當作另一指令的`stdin`）**
```bash
# 列出現在資料夾內含有'a'字元的檔案
ls | grep a

# 將`ls -l`的輸出用`less`分頁
ls -l | less
```

## `tee`
**both redirect output to a file and pass it to another command（`>`和`|`的綜合，將`stdout`導向檔案之後，後面繼續接`|`，再將`stdout`當作另一指令的`stdin`），目的是為了導向到多個輸出。**

可以想像成大寫的 T，就很好理解它的管道概念了。
```bash
ls | tee list.txt | grep a

# -a：追加而不覆蓋目標文件
ls | tee -a list.txt | grep a
```

## `stderr`的重導
**`stderr`預設會輸出至終端，如果想要輸出至檔案，也可以用`|&`代替`|`，則`stderr`會與`stdout`一起輸出至管道後方指定的程式或檔案。**

## 標準檔案控制代碼的重導
可將檔案描述符（數字）放在重導向符號前，影響重導向的資料流
```bash
# `stderr`會輸出至stderr.txt，`stdin`則一樣輸出到終端
cat input.txt 2> stderr.txt

# `stderr`會與`stdin`融合輸出至result.txt
find / -name .profile > result.txt 2>&1
```

## 參考資料
- [維基百科：標準串流](https://zh.wikipedia.org/wiki/%E6%A8%99%E6%BA%96%E4%B8%B2%E6%B5%81)
- [維基百科：管道（Unix）](https://zh.wikipedia.org/wiki/%E7%AE%A1%E9%81%93_(Unix))
- [維基百科：重新導向（電腦）](https://zh.wikipedia.org/wiki/%E9%87%8D%E5%AE%9A%E5%90%91_(%E8%AE%A1%E7%AE%97%E6%9C%BA))
