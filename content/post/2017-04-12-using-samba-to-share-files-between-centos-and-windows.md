---
title: "CentOS 設定 Samba server，與 Windows 共享檔案"
date: "2017-04-12T16:48:00"
categories:
  - Samba
  - CentOS
  - Windows
  - File System
---

以 CentOS 當作測試環境 server 時，如果習慣的開發環境是 Windows，會需要在 CentOS 內安裝 Samba，才能順利與 Windows 分享檔案。

先簡述一下我目前的開發環境：

- 正式環境（remote）：CentOS 7
- 測試環境（local）：CentOS 7（在 VirtualBox 裡面）
- 開發環境（local）：Windows 10

由於我的 CentOS 都沒有安裝圖形介面，所以在裡面只能使用 VIM，我對於 VIM 的掌握程度沒有很高，所以直接在測試環境用 VIM 開發的效率會比較慢，我選擇在 Windows 的圖形介面裡，使用 VSCode 開發（當然 VIM 還是要練啦 XD）。

1. 在 cmd 查詢工作群組（工作站網域）
通常會是 WORKGROUP 或是 HOMEGROUP
```cmd
net config workstation
```

2. 編輯 hosts（C:/Windows/System32/drivers/hosts）
IP 設定為 server 的 IP，host 名稱就是 Windows 用來識別的共享名稱
左邊設定 IP、右邊是對應的名稱：
```
192.168.43.220  cent-os 
```
設定後可以`ping`看看 cent-os，測試目標 ip 是否為 192.168.43.220

3. 安裝samba及相關套件
```bash
yum install samba samba-client samba-common -y
```

4. 修改samba設定檔
```bash
vim /etc/samba/smb.conf
```

原來的設定可以都註解掉，改為以下：
```smb.conf
[global]
    workgroup = WORKGROUP # 步驟 1. 取得的工作群組名稱
    server string = Samba Server Version %v
    netbios name = cent-os # 步驟 2. 設定的名稱
    map to guest = bad user # 因為 Windows 無法匿名登入，需對應至 guest
    dns proxy = no
    dos charset = cp950 # 因為是要分享給 Windows 的中文環境
    load printers = no

[Share] # Winodws會看到資料夾名稱
    path = /srv/www/sitename # 你的網站根目錄
    valid users = @smbgrp
    guest ok = no # 不須認證
    browsable = yes # 瀏覽權限
    writable = yes # 寫入權限
    read only = no # 關閉唯獨
```

5. 設定可存取 samba server 的使用者帳號與密碼
```sh
smbpasswd -a akccakcctw
```

6. 啟動 samba server，並設定開機後自動啟動
```sh
systemctl enable smb
systemctl enable nmb
systemctl restart smb
systemctl restart nmb
```

7. 從檔案總管開啟
打開檔案總管，在「網路」內，應該就可以看到`CENT-OS`了（Windows 似乎會自動轉為大寫），也可以按 Ctrl + R，輸入`\\cent-os`，快速開啟分享資料夾。


## 如果出現權限問題，可嘗試關閉 SElinux
在本機開發基本上不會有安全性問題，因此可以直接把 SElinux 關閉
```sh
getenforce # 取得 SElinux 狀態
setenforce disabled #（enforcing, permissive, disabled）
reboot # 重新開機
```

## 參考資料
- [使用 Samba 架設中小企業 File Server 以開放原始碼打造資源分享環境](http://www.netadmin.com.tw/article_content.aspx?sn=0807240005)
- [CentOS 7.0 Samba 4 建置](http://wendell3927.pixnet.net/blog/post/202113199-%5Blinux%5D-centos-7.0-samba-4-%E5%BB%BA%E7%BD%AE)
- [在 CentOS7/RHEL7 上架設 Samba Server](http://linux.onlinedoc.tw/2016/03/centos7rhel7-samba-server.html)
