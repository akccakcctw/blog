---
title: "window.open() 用法筆記"
date: 2018-08-27T23:20:42+08:00
categories:
tags:
description: ""
---

`window.open()` 這個 method 經常使用，但是之前並沒有深究，直到最近讀犀牛書，才發現還有些特別的用法。

先來看看 syntax：


## Syntax

```javascript
var w =  window.open(url, windowName, [windowFeatures]);
```

### 參數：`url`

第一個參數就是 url，很直觀，只要瀏覽器支援的字串都可以丟進去。需要注意的有以下幾點：

 - 如果是空字串，會打開一個空白頁面
 - 如果帶有 schema（例如：`https://`），會當作絕對位址解析
 - 反之，如果不帶有 schema，會當作相對位址解析


### 參數：`windowName`

打開的 window 要叫什麼名字。

 - 如果該名字已經被某個 window（iframe, tab） 使用了，打開的 url 就會開在該 window
 - 如果省略此參數，會使用 `_blank` 打開一個新的頁面


### 參數：`windowFeatures`

一些 window 的控制項，控制 window 的尺寸、scrollbar 顯示與否等等，詳細用法可參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/open#Window_features)。

 - 使用逗號分隔
 - 不可使用空白字元


## 其他功能

如果用 `window.open` 打開的話，就可以控制打開的 window 了，提供一些比較有用的用法如下：

```javascript
var w = window.open('https://example.com', 'examplePage');

// 在同一個 tab 內開啟 example2.com
window.open('https://example2.com', 'examplePage');

// 子頁面回到上一頁
w.history.back();

// 關掉子頁面
w.close();
```


## 參考資料

- [MDN: Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
