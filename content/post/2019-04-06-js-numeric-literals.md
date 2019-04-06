---
title: "JavaScript ES6 Numeric Literals"
date: 2019-04-06T15:58:09+08:00
categories:
tags:
description: ""
lastmod: 2019-04-06T15:58:09+08:00
---

寫 JS 也好一陣子了，還沒遇過需要處理二進位的情況，如果了解原理，[用二進位表示法來處理權限問題](https://oomusou.io/ecmascript/operator/bitwise/?fbclid=IwAR1jwGMQ-VPIPFDoD6x-mcRbPz-9exwnD3UST4UC9Is6w4AfUmtW2uc3zFM)，也真的是簡潔不囉唆。剛才翻了下文件，發現其實在 ES6 之後就有提供不同進位法數字表示法了，包括 Decimal, Binary, Octal, Hexadecimal 這幾種，運算時其實不一定需要使用 `parseInt()` 了，語法如下：

## Syntax

### Decimal（十進位）

```js
var d1 = 1234567890;
var d2 = 900;

// 如果 0 開頭的數字，其中有大於等於 8 的數字，也會解析為 Decimal
var d3 = 0888; // 888

// 如果 0 後面的數字都小於 8，則會解析為 Octal
var o1 = 0777; // 511
```

### Binary（二進位）

```js
// 以 ob 或 oB 開頭
var b1 = 0b0001; // 1
var b2 = 0b0011; // 3
```

### Octal（八進位）

```js
// 以 0O 或 0o 開頭
var o3 = 0O755; // 493（也可以直接寫 var n = 0755）
var o4 = 0o644; // 420

```

### Hexadecimal（十六進位）

```js
// 以 0x 或 0X 開頭
var x1 = 0xFFF; // 4095
var x2 = 0xA; // 10
```


## 參考資料

- [MDN: Numeric literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)
- [ECMAScript® 2015 Language Specification: 11.8.3 Numeric Literals](http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals)
- [Stackoverflow: Is there “0b” or something similar to represent a binary number in Javascript](https://stackoverflow.com/questions/2803145/is-there-0b-or-something-similar-to-represent-a-binary-number-in-javascript)
- [ECMAScript 之 Bitwise Operator](https://oomusou.io/ecmascript/operator/bitwise/?fbclid=IwAR1jwGMQ-VPIPFDoD6x-mcRbPz-9exwnD3UST4UC9Is6w4AfUmtW2uc3zFM)
