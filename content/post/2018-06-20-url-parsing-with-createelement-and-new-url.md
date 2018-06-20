---
title: "解析網址就用 a 吧"
date: 2018-06-20T20:40:12+08:00
categories:
tags:
description: "除了 Regular Expression，還可以用 HTML a 以及 URL API 來解析網址"
---

遇到要解析網址的時候，例如這樣一段網址：

```javascript
'http://example.com:8000/pathname/?query=text#hash';
```

如果要取出其中的 protocol, hostname, pathname……你第一個想到的解法是什麼？

別懷疑，我首先想到的就是用 Regular Expression 硬幹，我想大多數人也是。但其實有更簡單的辦法，那就是利用 `<a></a>`：

```javascript
var a = document.createElement('a');
a.href = 'http://example.com:8000/pathname/?query=text#hash';

a.protocal; // "http:"
a.host;     // "example.com:8000"
a.hostname; // "example.com"
a.port;     // "8000"
a.pathname; // "/pathname/"
a.search;   // "?query=text"
a.hash;     // "#hash"
a.origin;   // "http://example.com:8000"

// 還有 a.username 及 a.password，可以應用在 ftp://
```

除此之外，還有更強大的 URL API，用法差不多，但多了 `searchParams` 可以使用：

```javascript
var b = new URL('http://example.com:8000/pathname/?query=text#hash');

b.protocal; // "http:"
b.host;     // "example.com:8000"
b.hostname; // "example.com"
b.port;     // "8000"
b.pathname; // "/pathname/"
b.search;   // "?query=text"
b.hash;     // "#hash"
b.origin;   // "http://example.com:8000"
b.searchParams.get('query'); // "text"

// searchParams 除了 get 以外，還有許多 methods，有興趣可以到 MDN 查詢
```

下次要在前端解析網址，記得不要再硬幹了


## 參考資料

[MDN:URL](https://developer.mozilla.org/zh-TW/docs/Web/API/URL)
