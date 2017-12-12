---
title: "Arch Linux：環境設定與常用套件"
date: 2017-12-12T11:40:55+08:00
draft: true
categories:
  - Linux
  - command-line
tags:
  - Archlinux
  - Linux
description: ""
---

## GNOME 桌面設定

### 匯出與匯入設定檔

```sh
# 匯出
dconf dump / >~/.config/dconf/user.conf

# 匯入
dconf load / <~/.config/dconf/user.conf
```

## 中文輸入法以及中文環境

### 安裝 fcitx（注音）

fcitx 相關說明[維基](https://wiki.archlinux.org/index.php/Fcitx)寫得很清楚，建議看一下。

```sh
# fcitx-im 會一併安裝需要用到的附加套件，內含 fcitx, fcitx-gtk2, fcitx-gtk3 等等
pacman -S fcitx-im fcitx-configtool fcitx-chewing
```

安裝之後編輯 `~/.xprofile`：

```sh
# for fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"

export LANG=zh_TW.UTF-8 # 加入這行，預設語言會變成中文
export LC_CTYPE=zh_TW.UTF-8  # 能輸入中文
```

編輯完後存檔， `reboot` 之後系統就會變成中文的了，如果還是無法輸入中文的話，可以嘗試使用 `fcitx-diagnose` 來偵錯。


## 其它實用的套件

### 工具類

```sh
# Docker =>
pacman -S docker
systemctl enable docker # 開機時啟用

# tldr =>
# 懶得看 --help 時很好用
pacman -S tldr

# libinput =>
# 用來看 input 的硬體設備
pacaur -S libinput

# alsa =>
# 音訊控制
pacman -S alsa-utils
# 用法（GUI）
alsamixer

# asciinema =>
# 錄製與分享 terminal 影片，產生的檔案非常小。
# [Site](https://asciinema.org/)
pacman -S asciinema # install
# 錄製
asciinema rec # recording，<Ctrl-d> 或輸入 `exit` 停止
asciinema rec /tmp/my_rec.json # 錄製影片，存到本機端
asciinema rec -w 0.2 # 設定每次按鍵的時間間隔
# 播放
asciinema play https://asciinema.org/path
asciinema play /path/to/your.json

# ccat
# 用法和 `cat` 一樣，但支援語法 highlight。
pacaur -S ccat
```

### 編輯器

```sh
# VSCode
# [Site](https://aur.archlinux.org/packages/visual-studio-code/)
pacaur -S visual-studio-code
```

### 繪圖類

```sh
# GIMP
pacman -S gimp

# Krita
pacman -S krita

# mypaint
pacman -S mypaint

# Inkscape
pacman -S inkscape
```

### 文書編輯

```sh
# LibreOffice
pacman -S libreoffice
```

### GNOME UI

```sh
# Materia theme
# [Site](https://aur.archlinux.org/packages/materia-theme)
# [GitHub repo](https://github.com/nana-4/materia-theme)
pacaur -S materia-theme

# Paper Icon
# [Site](https://snwh.org/paper)
pacaur -S paper
```

### 其他

```sh
# Chrome
# [Site](https://aur.archlinux.org/packages/google-chrome/)
pacaur -S google-chrome
```


## 參考資料

[Apricity OS 安裝中文輸入法](fcitx-chewinghttps://cyku.tw/apricity-os-fcitx-chewing/)

[Where are GNOME keyboard shortcuts stored?](https://askubuntu.com/questions/26056/where-are-gnome-keyboard-shortcuts-stored)
