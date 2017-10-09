---
title: "各種讓網頁重新導向的方法"
date: "2016-01-08T15:50:00"
categories:
  - PHP
  - JavaScript
  - server
---

## 方法一：直接在錯誤頁裡重導

如果<s>沒有強迫症</s>不在乎伺服器裡多增加一個沒有用的檔案，這樣最簡單：
### PHP
```php
<?php
  header( 'Location: http://www.redirect-location.com' );
  exit();
?>
```

### HTML
```html
<meta http-equiv="refresh" content="1;url=http://www.redirect-location.com">
```

此處`content`屬性裡面的「1」，代表延遲1秒，可以自行替換成其他數字

當然，你可能會發現，每次連進 FTP 就看到一個無關緊要的垃圾在那邊……髒髒的不舒服，而且 user 要多等 1 秒才看得到真正的網頁，有沒有更好的辦法？
有！請看以下方法二。

## 方法二：修改 .htaccess 檔案

其實也不難，把以下幾行字加進 .htaccess 的開頭就可以了
```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html?$ / [NC,R,L]
```

## 同場加映：JavaScript重導
```js
// similar behavior as an HTTP redirect，不會留下歷史記錄
window.location.replace("http://stackoverflow.com");

// similar behavior as clicking on a link，會留下歷史記錄
window.location.href = "http://stackoverflow.com";
```
`.replace()`可以避免使用者無法回到上一頁的情形發生，但有時還是會需要模擬點擊連結的效果，因此兩種都列出

## 參考資料
- [CSS-TRICKS：How to Redirect indexhtml to indexphp](https://css-tricks.com/how-to-redirect-indexhtml-to-indexphp/)
- [stackoverflow：How Can I Make A Redirect Page Using Jquery](http://stackoverflow.com/questions/503093/how-can-i-make-a-redirect-page-using-jquery)
