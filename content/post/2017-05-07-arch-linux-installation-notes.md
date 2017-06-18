---
title: "Arch Linux 安裝筆記"
date: "2017-05-07T16:56:00"
draft: true
categories: ["Linux", "Arch"]
---

## 安裝步驟

1. 利用.iso開機
1. 分割磁碟
1. 格式化磁碟
1. 掛載磁碟
1. 連接網路
1. 安裝系統
1. 建立`fstab`
1. `chroot`到新系統
1. 設定電腦名稱、語言、時區
1. 設定密碼、新增使用者
1. 建立開機映像
1. 設定`bootloader`
1. 啟動`swap`
1. 退出`chroot`、卸載硬碟、重新開機

## 分割磁碟
以下分割方式僅供參考：
/dev/sda1    2M    ef02    # BIOS
/dev/sda2    5G            # swap
/dev/sda3    20G           # /
/dev/sda4    40G           # /home
```sh
# List Block Device
lsblk

# GPT 分割，可用`gdisk`或`cgdisk`或`parted`
gdisk /dev/sda
```

## 格式化磁碟
```sh
# 格式化 swap
mkswap /dev/sda2

# 格式化磁碟
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4
```

## 掛載磁碟
```sh
# 掛載根目錄
mount /dev/sda3 /mnt

# 掛載家目錄
mkdir /mnt/home
mount /dev/sda4 /mnt/home
```

## 連接網路
wifi的連接很簡單，在終端輸入`wifi-menu`，就可以進入互動介面進行設定。
```sh
# 設定 wifi
wifi-menu

# 設定完畢後，測試網路有沒有通
ping 8.8.8.8
```

## 安裝系統

### 修改鏡像下載點
把靠近自己所在位置的下載點移到前面，不然下載速度會很～慢～：
```sh
vim /etc/pacman.d/mirrorlist
```

### 安裝基礎套件
```sh
pacstrap /mnt base base-devel
```

### 安裝常用套件
```sh
pacstrap /mnt vim
```

### 安裝 wifi 套件
經由 LiveCD(LiveUSB) 開機時，可以直接使用`wifi-menu`連接 wifi，但預設的`base`基礎套件包裡面沒有`wifi-menu`所需的`dialog`、`wpa_supplicant`、`iw`，因此要另外安裝：
```sh
pacstrap -i /mnt dialog wpa_supplicant iw
```

## 建立`fstab`
使新系統開機時能夠正確掛載磁碟
```
genfstab -p -U /mnt >> /mnt/etc/fstab
```

## `chroot`到新系統
```sh
# arch-chroot 是 Arch LiveCD 的 chroot，使用以下指令後，會把 /mnt （新系統）當成根目錄
arch-chroot /mnt /bin/bash
```

### 設定電腦名稱
```sh
echo "$myhostname" > /etc/hostname
```

### 設定語言及keymap
```sh
# 編輯 locale.gen
vim /etc/locale.gen # 將需要的語言註解拿掉（en_US.UTF-8, zh_TW.UTF-8, zh_CN.UTF-8）

# 產生 locale 檔案
locale-gen

# 設定預設語言
echo "LANG=en_US.UTF-8" > /etc/locale.conf
echo "KEYMAP=us" > /etc/vconsole.conf
```

### 設定時區
```sh
ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime
hwclock --systohc --utc
```

## 設定密碼、新增使用者
```sh
# 設定 root 密碼
passwd

## 新增使用者，請把`$user`代換為自己的帳號
useradd -m $user
passwd $user
```

## 建立開機映像（initramfs）
如果沒有修改 /etc/mkinitcpio.conf，可以跳過此步驟
```sh
mkinitcpio -p linux
```

## 設定`bootloader`
```sh
# 安裝開機管理程式
pacman -S grub
vim /etc/default/grub # 在底下新增一行 GRUB_DISABLE_SUBMENU=y

# 產生 grub 配置檔
grub-mkconfig -o /boot/grub/grub.cfg

#
grub-install --target=i386-pc --recheck /dev/sda
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
```

## 啟動 `swap`
```sh
# 啟動 swap
swapon /dev/sda2

# 開機自動啟動 swap
vim /etc/fstab # 加入 /dev/sda2 none swap defaults 0 0
```

## 退出`chroot`、卸載硬碟、重新開機
```sh
# 退出 chroot
exit

# 卸載硬碟
umount -R /mnt

# 重新開機
reboot
```

## 安裝`packer`
要使用aur套件庫的東西必須要有`packer`
```sh
# dependencies
pacman -S wget git expac jshon

# 暫時資料夾
mkdir packer && cd $_

```

## 安裝圖形介面（X）
```sh
pacman -S xorg
pacman -S xorg-server

# 安裝圖形介面啟動工具
pacman -S xorg-xinit

# 此時已經可以進入圖形介面
startx
```

## 安裝桌面環境（GNOME）
```
pacman -S gnome gnome-extra
```

## 安裝中文字形
```sh
pacman -S ttf-droid
```
其他可參考[https://wiki.archlinux.org/index.php/fonts#Chinese.2C_Japanese.2C_Korean.2C_Vietnamese](https://wiki.archlinux.org/index.php/fonts#Chinese.2C_Japanese.2C_Korean.2C_Vietnamese)

## 安裝輸入法



## 官方教學 wiki
1. [Installation guide](https://wiki.archlinux.org/index.php/installation_guide)
2. [General recommendations](https://wiki.archlinux.org/index.php/General_recommendations)
3. [List of applications](https://wiki.archlinux.org/index.php/List_of_applications)
4. [Network configuration](https://wiki.archlinux.org/index.php/Network_configuration)
5. [Wireless network configuration](https://wiki.archlinux.org/index.php/Wireless_network_configuration)

## 參考資料
- [Arch Linux Quick Installation with GPT in BIOS](https://blog.m157q.tw/posts/2013/12/30/arch-linux-quick-installation-with-gpt-in-bios/)

- [Arch Linux：安裝系統](http://www.wlintmp.net/2014/02/arch-linux.html)

- [Reddit(Arch Linux): No wifi-menu after install](https://www.reddit.com/r/archlinux/comments/3aplwl/newbie_no_wifimenu_after_install/)

- [Github: geniustanley/arch-linux-install](https://github.com/geniustanley/arch-linux-install)
