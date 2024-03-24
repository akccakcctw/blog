---
title: "yay: error while loading shared libraries: libalpm.so.13"
date: 2024-03-24T21:51:05+08:00
draft: false 
categories:
tags:
  - Linux
  - command-line
description: ""
lastmod: 2024-03-24T21:51:05+08:00
---

今天系統更新時遇到

```
ERROR: Cannot find the debugedit binary required for including source files in debug packages
``

以及

```
yay: error while loading shared libraries: libalpm.so.13: cannot open shared object file: No such file or directory
```

這兩個問題，只要自己手動安裝 `debugedit` 以及重裝 `yay` 即可，我的解法如下：

```sh
sudo pacman -R yay # uninstall old yay installation
sudo pacman -S debugedit
sudo pacman -S --needed git base-devel # 這行其實可以省略
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## 參考資料

- https://github.com/Jguer/yay/issues/2393
- https://itsfoss.community/t/archlinux-problems-with-yay-after-system-upgrade/11818/8
