---
title: "利用 SSH Tunnel 做跳板（aka. 翻牆）"
date: 2017-10-11T00:29:24+08:00
categories:
  - command-line
  - Linux
  - server
tags:
  - SSH
  - server
  - tunnel
description: ""
---

`SSH`參數說明：

- `-N` : 不執行任何指令  
- `-f` : 在背景執行  
- `-L` : 將 local port 轉向  
- `-R` : 將 remote port 轉向  
- `-D` : socks proxy  

## 建立 SSH tunnel（正向）
```sh
# syntax: ssh -L local_port:remote_address:remote_port username@server.com

# 經過 ssh://localhost:2323 的連線，會藉由 serverB 作為跳板，再連到 ptt.cc:22
[user@serverA]$ ssh -NfL 2323:ptt.cc:22 user@serverB

# 連線
[user@serverA]$ ssh bbsu@localhost -p 2323
```


## 建立 SSH tunnel（反向）
**注意**，開啟反向 tunnel 之後，等於區網開了一個洞，外面的人可以連進來，可能會造成安全風險，請謹慎使用。  
若配合`rdesktop` 之類的程式使用，甚至可以在桌面環境遠端遙控。
```sh
# syntax: ssh -R remote_port:local_address:local_port username@server.com

# 經過 serverB:8888 的連線，都會 tunnel 到 serverA:1234
[user@serverA]$ ssh -NfR 8888:localhost:1234 user@serverB

# 連線
[user@serverB]$ ssh user@localhost -p 8888

# 遠端桌面
[user@serverB]$ rdesktop localhost:8888
```


## 建立 SOCKS proxy server
```sh
# syntax: ssh -D port user@host

[user@serverA]$ ssh -NfD 2323 user@serverB

# 讓 chrome 透過 proxy 連線
# 將以下設定加入啟動 chrome 的「目標」（右鍵 ➡️ 內容）後面
--proxy-server="socks5://localhost:2323"

# 啟動以後，瀏覽所有網頁都會透過這台 proxy server
```


## 參考資料
- [上班族 ssh tunnel 求生手冊](https://www.ubuntu-tw.org/modules/newbb/viewtopic.php?topic_id=17538)
- [ssh tunnel](http://pre.tir.tw/008/blog/output/ssh-tunnel.html)
- [Reverse SSH Tunnel實際運用，搭配 auotssh 永不斷線，putty 建立反向 tunnel](https://ez3c.tw/2043)
- [serverfault: Can I create SSH to tunnel HTTP through server like it was proxy?](https://serverfault.com/questions/78351/can-i-create-ssh-to-tunnel-http-through-server-like-it-was-proxy)
- [Configuring a SOCKS proxy server in Chrome](https://www.chromium.org/developers/design-documents/network-stack/socks-proxy)
- [Linux 透過 SSH SOCKS 連線來使用 Firefox / Pidgin(MSN, GTalk..)](https://blog.longwin.com.tw/2010/01/linux-ssh-socks-firefox-pidgin-2010/)
- [使用 OpenShift 的 SSH 來架設跳板](https://coldnew.github.io/59b43040/)
- [调试利器-SSH隧道](https://github.com/gwuhaolin/blog/issues/11)
