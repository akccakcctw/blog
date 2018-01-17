---
title: "Arch Linux：Surface Pro 4 安裝筆記"
date: 2017-12-31T01:37:20+08:00
categories:
  - Linux
  - command-line
tags:
  - Archlinux
  - Linux
description: ""
---

八月多買了 Surface Pro 4 之後，就想著要灌 Linux 方便寫程式，但是擔心硬體支援度（觸控螢幕、雙鏡頭、鍵盤保護蓋、手寫筆……）還有[保固](https://www.reddit.com/r/SurfaceLinux/comments/3uf3sy/psa_installing_linux_on_your_surface_pro_4_will/)，一些有的沒有的問題，所以遲遲沒有動手。

前幾天練習灌 Arch Linux，2009 年買的老筆電（Lenovo y550）竟然改頭換面，變得超順手的（當然除了重量太重以外），就決定要來搞一下我的新筆電。網路上查到一篇[超級詳細的文章](https://ramsdenj.com/2016/08/29/arch-linux-on-the-surface-pro-4.html#setup-the-root-pool)，也讓我增加不少信心。

另外，這篇筆記主要是給我自己備忘用的，因此有些地方可能寫得比較不清楚，如果過程中有遇到什麼問題、或是解決了什麼問題，都歡迎留言和我說。  
然後建議是對 Linux 系統、CLI 介面有基本瞭解再嘗試，你可以從 Ubuntu 之類的開始熟悉，不然你一定會遇到很多困難 XD

先簡述一下環境：

---

硬體：

  - 主機：Surface Pro 4（i5、8G ram、256G SSD）
  - 配件：鍵盤保護蓋（Type Cover）
  - 配件：藍芽滑鼠（Surface Arc Mouse）
  - 配件：手寫筆（Surface Pen）

安裝後環境：

  - 開機模式：UEFI
  - 分割表：GPT
  - 開機選單：Linux + Windows（開機時有選項，預設是進入 Arch）
  - 

---

## 準備硬碟

先進入 Windows，作一些事前的準備工作，建議先把磁碟加密的功能關掉。

### 清理磁碟

左下角按搜尋（搜尋快捷鍵：win + s），找「磁碟清理」，把不必要的檔案都清掉，騰出多一點空間。

### 壓縮磁碟

如果你之前已經有分割過了，建議把資料先備份一下，重新規劃分割。

進入磁碟管理（快捷鍵：win + x），右鍵點選 C 槽壓縮一下，我大概壓到 Windows 和 Linux 各佔一半。另外特別注意的是，Windows 會在硬碟最後面切一塊還原分割，那是讓 Windows 出問題時還原用的。要不要保留看自己（我有保留），如果不留的話，Windows 就無法使用還原功能。


## 建立 USB 開機碟

在[這篇](https://blog.rex-tsou.com/2017/12/arch-linux-%E5%AE%89%E8%A3%9D%E7%AD%86%E8%A8%98/#準備開機碟)提到的 MultiBootUSB，似乎無法在我的 Surface 上使用，不知道什麼問題，因此使用下面的方法來手動製作。

在 Windows 環境，下載好官網的 .iso 之後（我的版本是 `archlinux-2017.12.01-x86_64.iso`），直接用 `powershell` 掛載映像檔，指令如下：

```powershell
Mount-DiskImage -ImagePath "D:\path\to\source.iso"
```

這指令就跟虛擬光碟機的效果一樣，所以你可以在光碟機（F 槽之類的）看見掛載上去的檔案。  
然後，準備好你的 USB 碟，格式化為 `FAT32`，再把光碟機裡面的所有檔案直接複製到 USB 上就完成了！


## 從 USB 開機

首先要進入 UEFI 介面，有兩種方式：

  1. 開機時，按著音量增加鍵
  1. 在 Windows 點選重新啟動按鈕時按著 Shift 鍵，會出現隱藏選單，選擇進入 UEFI

進入 UEFI 介面後，發現還是可以使用觸控螢幕，滿方便的。

### 關閉 Secure Boot

關閉 Secure Boot 功能之後，才能從 Arch Linux ISO 開機，因此要在 UEFI 裡面把這個功能關閉。

### 調整開機順序

把 USB 開機順序拖曳到最上面，然後重新開機。


## 調整文字大小

Surface Pro 螢幕解析度很高，因此進入 Arch 文字安裝介面後，應該會發現字超級小的，可以用 `setfont` 改變字體來調整文字大小，底下這個 32 號字看起來還行。

```sh
setfont /usr/share/kbd/consolefonts/latarcyrheb-sun32.psfu.gz
```


## 連上網路

可以參考[Arch Linux 安裝筆記](https://blog.rex-tsou.com/2017/12/arch-linux-%E5%AE%89%E8%A3%9D%E7%AD%86%E8%A8%98/#準備網路) 
我使用無線網路：

```sh
wifi-menu
ping 8.8.8.8
```


## 分割硬碟

Surface Pro 的硬碟名稱比較奇怪，不是常見的 `sdx` 而是叫作 `nvme0n1`，去查了下發現是因為硬碟的連接介面不是 `SATA` 而是 `NVM Express port`，好像有比較厲害。

分割的指令就不細講了，請參考[Arch Linux 安裝筆記](https://blog.rex-tsou.com/2017/12/arch-linux-%E5%AE%89%E8%A3%9D%E7%AD%86%E8%A8%98/#分割硬碟)。

我的分割方式如下（用 `parted` 看，注意編號順序有點不一樣，我新增的是編號 5、6、7）：

| Number | Size | File system | Name | Flags |
| ------ | ---- | ----------- | ---- | ----- |
| 1 | 273MB | fat32 | EFI system partition | boot, esp |
| 2| 134MB  |  | Microsoft reserved partition | msftres |
| 3| 125G | ntfs | Basic data partition | msfdata |
| 5| 2147MB | swap | swap ||
| 6| 21.5GB | ext4 | /root ||
| 7| 106GB | ext4 | /home ||
| 4| 1835MB | ntfs | Basic data partition | hidden, diag |

如果有跨作業系統共用檔案的需求，共用分割區的檔案系統建議使用 `NTFS`，否則 Windows 會看不懂。


## 格式化、掛載

**小心**不要格式化到 Windows：

```sh
mkswap /dev/nvme0n5 # swap
mkfs.ext4 /dev/nvme0n6 # /
mkfs.ext4 /dev/nvme0n7 # /home

mount /dev/nvme0n6 /mnt # 掛載 root

mkdir /mnt/boot
mount /dev/nvme0n1 /boot # 掛載 EFI

mkdir /mnt/home
mount /dev/nvme0n7 /mnt/home # 掛載 home

swapon /dev/nvme0n5 # 啟用 swap
```


## 安裝套件

參考[Arch Linux 安裝筆記](https://blog.rex-tsou.com/2017/12/arch-linux-%E5%AE%89%E8%A3%9D%E7%AD%86%E8%A8%98/#安裝)

### mirrorlist

```sh
vim /etc/pacman.d/mirrorlist
```

### 開始安裝

```sh
pacstrap /mnt base base-devel \
intel-ucode \ # cpu
zsh tmux git openssh rsync sshfs neovim gvim \ # 這三行是一些常用工具
python python-pip python-neovim xclip \
htop exa ripgrep fd-rs \
nodejs npm yarn \ # 程式語言及相關工具
gnome gnome-tweak-tool \ # GNOME 桌面
noto-fonts noto-fonts-cjk adobe-source-code-pro-fonts \ # 字型
firefox # 瀏覽器
```

## 設定系統

### 產生 fstab

```sh
genfstab -U /mnt | sed -e 's/relatime/noatime/g' >> /mnt/etc/fstab
```

### chroot

```sh
arch-chroot /mnt
```

### 一些基本設定

後面這些設定重複性滿高的，可以直接參考[這篇](https://leomao.github.io/2017/09/archlinux-install-note/#設定系統)

```sh
# 語系
sed -i -e 's/^#\(en_US\|zh_TW\)\(\.UTF-8\)/\1\2/g' /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
# 時間
export TIMEZONE=Asia/Taipei # 台北時區
ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime
hwclock --systohc
systemctl enable systemd-timesyncd
# hostname 相關
export HOSTNAME=<hostname> # 給電腦取個名字
echo $HOSTNAME > /etc/hostname
sed -ie "8i 127.0.1.1\t$HOSTNAME.localdomain\t$HOSTNAME" /etc/hosts
# 一些需要開機做的事
systemctl enable fstrim.timer # 有 SSD 才需要
systemctl enable NetworkManager
systemctl enable gdm
sed -ie 's/#\(WaylandEnable\)/\1/' /etc/gdm/custom.conf # Wayland 還不太穩...
systemctl enable cups-browsed # 如果要用 printer
# boot loader
bootctl install
cat > /boot/loader/loader.conf << EOF
default	arch
timeout	3
editor	0
EOF
cat > /boot/loader/entries/arch.conf << EOF
title	Arch Linux
linux	/vmlinuz-linux
initrd	/intel-ucode.img
initrd	/initramfs-linux.img
options root=PARTUUID=<PARTUUID> rw
EOF
# assume root partition is /dev/nvme0n6
export PARTUUID=$(blkid -s PARTUUID -o value /dev/nvme0n6)
sed -ie "s/<PARTUUID>/${PARTUUID}/" /boot/loader/entries/arch.conf
# sudo
sed -ie 's/# \(%wheel ALL=(ALL) ALL\)/\1/' /etc/sudoers
```

### 新增使用者

```sh
export USERNAME=<username>
useradd -mG wheel,storage,power,video,audio $USERNAME
passwd $USERNAME # 設定密碼
```

### 退出 chroot、重新開機

```sh
exit
umount -R /mnt
reboot
```


## 開機！

開機之後就可以使用 8 成的功能了，但因為 Surface Pro 4 的硬體設備比較特殊，所以硬體支援需要特別處理


## 解決硬體支援問題

待解決的幾乎都是硬體設備的支援問題，需要更新核心（kernal）。

  1. 觸控螢幕
  1. 觸控筆

目前 Surface 可用的最新版本 Linux kernal 在[這個 GitHub Repo](https://github.com/jakeday/linux-surface/)  
然後這裡有 [pacaur 的打包](https://aur.archlinux.org/packages/linux-surface4/)

**注意**，安裝底下的套件會重新編譯核心，需要很～長的時間（我是 i5 版，大概花了 3 小時吧，），請確認電腦有接上電源，並且沒什麼事要急著處理：

```sh
gpg --recv-keys --keyserver hkp://keys.gnupg.net 38DBBDC86092693E # 匯入 Greg Kroah-Hartman 的金鑰 
pacaur -S linux-surface4
```

```sh
uname -r # 確認現在使用的核心版本

# 修改 boot loader
sudo -i # 以下需使用 root 權限
cp /boot/loader/entries/arch.conf /boot/loader/entries/surface.conf # 複製原本的 arch.conf 為 surface.conf
vim /boot/loader/entries/surface.conf # surface.conf 修改如下
```

```conf
title   Arch Linux
linux   /vmlinuz-linux-serface4 # 原來是 /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /initramfs-linuz-surface4.img # 原來應該是 /initramfs-linuz.img
option  root=PARTUUID=<UUID> rw # <UUID> 是你 / 分割區的 UUID
```

```sh
vim /boot/loader/loader.conf # 修改如下
```

```conf
default surface # 主要修改這行
timeout 3
editor  0
```
其他就是繼續依照 GitHub 的說明來安裝～


## 下載 firmware（ipts）

下載 `ipts_firmware_v78.zip`
解壓縮放到 `/lib/firmware/intel/ipts`

```sh
unzip ipts_firmware_v78.zip -d /lib/firmware/intel/ipts
```

## 待解決問題

  1. wifi 一段時間後有機率斷線（而且要重新開機才會恢復）
  1. 休眠後有機率無法喚醒
  1. Applications 選單 icon 拖曳時，GDM 會當掉
  1. 電力消耗速度比 Windows 快一些

好像跟這個 [issue](https://www.reddit.com/r/archlinux/comments/7iadeq/dragging_icon_from_dock_on_gnome_freezes_mouse/) 描述的狀況一樣。目前只能先小心，不要去拖曳到那些 icon。如果不幸當掉，只好到其他的 tty 下指令 `reboot`，或是 `pkill gdm`，讓桌面環境重開。

wifi 斷線的問題比較煩，因為這確實會影響到基本使用，期待這個 Bug 能盡快修復！


## 參考資料

[JOHN RAMSDEN: Arch Linux on The Surface Pro 4](https://ramsdenj.com/2016/08/29/arch-linux-on-the-surface-pro-4.html#setup-the-root-pool)
[youtube: Arch Linux on surface pro 4 - with multitouch, pen and sensitivity working](https://www.youtube.com/watch?v=Z0bIYOf3_rY)
[jakeday's Kernel for Surface Book/Pro 4](https://www.reddit.com/r/SurfaceLinux/comments/6tbnqx/jakedays_kernel_for_surface_bookpro_4/)
