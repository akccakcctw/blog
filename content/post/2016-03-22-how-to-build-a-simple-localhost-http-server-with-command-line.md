---
title: "利用 http-server 快速搭建一個 localhost 伺服器"
date: "2016-03-22T14:20:00"
categories: ["http-server", "nodejs", "npm", "localhost"]
---

搭建一個網站時，我們經常需要立即測試，方便修正與微調。但有些頁面因為安全性或是其他問題，必須要放上伺服器才能看到效果（比如 ajax，如果不是放在伺服器端，就會出現 XMLHttpRequest cannot load 的問題），屈就於此，在測試階段需要多一個部屬至伺服器的步驟，也造成我們的修正作業變得困難重重。

如果一個問題很多人遇到，捲起袖子之前，在這個凡事開源的時代，我們可以先找找網路上是否有解決方案。遇到此問題，我們可以利用 [http-server](https://github.com/indexzero/http-server) 這個小工具，快速搭建一個local 端的伺服器，加快我們的工作效率。

下面我以npm為例，如果電腦裡沒有 npm，可以到 [nodejs官網](https://nodejs.org/en/) 下載最新版的 node.js，裡面就有免費附贈 npm 了！

## 經由 npm 安裝 http-server

在 terminal 經由 npm 安裝 "http-server" 套件，npm 安裝套件的方式非常簡單，直接鍵入：
```bash
$ npm install http-server -g
```
`-g` 是 global 的意思，代表全域安裝。如果需要使用套件的指令，就要選擇全域安裝。

輸入之後稍微等幾秒鐘下載，應該就會跑出一串文字，告訴我們所安裝套件的版本訊息。

## 馬上來使用吧！

在我們的專案資料夾開啟 terminal（這邊我是用 bash 示範，如果是 windows 環境，用 cmd 也可以）：
```bash
$ http-server -p 8000
```
`-p`是用來調整 port 的參數，不調整的話，預設會是 8080。因為我的 8080 port已經被佔用了，所以我開啟 8000。按下 enter 之後，bash 會告訴我們：
![bash.png](http://user-image.logdown.io/user/14750/blog/13947/post/668697/h9l9p1tATzGuBIKSo8Ye_bash.png)
然後就開好了，你沒看錯，就開好了！
在瀏覽器網址列打上`localhost:8000`或是`127.0.0.1:8000`，就可以看見自己的網頁了。

## 進階，設定快取時間

```bash
# 不快取(時間為-1)，若正在開發，建議不要快取
$ http-server -c-1

# 快取10秒
$ http-server -c10
```

## 參考資料
- [NPM: http-server](https://www.npmjs.com/package/http-server)
- [Github: http-server](https://github.com/indexzero/http-server)
