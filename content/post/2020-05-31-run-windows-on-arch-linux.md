---
title: "用接近原生的效能跑 Windows 10 虛擬機"
date: 2020-05-31T23:54:42+08:00
draft: false 
categories:
tags:
description: ""
lastmod: 2020-05-31T23:54:42+08:00
---

## 前言

這篇其實是延續上一篇，成功在 mac 上利用 `wimlib` 分割檔案的方式製作好 Win10 安裝碟之後，我試著在乾淨的機器裡嘗試安裝，到了安裝階段卻不斷出現安裝失敗的提示，於是我只好暫時放棄 Windows，轉而先灌 Arch Linux[^1]。

想要在同一顆硬碟上裝雙系統通常都會先灌 Windows 再灌 Linux，因為 Windows 會把啟動磁區覆蓋掉。而我既然已先灌好 Arch Linux ，雙系統這條路可以說是走不通了，為了不想繼續和 Windows ISO 糾纏太久（但又很想玩遊戲），只好開始研究其他解決方案。

解決方案是有的——把 Windows 裝在虛擬機內就好了啊！

只是一般的虛擬機如果想要拿來打遊戲，效能絕對不敷使用，我們需要使用 QEMU + KVM [^2]。

如果有時間的話，推薦直接去看[這篇 ArchWiki](https://wiki.archlinux.org/index.php/PCI_passthrough_via_OVMF)，那邊的資訊非常詳盡，這篇只記錄重點步驟。


## 安裝前準備／確認系統需求

*參考 [ArchWiki: KVM (Checking support for KVM)](https://wiki.archlinux.org/index.php/KVM#Checking_support_for_KVM)*


實際動手之前，我們必須確認硬體支援，我們需要：

- 至少兩個 GPU（例如一個內顯、一個獨顯）[^3]
- CPU 支援虛擬化技術及 IOMMU（確認方式下面詳述）
- 主機板支援 IOMMU
  + 不確定的話請參考[這個 wiki](https://en.wikipedia.org/wiki/List_of_IOMMU-supporting_hardware)
- 要給虛擬機使用的 GPU ROM 支援 UEFI
  + [這個網站](https://www.techpowerup.com/vgabios/)可以查，基本上 2012 年之後的 GPU 應該都有支援


### 確認 CPU 有支援虛擬化技術

KVM 需要有支援此功能才能正常運作，Intel 會叫做 VT-x，AMD 則會叫做 AMD-V，你可以用以下指令確認：

```sh
LC_ALL=C lscpu | grep Virtualization
# or
grep -E --color=auto 'vmx|svm|0xc0f' /proc/cpuinfo
```

如果上述指令沒有 return 任何結果，代表你的硬體不支援虛擬化技術，你可以洗洗睡了[^4]。

### 確認 Kernel 支援

如果你是使用最新的 Arch Linux kernel，那麼應該有支援，或者你也可以輸入以下指令：

```sh
zgrep CONFIG_KVM /proc/config.gz
```

確認 kvm 以及 kvm_amd/kvm_intel 之一有出現在列表中，並且值為 `y` 或 `m`。

並且確認該 kernel 模組有自動載入：

```sh
lsmod | grep kvm
```

如果上述指令沒有 return 任何結果，你必須手動載入[^5]：

```sh
modprobe kvm
```


## 安裝／設定必要套件

```sh
# qemu
sudo pacman -S qemu

# 管理 vm 的圖形介面
sudo pacman -S libvirt virt-manager

# 連接網路需要的套件
sudo pacman -S ebtables dnsmasq bridge-utils openbsd-netcat

# UEFI support
sudo pacman -S edk2-ovmf
```

### 權限設定

由於要使用 `virt-manager` 的圖形介面調整 `libvirt` 的設定，需要把自己加入 `libvirt` 的 group 內，以免發生權限問題

```sh
# 編輯設定檔
sudo vim /etc/polkit-1/rules.d/50-libvirt.rules
```

加入以下內容

```
/* Allow users in kvm group to manage the libvirt
daemon without authentication */
polkit.addRule(function(action, subject) {
  if (action.id == "org.libvirt.unix.manage" &&
    subject.isInGroup("kvm")) {
      return polkit.Result.YES;
  }
});
```

並且也把自己加入 `kvm` group：

```sh
sudo usermod -a -G kvm $(whoami)
```

### 啟動服務

```sh
sudo systemctl enable libvirtd.service # optional, 每次開機自動啟動
sudo systemctl start libvirtd.service
sudo systemctl start virtlogd.service
```


## 建立虛擬機

我們使用 `virt-manager` 的圖形介面來建立虛擬機，圖形介面很直覺，不多贅述，依照自己需求修改即可，需要特別注意如下：

- 在建立前的最後一步，勾選「Customize before install」
- 在「Overview」選項內，將「Firmware」選項選為「UEFI x86_64」

因為建立之後就沒有辦法修改 firmware 了，所以一定要在這時修改。

完成各項設定後，虛擬機就開好了，接着來安裝作業系統！


## 安裝作業系統

[Win10 ISO 官方下載點](https://www.microsoft.com/zh-tw/software-download/windows10ISO)

把 ISO 檔掛載到虛擬機就可以安裝了，非常簡單，安裝時有一個畫面是需要填序號，可以先不填，一樣可以安裝成功。

安裝成功之後應該可以正常使用 Windows，但這時候效能還很慘，我們必須把 GPU 直通給虛擬機使用。


## GPU passthrough

```sh
# 複製原本的 boot loader，畢竟不是每次都想 passthrough，也避免改錯有個保險
sudo cp /boot/loader/entries/arch.conf /boot/loader/entries/arch-kvm.conf

sudo vim /boot/loader/entries/arch-kvm.conf
```

這時根據 CPU 不同，
1. AMD 的 CPU（AMD-Vi），加上 `options amd_iommu=on`
2. Intel 的 CPU（VT-d），加上 `options intel_iommu=on`
因此 loader 設定會變成這樣（以 intel 爲例）：

```sh
title   Arch Linux
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /linux-kvm.img
options root=PARTUUID=<UUID> rw
options intel_iommu=on
```

重新開機，然後確認 `dmesg` 訊息：

```sh
dmesg | grep -i -e DMAR -e IOMMU
```

### 確認 IOMMU Groups

以下指令可以列出 IOMMU Groups

```sh
#!/bin/bash
shopt -s nullglob
for g in /sys/kernel/iommu_groups/*; do
  echo "IOMMU Group ${g##*/}:"
  for d in $g/devices/*; do
    echo -e "\t$(lspci -nns ${d##*/})"
  done;
done;
```

輸出應該會類似：

```sh
IOMMU Group 1:
	00:01.0 PCI bridge: Intel Corporation Xeon E3-1200 v2/3rd Gen Core processor PCI Express Root Port [8086:0151] (rev 09)
IOMMU Group 2:
	00:14.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB xHCI Host Controller [8086:0e31] (rev 04)
IOMMU Group 4:
	00:1a.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB Enhanced Host Controller #2 [8086:0e2d] (rev 04)
IOMMU Group 10:
	00:1d.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB Enhanced Host Controller #1 [8086:0e26] (rev 04)
IOMMU Group 13:
	06:00.0 VGA compatible controller: NVIDIA Corporation GM204 [GeForce GTX 970] [10de:13c2] (rev a1)
	06:00.1 Audio device: NVIDIA Corporation GM204 High Definition Audio Controller [10de:0fbb] (rev a1)
```

一個 IOMMU Group 是可以直通給虛擬機的最小單位，在此範例中，顯卡位於 `IOMMU Group 13`，和音效卡同一個 group，必須一起直通給虛擬機使用。

請記下 `10de:13c2` 及 `10de:0fbb`，這是它們的 device ID，待會會用到。


### Isolating the GPU

使用 `vfio-pci` 綁定指定裝置

一樣編輯 `/boot/loader/entries/arch-kvm.conf`，新增一行 options，加上 `vfio-pci.ids=[你的 device id]`，範例：

```sh
options vfio-pci.ids=10de:13c2,10de:0fbb
```


### 盡早載入 vfio-pci

```sh
# 複製一份專用設定
cp /etc/mkinitcpio.conf /etc/mkinitcpio-kvm.conf

# 編輯
sudo vim /etc/mkinitcpio-kvm.conf
```

找到 MODULES 及 HOOKS 區塊，加上以下模組：

```sh
MODULES=(... vfio_pci vfio vfio_iommu_type1 vfio_virqfd ...)

...

HOOKS=(... modconf ...)
```

然後產生一份新的 `initramfs`：

```sh
# linux-kvm.img 這個名稱可以自己決定
mkinitcpio -c /etc/mkinitcpio-kvm.conf -g /boot/linux-kvm.img
```

產生完成後再調整一下 boot loader 設定：`sudo vim /boot/loader/entries/arch-kvm.conf`

```sh
title   Arch Linux
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /linux-kvm.img
options root=PARTUUID=<UUID> rw
options intel_iommu=on
options vfio-pci.ids=10de:13c2,10de:0fbb
```
重新開機，確認 `vfio-pci` 的設定生效：

```sh
dmesg | grep -i vfio
```


## 調整顯示卡設定

開啓 `virt-manager` 設定，按右鍵依序選擇「Add Hardware > PCI Host Device」，在列表中找到剛剛設定好直通的設備新增，然後開機。

如果上面的設定都沒問題，系統應該可以偵測到我們直通進去的那張顯卡，可能會需要上網抓最新的驅動程式。

在 Windows 裝置管理員檢查顯示卡，按「右鍵 > 內容」，如果裝置狀態爲「這個裝置正常運作中」，那就沒問題了！


## 疑難排解

### 重新啟動之後網路無法連線[^6]

```sh
# 注意，你可能會需要加 `sudo` 才看得到列表
virsh net-list --all

# 假設你是用 default
virsh net-autostart default
virsh net-start default
```

### 有抓到顯卡，但是看起來沒什麼作用

因爲顯卡必須偵測到有螢幕接上才能正常使用，你有 2 個選擇：

1. 如果你有 2 臺以上的螢幕，你可以直接將螢幕接到顯卡上，然後在「系統 > 顯示器 > 多部顯示器」設定內，調整爲「只在 2 顯示」。

2. 或者你像我一樣，只有 1 臺螢幕。就需要在「系統 > 顯示器 > 圖形設定」自行選擇要使用該顯卡來輸出的應用程式[^7]。


## 參考資料

- [ArchWiki: KVM](https://wiki.archlinux.org/index.php/KVM)
- [ArchWiki: libvirt](https://wiki.archlinux.org/index.php/Libvirt)
- [ArchWiki: PCI passthrouth via OVMF](https://wiki.archlinux.org/index.php/PCI_passthrough_via_OVMF)
- [Archlinux 下使用 KVM 代替 Vmware](https://clixiang.github.io/2018/07/19/linux/using-kvm/)
- [[Linux KVM] 半虛擬化驅動(Paravirtualization Driver)](https://godleon.github.io/blog/KVM/KVM-Paravirtualization-Drivers/)
- [reddit: Help turning on iommu (Arch Linux)](https://www.reddit.com/r/VFIO/comments/68r1cc/help_turning_on_iommu_arch_linux/)
- [reddit: GPU Passthrough - Or How To Play Any Game At Near Native Performance In A Virtual Machine](https://www.reddit.com/r/pcmasterrace/comments/2z0evz/gpu_passthrough_or_how_to_play_any_game_at_near/)
- [GitHub: GPU Passthrough from Arch Linux](https://github.com/vanities/GPU-Passthrough-Arch-Linux-to-Windows10)
- [Intel GVT-g](https://wiki.archlinux.org/index.php/Intel_GVT-g)


[^1]: 注意 archlinux 2020.05 的 ISO 檔有問題，我改下載 2020.04 的才能正常安裝。
[^2]: 感謝[這篇 PTT 文](https://www.ptt.cc/bbs/LoL/M.1565890497.A.4CF.html)指引我一條明路，我安裝 Windows 只是為了打遊戲，也是我找到這篇的原因。
[^3]: 其實只有一個 GPU 也行，不過不在本文討論範圍內，可參考 <https://github.com/joeknock90/Single-GPU-Passthrough>
[^4]: 別妄想用 VirtualBox 之類的一般虛擬機來玩遊戲，跑不動的。
[^5]: [ArchWiki: Manual module handling](https://wiki.archlinux.org/index.php/Kernel_module#Manual_module_handling)
[^6]: https://www.reddit.com/r/VFIO/comments/6iwth1/network_default_is_not_active_after_every/djayhqu/
[^7]: 測試過只有設定的應用程式才會使用該顯卡運算，否則就算 CPU 跑到 100%，顯卡還是穩穩的維持在 0%。
