---
title: "一鍵看光網頁排版"
date: "2016-03-09T10:48:00"
comments: true
categories:
  - CSS
---

在設計網頁時，我經常會在網路上參考各種排版，吸取大神們的經驗與靈感。

一開始我習慣直接用眼睛感受，觀察各元素的大小、距離……

當能力進階之後，我學會使用瀏覽器的「檢查元素」，很方便，移到元素上就可以看見範圍。而且，連元素參數（`width`、`height`、`position`、……）等等詳細設定，都可以一覽無遺。
![devtool.png](http://user-image.logdown.io/user/14750/blog/13947/post/610450/8uI9RC0LR0eemoFNnnIb_devtool.png)

要了解一個網頁的排版方式，這樣就很夠了，但有些時候我很單純想了解他怎麼規劃版面，不需要看到那麼多參數設定，有沒有更快的辦法？

當然，辦法是有的，只要配合 Javascript 就可以快速達成！

## 讓 outline 現出原形！

打開瀏覽器的開發者工具，以我習慣的 Chrome 為例，按下右鍵 → 檢查元素，或者直接按快捷鍵 F12 打開。
（其實之前亂玩發現快捷鍵超多的，舉凡 Ctrl-Shift-i、Ctrl-Shift-j、Ctrl-Shift-c，都可以快速開啟開發者工具的不同功能）

進入開發者工具之後，找到 console 這個 tab，按下去（也可以 Ctrl-Shift-j 直接開啟 console），
開啟後應該會看到類似這樣的畫面，藍色箭頭那邊是指令列，可以用文字方式輸入指令：
![console.png](http://user-image.logdown.io/user/14750/blog/13947/post/610450/VeqLD5vNSj2CBntVPPev_console.png)
（因為我有裝套件修改，所以變成灰底，不影響功能）

只要貼入以下的 Javascript code，按下 Enter 送出，
```js
var el = document.getElementById("show-outline");
if (el) { 
    el.parentNode.removeChild(el); 
  } else {
  document.body.insertAdjacentHTML(
  'beforeEnd', 
  '<style id="show-outline">*{outline:1px rgba(255,0,255,0.5) solid !important;}</style>');
}
```
你就會發現...
![layout.png](http://user-image.logdown.io/user/14750/blog/13947/post/610450/gxKlrBtSjiC44oyM35sm_layout.png)

排版瞬間被我們看光光啦，哈哈哈！

如果想要更快、更方便，我們可以把這段 code 存成書籤，以後想了解別人怎麼排版，只要按下書籤按鈕就可以了～～
書籤名稱隨便取，比方說：「<s>**神之透視**</s>」
書籤網址打上：
```js
javascript:var el=document.getElementById("show-outline");if(el){el.parentNode.removeChild(el);}else{document.body.insertAdjacentHTML('beforeEnd','<style id="show-outline">*{outline:1px rgba(255,0,255,0.5) solid !important;}</style>');}
```
