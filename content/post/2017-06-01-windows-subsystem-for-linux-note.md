---
title: "Windows Subsystem for Linux 筆記"
date: "2017-06-01T07:42:00"
draft: true
categories: ["Windows Subsystem", "Linux"]
---

## Ubuntu 14.04 -> 16.04

### 檢查現在系統資訊
```bash
$ lsb_release -a 
```

### 重新安裝子系統

- 砍掉重練（官方推薦）

```cmd
:: 移除Windows上的子系統
c:\> lxrun /uninstall /full /y 

:: 重新安裝
c:\> lxrun /install
```

- 直接更新

```bash
$ sudo do-release-upgrade
```

## 參考資料
- [Windows 10 Creators Update: What’s new in Bash/WSL & Windows Console](https://blogs.msdn.microsoft.com/commandline/2017/04/11/windows-10-creators-update-whats-new-in-bashwsl-windows-console/)
