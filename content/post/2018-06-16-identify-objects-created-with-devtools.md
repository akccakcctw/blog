---
title: "DevTools: Retrieving objects which were created from the constructor"
date: 2018-06-16T00:32:19+08:00
categories:
tags:
 - devtools
description: ""
---

Chrome 的 DevTools 原先就內建很多實用的 [Command Line API](https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference)，現在又多一個好用的 `queryObjects(Constructor)`，ummar 照慣例錄了一段 .gif ，附在底下的參考資料，可以感受一下，這邊簡單記錄用法：

```javascript
// 尋找所有 Promise 物件
queryObjects(Promise)

// 尋找自己定義的物件
class Person {}
new Person()
queryObjects(Person)

// 而且，找到之後在 return 的 Array 上按右鍵，還可以存成全域變數（變數名會是 temp1, temp2...），debug 非常方便！
```


## 參考資料

[Chrome DevTools: Identify objects created with a certain constructor](https://umaar.com/dev-tips/173-query-objects/)
