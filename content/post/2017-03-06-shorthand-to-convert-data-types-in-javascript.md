---
title: "JavaScript 轉換型別小技巧"
date: "2017-03-06T09:47:00"
categories:
  - JavaScript
---

```js
var number = 1;
var string = '1';
var bool = true;

string === number; // false
bool === number; // false
bool === string; // false
```  

## `string` 與 `number` 轉換
```js
string === '' + number; // true
+string === number; // true
```

## `boolean` 與 `number` 轉換
```js
+bool === number; // true  
bool === !!number // true
```

## `boolean` 與`string` 轉換
```js
bool === !!string; // true
'' + bool === string; // true
```
