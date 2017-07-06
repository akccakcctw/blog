---
title: 利用 CSS 美化瀏覽器的 `console`
date: 2017-07-06T10:34:09+08:00
---

瀏覽器的`console`功能不少，除了最常用的`log`之外，還有代表不同狀態的：

+ info
+ warn
+ error

也有不同功能的：

+ time、timeEnd
+ table
+ dir
+ group
+ assert

本篇主要介紹`console`裡利用 CSS 改變輸出樣式的做法。

在`console`裡面，`%`這個符號代表 placeholder，它會依照順序將後面的`argument(s)`代入，比如`console.log('%s', '我是一串文字')`，會輸出`我是一串文字`，此處`%s`的 s 是 string 的意思，後面的 argument 1 會被當作字串看待。

瞭解`%`的用法後，想要改變`console`的樣式就很簡單了，只要使用`%c`就行了，底下範例我為了讓程式碼看起來清爽，因此文字就不使用上面`%s`的做法，而是直接用變數配合 ES6 的 template literals 來代入：
```js
const style = [
  'color:blue',
  'background: white',
  'font-size: 20px',
  'border-radius: 5px',
].join(';');

const str = 'https://rex-tsou.com'; // 輸出的連結可以點！

console.log(`%c ${str} `, style);
```

多重 Style 也沒問題唷：
```js
const style1 = [
  'color: red',
  'background: yellow',
  'font-weight: bold',
  'font-size: 20px',
  'border-radius: 5px 0 0 5px',
].join(';');

const style2 = [
  'color:blue',
  'background: white',
  'font-size: 20px',
  'border-radius: 0 5px 5px 0',
].join(';');

const string1 = 'Hello World!';
const string2 = 'Lorem ipsum.';

console.log(`%c ${string1} %c ${string2} `, style1, style2);
```

## 參考資料
+ [MDN: Console](https://developer.mozilla.org/en/docs/Web/API/console)
+ [freeCodeCamp: How to get the most out of the JavaScript console](https://medium.freecodecamp.org/how-to-get-the-most-out-of-the-javascript-console-b57ca9db3e6d)
