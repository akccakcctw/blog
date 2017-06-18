---
title: "SVN 常用指令備忘"
date: "2016-09-08T09:21:00"
categories: ["svn", "version control"]
---

## svn檔案狀態
- ?: 此檔案不存在 svn 內
- A: 此次新增的檔案
- C: 此檔案無法成功合併
- D: 此次移除的檔案
- M: 此檔案有修改
- U: 此檔案有更新

## status
查看 local 檔案與 svn server 版本異同，可簡寫為 `st`
```sh
svn st
```

## list
將 svn server 的檔案 list 出來，可簡寫為 `ls`
```sh
svn ls http://SVN_PATH/svn_project
```

## checkout
將資料 checkout 回來，可簡寫為 `co`
```sh
svn co http://SVN_PATH/svn_project
```

## update
將 local 檔案更新成 svn server 最新版，可簡寫為 `up`
```sh
svn up
```

## commit
將目前所作修改 commit 回 svn server，可簡寫為 `ci`
```sh
svn ci
svn commit -m "message"
```

## import 
將 project_directory 的資料匯入 svn server
```sh
svn import project_directory http://DOMAIN/svn_project
```

## add
將檔案或資料夾新增至 svn
```sh
svn add [filename | directory]
```

## mv
改檔名，並保留此檔案先前記錄
```sh
svn mv filename new_filename
```

## revert
在 commit 前執行，還原這次修改，回到前一版檔案狀態
```sh
svn revert [file | directory]
```

## merge
合併檔案
```sh

```

## 建立新branch
```sh
svn copy http://svnserver/calc/trunk http://svnserver/calc/branches/my-clac-branch -m "create a branch"
```

## 建立release tag
```sh
svn copy http://svnserver/calc/trunk http://svnserver/calc/tags/Release-1.0.0 -m "create Release tag for Release 1.0.0"
```

## info
列出路徑、版本號、修改日期等資訊
```sh
svn info
```

## log
列出 commit log
```sh
svn log #列出所有log
svn log -l 10 #列出10筆log
svn log -c 100 #列出revision 100 的log
svn log -v -c 100 #列出revision 100 的詳細log
```
