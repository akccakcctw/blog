---
title: "Javascript 字串轉陣列"
date: "2016-03-15T10:47:00"
categories:
  - JavaScript
---

如果要將字串轉為陣列形式，可以利用 for 迴圈，配合 slice 切割字串
請看程式碼：

## 利用 for 迴圈

首先是每隔一個字元存入陣列：
```js
var x = "Hello world!";
var myArray = [];

function foo(x) {
    for (var i = 0; i < x.length; i++) {
        myArray.push(x.slice(i, i + 1));
    }
    console.log(myArray);
};
foo(x); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
```

也可以這麼寫
```js
var x = "Hello world!";
var myArray = [].slice.call(x);  // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
```

每隔任意字元存入陣列（以三個字元為例）：
```js
var x = "Hello world!";
var myArray = [];

function foo(x) {
    for (var i = 0; i < x.length; i+=3) {
        myArray.push(x.slice(i, i + 3));
    }
    console.log(myArray);
}
foo(x); // ["Hel", "lo ", "wor", "ld!"]
```

再來是進階版本！

## 利用Regular Expression

可以發現程式碼變得非常簡潔（當然`regex`挺讓人頭痛的）：
```js
var x = "Hello world!";
var myArray = x.match(/[\s\S]{1}/g) || [];
console.log(myArray); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
```

隔三個字元，這邊要注意，寫成`{1,3}`而不是`{3}`，否則字串長度不是 3 的倍數的話，最後會被切掉！
```js
var x = "Hello world!";
var myArray = x.match(/[\s\S]{1,3}/g) || [];
console.log(myArray); // ["Hel", "lo ", "wor", "ld!"]
```

錯誤的版本也提供參考：
```js
var x = "Hello";
var myArray = x.match(/[\s\S]{3}/g) || [];
console.log(myArray); // ["Hel"]
```

##參考資料：
- [Javascript elegant way to split string into segments n characters long](http://stackoverflow.com/questions/6259515/javascript-elegant-way-to-split-string-into-segments-n-characters-long)
