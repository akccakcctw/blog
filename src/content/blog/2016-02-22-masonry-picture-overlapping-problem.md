---
title: "瀑布流（masonry）圖片重疊問題"
date: "2016-02-22T09:25:00"
categories: 
  - JavaScript
---

因為 [pinterest](https://www.pinterest.com/) 的緣故，有不少網站喜歡使用瀑布流排版，其中最簡單好用的套件莫過於 [masonry](http://masonry.desandro.com/) 了。

然而在網頁載入時，圖片下載比較慢，若在整個網頁載入完成之前圖片還沒好，就會造成重疊。

這種奇怪效果顯然不是我們想要的！

解決方法有好幾種<s>，最簡單的一種就是不要用瀑布流</s>，或者參考以下替代作法：

## 把 jQuery 的 ready 改成 load
我們一般使用`$(document).ready(fn)`，會在網頁 DOM 載入完畢後就觸發，一般使用這種觸發方式不會有問題，但是遇到瀑布流排版可就沒辦法了。此時可以改成`$(window).load(fn)`，待網頁內引用的資源都載入完畢再觸發，就不會有圖片重疊的問題。
```js
jQuery(window).on('load', function(){
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 10,
    });
});
```

## 使用 [imagesLoaded](http://imagesloaded.desandro.com/) 插件
其實和第一種方法大同小異，它會等到圖片載入完畢之後再來處理排版。

## 先下手為強，指定圖片高度
適用少量圖片，或是圖片高度固定的情況。因為 masonry 這個套件必須先指定每個 grid item 的寬度，因此圖片高度的不確定，正是造成重疊的元兇，我們可以預先利用 CSS 或是 html 指定圖片的高度，讓瀏覽器先把區塊空出來，就不會重疊了。


##參考資料
- [masonry js overlapping items](http://stackoverflow.com/questions/18849296/masonry-js-overlapping-items)
- [黑暗執行緒：jQuery ready vs load](http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/06/05/jquery-ready-vs-load.aspx)
- [http://imagesloaded.desandro.com/](http://imagesloaded.desandro.com/)
- [http://masonry.desandro.com/layout.html#imagesloaded](http://masonry.desandro.com/layout.html#imagesloaded)

