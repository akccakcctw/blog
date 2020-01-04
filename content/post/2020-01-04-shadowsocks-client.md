---
title: "Shadowsocks client on archlinux"
date: 2020-01-04T16:16:22+08:00
categories:
tags:
  - command-line
  - Linux
  - shadowsocks
  - VPN
description: ""
lastmod: 2020-01-04T16:16:22+08:00
---

因為公司的 VPN 是用 Jigsaw 的 outline 來架，client 端設定滿簡易的，想說在我的筆電（archlinux）上也來設定一下，無奈都跑不起來，除了試過官網，還試了 `snap` 的版本，甚至到 [GitHub 專案](https://github.com/Jigsaw-Code/outline-client)上抓原始碼來 build。cordova web app build 是 build 起來了，但不曉得為什麼一連上網路就一直鬼打牆重新連接。electron 則是 build 完後看起來沒有錯誤訊息，但根本找不到它 build 出來的 app XDD

後來發現它的網址是 `ss://` 開頭，查了一下，發現背後用的其實就是鼎鼎大名的 shadowsocks，不用 outline 直接設定 proxy 連線總可以了吧，研究了一整個早上才終於連通了，遇到滿多坑的，下面是填坑筆記（埋


## 安裝 shadowsocks

```python
pip install shadowsocks
```

由於網路上查到的資料大多使用 `pip` 來安裝，因此我也跟風，各語言的實作應該用起來差不多？但我只有試過 `pip` 不敢亂說。安裝完會有兩個指令 `sslocal` 以及 `ssserver` 可以使用，看名字就知道一個是用戶端，一個是服務端。


## 設定 shadowsocks

```sh
vim /etc/shadowsocks/shadowsocks.json
```

主要的設定都放在這個 json 裡面，當然除了 /etc/shadowsocks 也可以放在其他路徑底下。

```json
{
  "server": "your_server",
  "server_port": "your_server_port",
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "password": "your_password",
  "timeout": 300,
  "method": "chacha20-ietf-poly1305",
  "fast_open": false
}
```

因為公司給我的設定方式是 outline 的格式：

```
ss://<一串大小寫英數字>=@<hostname>:<port>/?outline=1
```

這裡我卡住一陣子，不知道設定檔要怎麼設，後來把那串大小寫英數字拿去用 [base64 decode](https://blog.rex-tsou.com/2019/12/tips-base64-encode-decode/) 才得到 method 和 password。

這裡的 method 是加密方式，要根據 server 端來設定，這邊由於我是 `chacha20-ietf-poly1305` 有一個隱藏的坑，待會會提到。

設定完成後就可以啟動了，停止的指令也一併附上：

```sh
# 啟動
sslocal -c /etc/shadowsocks/shadowsocks.json -d start

# 停止
sslocal -d stop
```

如果你的加密方式和我一樣使用 `chacha20-ietf-poly1305`，可能會遇到 `method chacha20-ietf-poly1305 not supported` 的問題，我是安裝最新的 shadowsocks 解決的：

```sh
# 裝完後再試著啟動一次就沒問題了
pip install https://github.com/shadowsocks/shadowsocks/archive/master.zip
```


為了方便，可以設定自動啟動。

```sh
systemctl enable shadowsocks.service
systemctl start shadowsocks.service
systemctl status shadowsocks.service
```


## 安裝 privoxy

由於 shadowsocks 跑在 socket5 上面，需要使用 privoxy 把流量導向 http/https。

```sh
pacman -S privoxy
```


## 設定 privoxy

```sh
vim /etc/privoxy/config
```

以下兩行取消註解：

```sh
listen-address 127.0.0.1:8118 
forward-socks5t / 127.0.0.1:1080 . 
```

listen-address 的 8118 是預設的 port  
forward-socks5t 的 127.0.0.1:1080 則是要和上面 shadowsocks 設定的 local_address 一致，注意最後有一個點 `.`


## 啟動 Privoxy

這邊一樣設定自動啟動

```sh
systemctl enable privoxy
systemctl start privoxy
systemctl status privoxy
```


## 設定 http/https proxy

```sh
vim /etc/profile
```

```sh
export http_proxy=http://127.0.0.1:8118
export https_proxy=http://127.0.0.1:8118
```


## 驗證

```sh
# 測試使用的 ip 是否已經改為 shadowsocks server ip
curl ipinfo.io/ip

# 或者直接 curl google，如果回來一堆 HTML 就代表沒問題
curl www.google.com

# 或者看回傳的 header，如果是 http status 是 200 OK 代表沒問題
curl -I www.google.com
```

以上只有在 CLI 裡面有用，使用瀏覽器開網頁（https://myip.com.tw/）仍舊會顯示原始的 ip。

我用的是 GNOME，設定內有 proxy 可以調整，或者如果用 firefox 也可以在瀏覽器內調整 proxy 設定，如果找不到相關設定方式，或有許多 server 管理起來繁瑣，也可以考慮使用瀏覽器套件，目前 SwitchyOmega 是較多人使用的。



## SwitchyOmega

Chrome 安裝擴充套件「SwitchyOmega」，並設定 proxy 為剛剛設定的 ip，之後再到 https://myip.com.tw/ 看看是否上網的 ip 已經改為 shadowsocks server 的 ip 了。


## 參考資料

- [shadowsocks.org 官網](https://shadowsocks.org/en/index.html)
- [Centos7安装配置Shadowsocks客户端](https://dylanyang.top/post/2019/05/15/centos7%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AEshadowsocks%E5%AE%A2%E6%88%B7%E7%AB%AF/)
