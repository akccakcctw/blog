---
title: "增加 SSH 登入安全性"
date: 2019-03-10T22:51:10+08:00
categories:
tags:
  - command-line
  - Linux
  - server
  - ssh
description: ""
lastmod: 2019-03-10T22:51:10+08:00
---

因為之前太懶，server 開好後就沒有特別去調 ssh 的設定，所以預設是走帳號密碼登入。今天突然感覺對了（什麼感覺），想來設定一下 server 的 ssh 登入，順便降低被暴力亂試的風險。

設定方式其實滿簡單的，很多地方都有介紹，但因為我記性實在太差，還是簡單記錄一下步驟好了：

1. 用 `ssh-keygen` 產生公私鑰。 

    ```sh
    ssh-keygen -t rsa -b 4096 -C "username@email.com"
    ```

2. 把公鑰內容貼到 server 上對應帳號的 ~/.ssh/authorized_keys 這個檔案裡面（可以用 `scp`）
3. 調整一下 /etc/ssh/sshd_config ，確定 `PubkeyAuthentication yes` 以及 `AuthorizedKeysFile .ssh/authorized_keys` 這兩個設定
4. 調整檔案權限：

    ```sh
    chmod 600 ~/.ssh/authorized_keys
    chmod 700 ~/.ssh
    ```

5. 重啟 server 的 sshd 服務

    ```sh
    sudo systemctl restart sshd # 或 sudo service sshd restart
    ```

6. 登入時指定 private key 登入 `ssh -i path/to/key_file username@remote_host` 或設定 .ssh/config 檔案：

    ```
    Host myServer # 取個自己好記的名稱
    Hostname [server_ip] # server 的 ip 位置或網域
    Port 22
    User username # 你的帳號
    PreferredAuthentications publickey,password
    Identityfile ~/.ssh/myserver # 私鑰位置

    # 以後登入就只要打以下指令：
    # ssh myServer
    ```

此外，在修改 /etc/ssh/sshd_config 時，可以注意幾個提昇安全性的設定：

1. 禁止使用 root 登入：`PermitRootLogin no`
2. 禁止空白密碼：`PermitEmptyPasswords no`
3. 禁止使用密碼登入：`PasswordAuthentication no`

不要小看這些安全性設定，其實 server 放在那邊真的有很多人會來敲門，以我自己的 server 為例：

```sh
sudo rg 'Failed password' /var/log/secure-20190304 -c # secure log 檔每個禮拜會存成一份
17195
```

才一個禮拜就被試了 17195 次，所以還是建議需要的服務再開就好～


## 備註

寫這篇的時候看到 [ssh 還可以配合 2FA（兩階段驗證）](https://www.vultr.com/docs/how-to-setup-two-factor-authentication-for-ssh-on-ubuntu-14-04-using-google-authenticator)，感覺挺不錯的，有時間再來研究。


## 參考資料

- [Securing SSH on Ubuntu 14.04](https://www.vultr.com/docs/securing-ssh-on-ubuntu-14-04)

