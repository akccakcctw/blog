---
title: "分頁自動帶入 link-rel-prefetch function 試作"
date: "2017-04-20T07:34:00"
categories: ["HTML", "Javascript"]
---

```html
<nav class="pages">
  <ul class="list">
    <li class="item"> <a class="link" href="/zh_TW">首頁</a></li>
    <li class="item"> <a class="link" href="/zh_TW/news">最新消息</a></li>
    <li class="item"> <a class="link" href="/zh_TW/product">商品介紹</a></li>
    <li class="item"> <a class="link" href="/zh_TW/recipe">推薦食譜</a></li>
    <li class="item"> <a class="link" href="/zh_TW/about">關於我們</a></li>
    <li class="item"> <a class="link" href="/zh_TW/contact-us">聯絡我們</a></li>
  </ul>
</nav>
```
假設網頁的選單結構像上面這樣，為了讓使用者的瀏覽體驗更順暢，可以在瀏覽器閒置時預先載入其他頁面，實作如下，可以放在最後靠近`</body>`的位置，才不會影響當前頁面繪製。

```js
function prefetchLink(url){
  var link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', function(){
  var prefetchList = [];
  [].forEach.call(document.querySelectorAll('nav.pages .item a'), function(e){
    prefetchList.push(e);
  });
  prefetchList.forEach(prefetchLink);
});
```

檢查`<head>`應該會出現：
```html
<link rel="prefetch" href=".../zh_TW">
<link rel="prefetch" href=".../zh_TW/news">
<link rel="prefetch" href=".../zh_TW/product">
<link rel="prefetch" href=".../zh_TW/recipe">
<link rel="prefetch" href=".../zh_TW/about">
<link rel="prefetch" href=".../zh_TW/contact-us">
```
開啟 Developer Tools，也可以在 Network 標籤內看到這幾頁有預先載入，這樣就成功了！
![sp170420_155826.png](http://user-image.logdown.io/user/14750/blog/13947/post/1727744/lSXIEq5ETyeoGNhYl9Cn_sp170420_155826.png)

## 瀏覽器支援度
<iframe style="width:100%;min-height:300px;" src="https://caniuse.com/link-rel-prefetch/embed"></iframe>

## 參考資料
- [MDN: Link prefetcing FAQ](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Link_prefetching_FAQ)
