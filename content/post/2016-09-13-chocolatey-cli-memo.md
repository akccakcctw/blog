---
title: "chocolatey 指令備忘"
date: "2016-09-13T09:42:00"
categories: ["cmd", "windows"]
---

## 搜尋／列出套件
```bash
choco search <filter> [<options>/<switches>] # 搜尋套件
choco list <filter> [<options>/<switches>] # 搜尋套件
clist <filter> [<options>/<switches>] # 可簡寫為 clist

#-----基礎用法-----
choco search git # 搜尋git
choco list --local-only # 列出已安裝套件
choco list -l # -l:--local-only 的縮寫

#-----進階用法-----
choco search git -s "'https://somewhere/out/there'"
choco search bob -s "'https://somewhere/protected'" -u user -p pass
choco list -li # -i:--include-programs 的縮寫
```

## 安裝套件
```bash
choco install <pkg|packages.config> [<pkg2> <pkgN>] [<options/switches>] # 安裝套件
cinst <pkg|packages.config> [<pkg2> <pkgN>] [<optins/switches>] # 簡寫

#-----基礎用法-----
choco install git #安裝 git
choco install git -y #安裝 git 並跳過確認訊息

#-----進階用法-----
choco install nodejs.install --version 0.10.35 # 指定安裝版本
choco install ruby --version 1.9.3.55100 -my # -m:--allow-multiple-versions 可安裝多版本
choco install ruby --version 2.1.5 -my
```

## 移除套件
```bash
choco uninstall <pkg|all> [pkg2 pkgN] [options/switches] # 移除套件
cuninst <pkg|all> [pkg2 pkgN] [options/switches] # 縮寫

#-----基礎用法-----
choco uninstall git # 移除 git

#-----進階用法-----
choco uninstall notepadplusplus googlechrome atom # 移除多個套件
choco uninstall ruby --version 1.8.7.37402 # 移除指定版本
choco uninstall nodejs.install --all-versions # 移除全版本
```

## 升級套件
```bash
choco upgrade <pkg|all> [<pkg2> <pkgN>] [<options/switches>] # 升級套件
cup <pkg|all> [<pkg2> <pkgN>] [<options/switches>] # 縮寫

#-----基礎用法-----
choco upgrade chocolatey # 升級 chocolatey
choco upgrade all # 升級全部套件

#-----進階用法-----
choco upgrade all --except="'skype,conemu'"
choco upgrade git -s "'https://somewhere/protected'" -u user -p pass
```

## 查看需要更新的套件
```bash
choco outdated [<options/switches>]

#-----基礎用法-----
choco outdated # 列出需要更新的套件

#-----進階用法-----
choco outdated -s https://somewhere/out/there
choco outdated -s "'https://somewhere/protected'" -u user -p pass
```

## 套件資訊
```bash
choco info <pkgname> # 列出套件資訊
```

## 參考資料
- [Github: chocolatey](https://github.com/chocolatey/choco/wiki/CommandsReference)
