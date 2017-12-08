---
title: "Arch Linux：套件管理工具 pacman"
date: 2017-12-09T23:51:08+08:00
categories:
  - Linux
  - command-line
tags:
  - Archlinux
  - Linux
description: "簡單來說，pacman 類似 Ubuntu 的 apt 或者 CentOS 的 yum。只是它是專門給 arch 用的。它的設定檔位置在：/etc/pacman.conf，如果有特殊需求，可參閱 Arch Wiki 有比較詳細的設定說明。"
---

> The `pacman` package manager is one of the major distinguishing features of Arch Linux. It combines a simple binary package format with an easy-to-use build system. The goal of pacman is to make it possible to easily manage packages, whether they are from the official repositories or the user's own builds.

簡單來說，`pacman` 類似 Ubuntu 的 `apt` 或者 CentOS 的 `yum`。只是它是專門給 arch 用的。它的設定檔位置在：`/etc/pacman.conf`，如果有特殊需求，可參閱 [Arch Wiki](https://wiki.archlinux.org/index.php/Pacman_(%E6%AD%A3%E9%AB%94%E4%B8%AD%E6%96%87)#.E8.A8.AD.E5.AE.9A) 有比較詳細的設定說明。


## 相關檔案位置：

  - 設定檔：`/etc/pacman.conf`
  - 套件資料庫資訊：`/var/lib/pacman/`
  - 暫存檔案位置：`/var/cache/pacman/pkg/` （安裝或是更新套件時，這些套件都會先被下載到這邊暫存，再進行安裝）


## 常用指令

相較其他 package manager 使用指令式（例如 `apt-get install`，比較直觀），`pacman` 使用 flag（其實都是縮寫，也可以打全稱），而且數量滿多的，需要花點時間熟悉，但是熟悉之後用起來很快。  
常用的話應該不會忘，如果忘記再 `man pacman` 或是 `tldr pacman` 就好，常用的指令第一個 flag 都是大寫：


### 安裝

```sh
# 安裝套件
# -S: sync
pacman -S <package>

# 安裝套件並更新套件資料庫資訊
pacman -Sy <package> # 建議不要這樣使用，可能會造成 dependency issue
pacman -Syu <package> # 建議這樣用

# 安裝不在檔案庫的 package（例如 AUR 的 package）
pacman -U /path/to/package/package_name-version.pkg.tar.xz
pacman -U http://www.example.com/repo/example.pkg.tar.xz # 也可以從網址安裝
```

### 移除

```sh
# 移除套件
# -R: remove
pacman -R <package>

# 移除套件及其相依套件
# -s: recursive
pacman -Rs <package>
```

### 更新

```
# 更新套件（全系統）
# -u: upgrade
pacman -Syu
```

### 查詢

```sh
# 查詢套件
# -s: search
pacman -Ss <search_pattern>

# 查詢套件安裝的檔案列表
# -Q: query
pacman -Ql <package> | less

# 查詢已安裝的套件
pacman -Q
pacman -Qs string # 用關鍵字查詢
pacman -Q | grep <package> # 也可以配合 grep 使用

# 查詢套件詳細資訊
# -i: info
pacman -Qi <package>

# 查詢外來套件
pacman -Qm

# 從路徑反查套件
# -o: owner
pacman -Qo /path/to/package
```

### 暫存

```sh
# 清除暫存檔以及未用到的套件資料庫資訊
# -c: clean
pacman -Scc

# 僅清除目前未使用的暫存檔
pacman -Sc
```

### 其他相關

```sh
# 列出套件的依賴樹
pactree <package>
pactree -r <package>
```


## AUR（Arch User Repository）

> Arch 使用者軟體倉庫 (AUR) 是由社群推動的使用者軟體庫。它包含了軟體包描述單 (PKGBUILD)，可以用 `makepkg` 從原始碼編譯軟體包，並透過 `pacman` 安裝。 透過 AUR 可以在社群間分享、組織新進軟體包，熱門的軟體包有機會被收錄進軟體庫。[^1]

簡單來說，AUR 是社群分享的軟體庫，裡面包含有軟體的 PKGBUILD，用 `makepkg` 編完之後，就可以使用 `pacman` 來管理了，它的網址在 [https://aur.archlinux.org/](https://aur.archlinux.org/)。

你可以選擇手動安裝，或者使用 helper（例如 `pacaur`）來安裝，一般來說使用 helper 較方便。

### 手動安裝 AUR package

```sh
# 下載 package
cd ~/builds
curl -O https://aur.archlinux.org/packages/fo/foo/foo.tar.gz

# 檢查是否有惡意程式碼
cd foo
vim PKGBUILD
vim foo.install

# 編譯
makepkg -s

# 安裝，語法為：`<程式名稱>-<程式版本號>-<程式修訂版號>-<架構>.pkg.tar.xz`
pacman -U foo-0.1.1-i686.pkg.tar.xz

```

### `pacaur`

`pacaur` 可以輔助 `pacman` 來使用，會自動從 AUR 取得軟體進行編譯與安裝。

底下為 `pacaur` 安裝方式，或者也可以參考[這裡](https://gist.github.com/Tadly/0e65d30f279a34c33e9b)安裝。

```sh
# 安裝 pacaur
gpg --recv-keys --keyserver hkp://pgp.mit.edu 1EB2638FF56C0C53 # 匯入金鑰
bash <(curl aur.sh) -si cower pacaur
rm -r cower pacaur # cleanup

# 用法
pacaur -S <package>
```

## 參考資料

[特色Linux發行版—Arch Linux（中）](http://www.netadmin.com.tw/article_content.aspx?sn=1502020003&jump=2)

[Arch Wiki: pacman](https://wiki.archlinux.org/index.php/pacman)

[^1]: https://wiki.archlinux.org/index.php/Arch_User_Repository_(%E6%AD%A3%E9%AB%94%E4%B8%AD%E6%96%87)
