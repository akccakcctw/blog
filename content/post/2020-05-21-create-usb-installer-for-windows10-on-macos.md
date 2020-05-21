---
title: "在 Mac 上製作 Windows 10 usb 安裝碟"
date: 2020-05-21T12:17:42+08:00
draft: false 
categories:
tags:
description: ""
lastmod: 2020-05-21T12:17:42+08:00
---

## 前言

一開始我是按照[這裡](https://www.top-password.com/blog/create-windows-10-bootable-usb-from-iso-on-mac/)（Method 2: Create Windows 10 Bootable USB on Mac Using Terminal）的步驟來製作，但最後 `cp` 時，會因為 install.wim 這個檔案過大而失敗：

```sh
cp -rp /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/* /Volumes/WIN10/
# cp: error writing '/Volumes/WIN10/sources/install.wim': File too large
```

原因是 FAT32 不支援單一檔案大於 4G：

```sh
ls -al /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/sources/install.wim
# -r-xr-xr-x 1 zoushiqi staff 4.2G Oct  7  2019 /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/sources/install.wim
# 4.2G...超過一些 QQ
```

我還試過 `dd`，可以製作，但機器認不出我製作好的隨身碟。


---

後來是使用 `wimlib` 才成功的，步驟如下，我們開始吧：


## 下載 ISO 檔

到官網下載 WIN10 ISO 檔，下載點：
https://www.microsoft.com/zh-tw/software-download/windows10ISO


## 格式化隨身碟

```sh
diskutil list # 先找到你的隨身碟代號，假設是 diskN
diskutil eraseDisk MS-DOS "WINDOWS10" GPT diskN # 抹除磁碟資訊
```

{{<alert>}}
抹除磁碟時請特別小心，此步驟無法復原。
{{</alert>}}


## 掛載 ISO 檔

```sh
hdiutil mount ~/Downloads/windows_10_iso/Win10_1909_Chinese\(Traditional\)_x64.iso
# /dev/disk2                                              /Volumes/CCCOMA_X64FRE_ZH-TW_DV9
```


## 確認 install.wim 檔案大小

```sh
ls -lh /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/sources/install.wim
# -r-xr-xr-x 1 zoushiqi staff 4.2G Oct  7  2019 /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/sources/install.wim
```


## 複製檔案到隨身碟

如果 install.wim **小於 4G**，那麼直接複製即可，複製好就完成了：

```sh
# 這邊使用 rsync，才能看到進度
rsync -avh --progress /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/ /Volumes/WINDOWS10
```

若 install.wim **超過 4G**，先複製其他檔案：

```sh
rsync -avh --progress --exclude=sources/install.wim /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/ /Volumes/WINDOWS10
```

再繼續以下步驟


## 下載 wimlib

[wimlib](https://wimlib.net/) 是 open source 的第三方套件

```sh
# 我使用 brew 安裝
brew install wimlib
```


## 使用 wimlib 複製檔案到隨身碟

```sh
# 注意副檔名為 swm，Windows 才知道這是分割檔
# 4000 意思是分割為不超過 4000 MB 的 chunks
wimlib-imagex split /Volumes/CCCOMA_X64FRE_ZH-TW_DV9/sources/install.wim /Volumes/WINDOWS10/sources/install.swm 4000
```

## 完工！

別忘了 unmount，然後就可以開心使用你的安裝碟啦～

```sh
hdiutil unmount /Volumes/CCCOMA_X64FRE_ZH-TW_DV9
hdiutil unmount /Volumes/WINDOWS10
```

## 參考資料

- [Microsoft: Install Windows from a USB Flash Drive](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/install-windows-from-a-usb-flash-drive)
- [Create Windows 10 bootable USB from ISO on Mac without BootCamp](https://www.top-password.com/blog/create-windows-10-bootable-usb-from-iso-on-mac/)
- [Make a bootable Windows 10 USB drive from a Mac](https://alexlubbock.com/bootable-windows-usb-on-mac)
