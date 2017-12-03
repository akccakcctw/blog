---
title: "Arch Linux 安裝筆記"
date: 2017-12-03T11:34:20+08:00
categories:
  - Linux
  - command-line
tags:
  - Archlinux
  - Linux
description: ""
---

本文使用 **BIOS + GPT** 開機。如果開機方式不同的話，有些地方會不完全適用，要特別注意。

## 準備開機碟

先到[官網](https://www.archlinux.org/download/)下載 .iso 檔，Arch 映像檔由於只包含基礎需求，大約只有 500MB 左右，可以燒成光碟或是 USB drive，現在比較少看到用光碟了，都是 USB drive 為主，製作方式可以直接參考[官方維基](https://wiki.archlinux.org/index.php/USB_flash_installation_media)。

簡單來說，如果手邊有 Linux 環境，可以直接用 `dd`，只有 Windows 的話，官方推薦使用 Rufus、USBwriter 這些軟體（也可以使用 [dd for Windows](https://chocolatey.org/packages/dd/0.5)）。

我是在 Windows 做，但沒有使用官方推薦的工具，而是另外找了 [MultiBootUSB](http://multibootusb.org/)（[Github](https://github.com/mbusb/multibootusb)） 來用，它可以在同一個 USB drive 上放多個不同的 .iso 來使用，除了 Arch，我還放了 Ubuntu、CentOS、Manjaro 來備用。


## 確認開機模式

如果不清楚 BIOS 和 UEFI 的差別，可以參考[這篇](https://www.howtogeek.com/56958/htg-explains-how-uefi-will-replace-the-bios/)，或是[這篇](https://www.techbang.com/posts/4356-fully-understand-uefi-bios-theory-and-actual-combat-1-liu-xiudian)。注意，有些新的電腦為了避免<del>老人</del>困惑，會把 UEFI 稱作 BIOS，然後把 BIOS 叫做 Legacy 之類的名字。

首先要確認開機模式，比較新的主機板都有支援 UEFI 開機，可以在開機時按 F2（或 del 之類）選擇開機模式，但我這台筆電比較舊，只有支援 BIOS。如果已經開機了，也可以使用以下指令確認：

```sh
# 如果沒有以下資料夾，那就是用 BIOS 開機，反之是用 UEFI 開機
ls /sys/firmware/efi/efivars
```


## 準備網路

Arch 安裝時會需要網路，我是使用無線網路，因此就在命令列裡打 `wifi-menu`，然後會有圖形化介面，選擇自己的網路即可。

```sh
# 要確認自己有沒有連上網路，最簡單的方式就是 ping 看看
ping 8.8.8.8
ping archlinux.org
```

如果網路沒通，就要自己寫設定檔，再使用 `netctl` 手動連接了，  
相關流程如下：

```sh
# 查詢網卡 interface name。有線網卡會是 e 開頭，無線網卡則會是 w 開頭
ip link

# 假設查到的網卡是 enp8s0（以有線網路為例）
cd /etc/netctl
cp examples/ethernet-static ./

# 然後修改設定
vim ethernet-static
```

要修改的地方有：

  1. `Interface=enp8s0`
  1. `Address=('255.255.255.0/24')`：子網路遮罩
  1. `Gateway='xxx.xxx.xxx.xxx'`：預設閘道
  1. `DNS=('8.8.8.8')`：DNS 伺服器

然後就可以存檔，使用自己的設定：

```sh
ip link set enp8s0 down
netctl start ethernet-static # 然後 ping 看看有沒有通
```


## 分割硬碟

如果不熟悉硬碟分割相關知識，可以參考鳥哥[分割規劃](http://linux.vbird.org/linux_basic/0130designlinux.php#partition)和[分割指令](http://linux.vbird.org/linux_basic/0230filesystem.php#disk)來熟悉一下。  
官方維基對於硬碟分割的說明則[在這邊](https://wiki.archlinux.org/index.php/partitioning)。

我們可能用到的指令有 `lsblk`、`blkid`、`parted`、`gdisk`、`cgdisk` 等等：

```sh
# 檢查目前硬碟分割情況
lsblk

# 如果不確定是不是 GPT，可以使用 parted 檢查
parted /dev/sda print

# 已經是 GPT 分割表，就直接使用 cgdisk 分割
cgdisk /dev/sda

# 如果沒有 GPT 分割表，使用 gdisk 建立新的
gdisk /dev/sda
```

我切出四個分割區：

- **/boot**: sda1 (2M)
- **swap**： sda2 (2G)
- **/root**： sda3 (20G)
- **/home**： sda4 (89.8G)

然後用 `mkswap`、 `mkfs` 格式化，磁碟使用 `ext4` 檔案系統：  
（如果你是 UEFI 開機，會需要一個 EFI 分割區，並格式化成 `FAT32`，指令是 `mkfs.fat -F32 /dev/sda1`）

```sh
mkswap /dev/sda2 # swap
mkfs.ext4 /dev/sda3 # root
mkfs.ext4 /dev/sda4 # /home
```

格式化之後，就可以一一掛載起來：

```sh
# 把 root 掛到 /mnt
mount /dev/sda3 /mnt

# 然後把 /home 掛到 /root 下面
mkdir /mnt/home
mount /dev/sda4 /mnt/home

# 記得要啟用 swap
swapon /dev/sda2
```


## 安裝

### mirrorlist
修改 mirror，下載會比較快：

```sh
# 編輯 mirrorlist，將台灣的網址移到最上面存檔即可
vim /etc/pacman.d/mirrorlist
```

### 開始安裝

用 `pacstrap` 開始安裝套件。

如果依照官方流程，可以先裝 `base` 和 `base-devel`，其他等 `chroot` 步驟時再用 `pacman` 裝。  
我覺得在這邊一次裝完比較方便，下面範例是我會用到的套件，可以依自己需求增減：

```sh
pacstrap /mnt base base-devel \
intel-ucode \ # 如果是 intel 的 cpu
zsh tmux git openssh rsync sshfs neovim gvim \ # 這三行是一些常用工具
python python-pip python-neovim xclip \
htop exa ripgrep fd-rs \
nodejs npm yarn \ # 程式語言及相關工具
gnome gnome-tweak-tool \ # GNOME 桌面
noto-fonts noto-fonts-cjk adobe-source-code-pro-fonts \ # 字型
firefox # 瀏覽器
```

安裝套件時如果遇到 PGP signature 的問題（之前使用舊的 .iso 有遇到這個問題，換新的 .iso （archlinux-2017.12.01-x86_64）就沒遇到了）：

```sh
error: libcap: signature from "Anatol Pomozov <avatol.pomozov@gmail.com>" is unknown trust
:: File /mnt/var/cache/pacman/pkg/libcap-2.25-1-x86_64.pkg.tar.xz is corrupted (invalid or corrupted package (PGP signature))
```

可嘗試更新 key：

```sh
pacman-key --populate archlinux
pacman-key --refresh-keys
```

如果更新 key 也遇到問題，像這樣 `==> ERROR: A specified local key could not be updated from a keyserver.`

可試著依[這篇](https://bbs.archlinux.org/viewtopic.php?id=195139)的解法，手動下載 key：

```sh
pacman-key -r 0xFC1B547C8D8172C8
```


## 設定系統

### 產生 fstab 檔

`/etc/fstab` 是開機時的設定檔，開機時會依這個檔案的內容掛載檔案系統。

```sh
genfstab -U /mnt | sed -e 's/relatime/noatime/g' >> /mnt/etc/fstab

# 確認 UUID 是否正確（和 blkid 比對）
vim /mnt/etc/fstab
```

### `chroot` 進入安裝好的系統

```sh
arch-chroot /mnt
```

### 設定語系（locale）

```sh
# 把 /etc/locale.gen 檔案裡，
# en_US.UTF-8 和 zh_TW.UTF-8 的註解拿掉
sed -i -e 's/^#\(en_US\|zh_TW\)\(\.UTF-8\)/\1\2/g' /etc/locale.gen
locale-gen

echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

### 設定時間（timezone）

```sh
export TIMEZONE=Asia/Taipei # 台北時區
ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime
hwclock --systohc
systemctl enable systemd-timesyncd
```

### 設定電腦名稱（hostname）

```sh
export HOSTNAME=<hostname> # 給電腦取個名字
echo $HOSTNAME > /etc/hostname
sed -ie "8i 127.0.1.1\t$HOSTNAME.localdomain\t$HOSTNAME" /etc/hosts
```

### 設定啟動程式（systemctl）

```sh
systemctl enable fstrim.timer # 有 SSD 才需要，啟用每週執行 fstrim
systemctl enable NetworkManager
systemctl enable gdm # GNOME 顯示管理器
sed -ie 's/#\(WaylandEnable\)/\1/' /etc/gdm/custom.conf
```

### 建立開機映像

用途：

> Creates an initial ramdisk environment for booting the linux kernel.

```sh
vim /etc/mkinitcpio.conf # (optional) 看有沒有要修改
mkinitcpio -p linux
```

### 安裝與設定開機程式（bootloader）

詳細介紹請參考[這篇](https://wiki.archlinux.org/index.php/GRUB)。

```sh
pacman -S grub
grub-install --target=i386-pc --recheck /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg # 建立 grub 設定檔
```

### 新增使用者

```sh
sed -ie 's/# \(%wheel ALL=(ALL) ALL\)/\1/' /etc/sudoers

export USERNAME=<username>
# 加上 -m 參數才會建立使用者家目錄以及 .bash 相關檔案
useradd -mG wheel,storage,power,video,audio $USERNAME
passwd $USERNAME # 設定密碼
```

### 退出 `chroot`，並重新開機

```sh
exit
umount -R /mnt
reboot
```


## 參考資料

- [Arch Linux: Installation guide](https://wiki.archlinux.org/index.php/installation_guide)
- [Arch Linux 安裝筆記](https://leomao.github.io/2017/09/archlinux-install-note/)
- [Arch Linux Quick Installation with GPT in BIOS](https://blog.m157q.tw/posts/2013/12/30/arch-linux-quick-installation-with-gpt-in-bios/)
