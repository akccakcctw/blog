---
title: proxychains on mac m3
date: 2025-06-04T22:51:16.000+08:00
tags:
  - mac
  - command-line
---

公司四月開始取消 Hybrid 遠端工作，每天都要進公司，因此和我的 mac 有更多的相處時間，從外網連進公司需要經過一層 VPN，一般都是使用 Outline，但因爲它會把全部的網路請求都過這層 VPN，有時候其實比較慢，不太有效率，因此我不太喜歡使用。

我在 Linux 環境上習慣使用 `shadowsocks-rust` 配合 `ZeroOmega`(browser 環境) 或 `proxychains`(terminal 環境)，但在 mac 同樣設定完後，發現 `proxychains` 沒有作用，網路上也有不少[討論](https://gist.github.com/pich4ya/f4ae0b04f30653b2bcc2f2246bb564af)，好像和 SIP 保護機制有關，因爲編譯有點麻煩，且沒有很想關閉 SIP，想到了一個很簡單的方法，就是直接改 `http_proxy` 的值：

```sh
# 我 shadowsocks-rust 的 proxy 開在 http port 9050 上面
export http_proxy=http://127.0.0.1:9050 
```


如此一來不需要安裝任何程式，當前的 session 就可以有 proxy 效果了
