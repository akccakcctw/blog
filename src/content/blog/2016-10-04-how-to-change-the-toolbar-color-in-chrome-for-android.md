---
title: "如何改變 Chrome for Android 的 toolbar 顏色？"
date: "2016-10-04T06:05:00"
categories:
  - Chrome
---

超簡單，只要新增一個`name="theme-color"`的`meta`標籤到`<head>`內即可，content 內容則可以指定任何 CSS 顏色，如以下範例：
```html
<meta name="theme-color" content="#ff0000">
```
沒有意外的話，HTML 5.2 規格確定後，桌面版也將可以經由相同的方式來使用。

除了 theme-color，android 會自動擷取最高解析度的 favicon，推薦使用 192 x 192 px 的 png 檔，依以下方式來指定：
```html
<link rel="icon" sizes="192x192" href="nice-highres.png">
```

## 參考資料：
- [Google Developers: Support for theme-color in Chrome 39 for Android](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)
- [Welcome to HTML 5.2!](https://developer.telerik.com/featured/welcome-to-html-5-2/#toc_6)
