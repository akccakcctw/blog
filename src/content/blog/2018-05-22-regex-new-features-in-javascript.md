---
title: "ES2018：RegExp 新功能介紹"
date: 2018-05-22T22:52:20+08:00
categories:
 - JavaScript
tags:
 - regex
description: ""
---

## `/s` flag

為了解決目前的 dot(.) 無法比對到換行字元，因此新的 `/s` flag 又稱 dotAll mode。

```javascript
const input = `
Lorem ipsum dolor sit amet, consectetur adipiscing hello
world elit. Nam sit amet elit id risus aliquam porta.
`;
```

```javascript
/hello.world/u.test(input);
// false
```

workarounds:

```javascript
/hello[\s\S]world/u.test(input);
// true

/hello[^]world/u.test(input)
// true
```

新語法：

```javascript
/hello.world/su.test(input);
// true
```


## Named capture groups

[tc39/proposal-regexp-named-groups](https://github.com/tc39/proposal-regexp-named-groups)


```javascript
const pattern = /(\d{4})-(\d{2})-(\d{2})/u;
const result = pattern.exec('2018-05-09');
// result[0] === '2018-05-09'
// result[1] === '2018'
// result[2] === '05'
// result[3] === '09'
```

capture groups 可以取名了！  
新語法：

```javascript
const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const result = pattern.exec('2018-05-09');
// result.groups.year === '2018'
// result.groups.month === '05'
// result.groups.day === '09'
```


## Unicode property escapes

[tc39/proposal-regexp-unicode-property-escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes)

```javascript
const regexGreek = /\p{Script_Extensions=Greek}/u;
regexGreek.test('π');
// true

const regexAscii = /\p{ASCII}/u;
regexAscii.test('_');
// true

const regexMath = /\p{Math}/u;
regexMath.test('≠');
// true

const pattern = /[\p{Letter}\p{White_Space}]+/u;
pattern.test('πüé μετά Grüß');
// true
```

一個實用的例子：
```html
<style>
  :valid { background: lightgreen; }
  :invalid { background: pink; }
</style>
<input pattern="[\p{Letter}\p{White_Space}]+" value="your input string">
```


## Lookbehind assertions

[tc39/proposal-regexp-lookbehind](https://github.com/tc39/proposal-regexp-lookbehind)


lookbehind 語法很像 lookahead 的語法 `(?=...)`、`(?!...)`：
```javascript
// Positive lookahead:
const pattern = /\d+(?= dollars)/u;
const result = pattern.exec('42 dollars');
// result[0] === '42'

// Negative lookahead:
const pattern = /\d+(?! dollars)/u;
const result = pattern.exec('42 rupees');
// result[0] === '42'
```

來看看新的 lookbehind 語法 `(?<=...)`、`(?<!...)`：
```javascript
// Positive lookbehind:
const pattern = /(?<=\$)\d+/u;
const result = pattern.exec('$42');
// result[0] === '42'

// Negative lookbehind:
const pattern = /(?<!\$)\d+/u;
const result = pattern.exec('#42');
// result[0] === '42';
```


## `String.prototype.matchAll`

[tc39/proposal-string-matchall](https://github.com/tc39/proposal-string-matchall)

```javascript
const string = 'Magic hex numbers: DEADBEEF CAFE 8BADF00D';
const regex = /\b\p{ASCII_Hex_Digit}+\b/gu;
let match;

// 以前要這樣寫
while (match = regex.exec(string)) {
  console.log(match);
}

// matchAll:
for (const match of string.matchAll(regex)) {
  console.log(match);
}
```



## 參考資料

[Build the future of the web with modern JavaScript (Google I/O ’18)](https://www.youtube.com/watch?v=mIWCLOftfRw&t=20m)  
[ES2018: s (dotAll) flag for regular expressions](http://2ality.com/2017/07/regexp-dotall-flag.html)  
[ES2018: RegExp named capture groups](http://2ality.com/2017/05/regexp-named-capture-groups.html)  
[ES2018: RegExp Unicode property escapes](http://2ality.com/2017/07/regexp-unicode-property-escapes.html)  
[ES2018: RegExp lookbehind assertions](http://2ality.com/2017/05/regexp-lookbehind-assertions.html)  
[ES proposal: String.prototype.matchAll](http://2ality.com/2018/02/string-prototype-matchall.html)
