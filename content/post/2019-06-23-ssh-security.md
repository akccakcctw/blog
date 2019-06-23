---
title: "增加 SSH 登入安全性（二）"
date: 2019-06-23T11:50:08+08:00
categories:
tags:
  - command-line
  - Linux
  - server
  - ssh
description: ""
lastmod: 2019-06-23T11:50:08+08:00
---

延續[上篇]({{< ref "/post/2019-03-10-ssh-failed-password" >}})，除了調整 sshd_config 設定以提高安全性外，還有個常用的工具 [fail2ban](https://www.fail2ban.org)。

本文介紹的 fail2ban 是 v0.9.7，請注意不同版本的設定方式可能會稍有不同。

fail2ban 會分析你的 log 檔，藉由登入失敗記錄來防止暴力破解。


## 安裝

我的 server 是 CentOS 7，因此使用 `yum` 安裝：

```sh
# 安裝前先看一下相關訊息
yum info fail2ban

yum install fail2ban
```


## 設定

裝好後，可依需求調整相關設定檔：

### fail2ban.(conf|local)

位置在 `/etc/fail2ban/fail2ban.conf`，檔案內的註解寫得很詳細，大部分情況不需要修改，需要修改時新增一支 fail2ban.local，會 override 預設的設定，就不多說明了。

### jail.(conf|local)

位置在 `/etc/fail2ban/jail.conf`，fail2ban 會依據這支檔案的設定來決定如何封鎖，和 fail2ban.conf 類似，要修改時新增一支 jail.local 來 override 預設值。

我的設定如下（新增一支 jail.local）：

```sh
# /etc/fail2ban/jail.local
[sshd]
enabled  = true
port     = ssh
filter   = sshd
action   = iptables[name=SSH, port=ssh, protocol=tcp]
# logpath  = /var/log/secure
backend  = systemd
maxretry = 5
findtime = 600 ; 10 minutes
bantime  = 1200 ; 20 minutes
```

注意註解起來的 logpath 那一行，因為我的 server 使用 systemd，因此我設定使用 `backend = systemd`，原因可以參考[這裡](https://bbs.archlinux.org/viewtopic.php?id=190394)。

其餘各項設定代表的意思：

  - ignoreip：白名單
  - action：要執行的動作
  - filter：使用的 filter（在 /etc/fail2ban/filter.d/ 底下）
  - maxretry：在 findtime 內最多可以嘗試的次數
  - findtime：多少時間內檢查 retry 次數（秒）
  - bantime：封鎖時間（秒）


### filter.d/

定義過濾條件，此目錄下已有多種內建的過濾條件，例如 apache、sshd、postfix 等等。

### action.d/

定義動作內容，例如 sendmail（寄信通知）、iptables（阻擋來源 ip）等等。


## 啟動

```sh
# 啟動服務
systemctl start fail2ban.service # 或 service fail2ban start

# 重新啟動服務（如果有修改設定）
systemctl restart fail2ban.service

# 設定開機啟動
systemctl enable fail2ban.service # 或 chkconfig fail2ban on
```


## 測試

啟動後，使用 `fail2ban-client ping`，會看到回應 `pong`，代表 fail2ban 有正常運作。

再來，使用 `fail2ban-client status` 應該會看到類似這樣的訊息：

```sh
╭─akccakcctw@rex-tsou ~
╰─$ sudo fail2ban-client status
Status
|- Number of jail:      1
`- Jail list:   sshd
```

代表 sshd 這個服務已經受到 fail2ban 的保護。進一步看 sshd 的狀態，則使用指令 `fail2ban-client status sshd`，會有更詳細的訊息。

而 fail2ban 的 log 預設會記錄在 /var/log/fail2ban.log 這個路徑，可以從這個檔案看到目前 fail2ban 檢測到哪些可疑 ip。

如果想測試是否真的會被 ban，可以用 `tail -f /var/log/fail2ban.log`，或是 `journalctl -f -u sshd` 觀察 log 變化，再用另外一台電腦嘗試用錯誤密碼登入。


## 查看／解禁被封鎖的 IP

### 查看

由於我們上面使用 iptables 封鎖，因此我們可以直接列出 iptables 資訊來查看被封鎖的 IP：

```sh
sudo iptables --list -n
```

```sh
# 假設是 192.168.1.2 被 ban
Chain f2b-SSH (1 references)
target     prot opt source               destination
REJECT     all  --  192.168.1.2          0.0.0.0/0            reject-with icmp-port-unreachable
RETURN     all  --  0.0.0.0/0            0.0.0.0/0
```

也可以使用 fail2ban-client 來查看被封鎖的 IP 位置：

```sh
sudo fail2ban-client status sshd
```

```sh
╭─akccakcctw@rex-tsou ~
╰─$ sudo fail2ban-client status sshd
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     5
|  `- Journal matches:  _SYSTEMD_UNIT=sshd.service + _COMM=sshd
`- Actions
   |- Currently banned: 1
   |- Total banned:     2
   `- Banned IP list:   192.168.1.2
```


### 解鎖

想要解鎖某個 IP 的話，可以使用 iptables 指令，也可以使用 fail2ban-client：

```sh
# iptables
sudo iptables -D f2b-SSH -s 192.168.1.2 -j REJECT

# fail2ban-client
sudo fail2ban-client set sshd unbanip 192.168.1.2
```

## fail2ban 相關指令

```sh
# 查看 fail2ban 狀態
fail2ban-client status

# 查看特定服務狀態
fail2ban-client status sshd

# 以 filter 規則測試既有 log 檔
# syntax: fail2ban-regex [log file] [filter_rule file]
fail2ban-regex /var/log/secure /etc/fail2ban/filter.d/sshd.conf
```


## 參考資料

- [fail2ban： 新手老手 root 網管都要練的金鐘罩](https://newtoypia.blogspot.com/2016/04/fail2ban.html)
- [清大網路系統組 Fail2ban 教學](https://net.nthu.edu.tw/2009/security:fail2ban)
- [用 Fail2Ban 防範暴力破解（SSH、vsftp、dovecot、sendmail）](http://www.vixual.net/blog/archives/252)
- [How to protect SSH server from brute force attacks using fail2ban](http://xmodulo.com/how-to-protect-ssh-server-from-brute-force-attacks-using-fail2ban.html)

