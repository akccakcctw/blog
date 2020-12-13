---
title: "使用 scrcpy 投影 android 裝置"
date: 2020-12-13T16:47:54+08:00
categories:
tags:
description: ""
lastmod: 2020-12-13T16:47:54+08:00
---

## 簡介
[scrcpy](https://github.com/Genymobile/scrcpy) 可以透過 USB 或是 TCP/IP 來投影或是控制 Android 裝置，且不需要 root 權限。目前支援 GNU/Linux、macOS、Windows 平臺。

特色是效能很好（30-60 fps）、支援高解析度（1920x1080 or above）、低延遲（35-70 ms）、可以經由 wifi 無線連接，且不需要安裝任何東西在手機上。

如果 chromecast 不算在內的話，是我目前使用過最方便好用的 android 投影方式。


## 專案網址
https://github.com/Genymobile/scrcpy


## 系統需求

可參考專案的 [Requirements 說明](https://github.com/Genymobile/scrcpy#requirements)：

- 你需要一台電腦，GNU/Linux, macOS, Windows 都可以
- 一台 Android 手機（Android 5.0 以上）
- 手機開啟 USB 偵錯功能


## 安裝

- [android tools](https://www.archlinux.org/packages/community/x86_64/android-tools/)

android tools 內含 adb (android debug bridge) 相關工具

```sh
sudo pacman -S android-tools
```

- [scrcpy (AUR)](https://aur.archlinux.org/packages/scrcpy/)

```sh
# 我使用 yay 來安裝 AUR 的軟體
sudo yay -S srcrpy
```


## 開始投影

步驟好像有點少，但順利的話到這邊已經可以投影了。

接上 USB，並且在手機上選擇 USB 用途爲 MTP 或 PTP（我的手機只有 PTP 可以選），選擇後應該會跳出「允許 USB 偵錯嗎？」的確認框，選擇「允許」。

接着在電腦上執行指令即可投影：

```sh
# 投影
scrcpy

# 全螢幕模式
scrcpy --fullscreen

# 調整方向
scrcpy --rotation 0|1|2|3

# 螢幕錄影
scrcpy --record path/to/file.mp4

```

如果你有多個設備：

```sh
# 列出設備 id
adb devices

scrcpy --serial [DEVICE_ID] # 可以簡寫爲 scrcpy -s [DEVICE_ID]
```


## Troubleshooting

1. no permissions

`adb devices` 顯示沒有權限，如以下訊息：

```sh
$ adb devices
List of devices attached
[DEVICE_ID] no permissions; see [http://developer.android.com/tools/device.html]
```

```sh
# 列出 usb 設備
lsusb

# 以下爲參考輸出
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 002: ID 8087:0a2b Intel Corp. Bluetooth wireless interface
Bus 001 Device 004: ID 045e:0782 Microsoft Corp. Microsoft USB Optical Mouse
Bus 001 Device 003: ID 0f39:1083 TG3 Electronics K108D
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 021: ID 18d1:4ee4 Google Inc. Nexus/Pixel Device (tether+ debug)
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

找到手機的資訊：`Bus 003 Device 021: ID 18d1:4ee4 Google Inc. Nexus/Pixel Device (tether+ debug)`
記下 `18d1:4ee4`，這兩個 ID 分別是 idVendor 以及 idProduct，接着來調整 udev 設定：

```sh
cd /etc/udev/rules.d 
ls

# 名稱可能是 51-android.rules，沒有的話就自己新增一個
sudo vim 51-android.rules
```

加入以下：

```sh
# 1. [USER_NAME] 填入自己的 user name
# 2. idVendor 及 idProduct 填入自己手機的 id
# 3. MODE 爲權限設定
OWNER=="[USER_NAME]", SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", ATTRS{idProduct}=="4ee4", MODE="0666"
```

reload 剛剛加上的設定：

```sh
# archlinux
sudo udevadm control --reload

# 如果是其他系統，也許要改用
sudo service udev restart
```

接着拔掉 usb 重新接上，執行以下指令即可：

```sh
sudo adb kill-server
sudo adb start-server

adb devices
```


## 參考資料

- [scrcpy 官方 README](https://github.com/Genymobile/scrcpy/blob/master/README.md)
- [Linux 下 adb 的使用及 adb devices：no permissions 问题的解决](https://blog.csdn.net/binglumeng/article/details/69525361)
- [使用 udev 進行動態核心裝置管理](https://documentation.suse.com/zh-tw/sles/11-SP4/html/SLES-all/cha-udev.html)
