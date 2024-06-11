---
title: "Chrome Devtools 事件偵測的幾個技巧"
date: "2016-07-26T14:56:00"
categories:
  - Devtools
  - JavaScript
  - Chrome
---
不得不說，Chrome 開發者工具愈來越好用了，除了一般常用的 HTML、CSS 編輯功能之外，最近也常利用 sources tab，直接在瀏覽器開啟 js 檔抓 bug 測試。不過因為功能多又更新快速，平常也是用編輯器為主，瀏覽器的開發者工具對我來說還是非常神秘啊～

（覺得神祕的不只我一個，[甚至有人為此作了一個網站](https://umaar.com/dev-tips/)，上面分享的小技巧已經超過 100 個了 XD）

這篇主要是筆記一下今天學到的事件偵測新技巧，順便整理之前用過的幾種方法：

## 1. Source Code Breakpoints
經由 sources tab 開啟檔案，可以直接在左側的行數上用滑鼠點擊，設置中斷點，效果等同於使用 `debugger` 關鍵字。除此之外，還可以右鍵點擊行數，新增中斷的條件，若是中斷點帶有條件，顏色會由藍色變成黃色。
![01.png](http://user-image.logdown.io/user/14750/blog/13947/post/774974/y6LepBaIQqyIO01Ju83i_01.png)
![02.png](http://user-image.logdown.io/user/14750/blog/13947/post/774974/xq0fChHDT6iVUwSfOZgB_02.png)

## 2. Event Listener Breakpoints
除了程式內的中斷點，還可以設置當某類事件發生時中斷，如下圖，勾選 keyboard 之後，一旦偵測到 keydown、keyup、keypress、input 四種事件，頁面就會進入 debugger 狀態，方便進行除錯。
![04.png](http://user-image.logdown.io/user/14750/blog/13947/post/774974/nP0vFQCMT2qUJZTyI2YZ_04.png)

## 3. 查看元素綁定的事件
有時候，我們會希望知道頁面裡某元素綁定的事件，只要在 elements tab 選取此元素，然後在下方（或右方）找到 event listener 標籤，就可以知道與這個元素相關的事件了，如下圖，我們可以瞭解到此元素被 click 之後會發生一些事，它的程式碼寫在 index 第 588 行（點下去會開啟 sources tab 方便檢視）

![05.png](http://user-image.logdown.io/user/14750/blog/13947/post/774974/DmoYmw3WRDuXEDjzYzZR_05.png)

## 4. `monitorEvents(object[, events]);`
這是今天學到的大決！似乎還只有 Chrome 可以用，只要在 console 使用 monitorEvents 這個指令，瀏覽器就會開啟監控模式，例如輸入`monitorEvents(document.body, 'mouse');`然後當你滑鼠移到 body 上面時，就會發現瀏覽器不斷 log 出 `mousemove` 的訊息，此時也會一併偵測`click`、`dbclick`等等滑鼠事件，其餘還可使用 `key`、`touch`、`control` 等等參數，詳情可參考 [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/debug/command-line/command-line-reference?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3#monitoreventsobject-events) 有專門介紹。


## 參考資料：
- [Google Developers: Add Breakpoints](https://developers.google.com/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)
- [Chrome Developer Tools monitorevents](http://www.briangrinstead.com/blog/chrome-developer-tools-monitorevents)
- [How do I view events fired on an element in Chrome DevTools?](http://stackoverflow.com/questions/10213703/how-do-i-view-events-fired-on-an-element-in-chrome-web-developer)
