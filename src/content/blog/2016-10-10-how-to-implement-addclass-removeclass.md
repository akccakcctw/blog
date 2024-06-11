---
title: "如何實作 addClass, removeClass？"
date: "2016-10-10T09:46:00"
categories:
  - JavaScript
---

以下原始碼與想法，參考自 [Sitepoint：Add or Remove a CSS Class with Vanilla JavaScript](https://www.sitepoint.com/add-remove-css-class-vanilla-js/) 並作改寫，為了撰寫方便，使用 ES6 語法，如需支援古老瀏覽器，仍需經過 [Babel](https://babeljs.io/) 轉換。

如果不使用 jQuery，只想用 Vanilla Javascript 來新增移除`Class`，我們可以利用`className`（IE8+）或`classList`（IE10+）來實作。

## IE8+
### addClass
```js
const addClass = (el, myClass) => {
  //檢查element是否存在
  if (!el) {
    return;
  }
  
  //取得所有element(s)
  if (typeof(el) === 'string') {
    el = document.querySelectorAll(el);
  } else if (el.tagName) {
    el = [el];
  }

  for (let i = el.length - 1; i >= 0; i--) {
    //檢查欲新增的class是否已經存在
    //注意前後的space，這樣可以避免使用RegExp
    if ((` ${el[i].className} `).indexOf(` ${myClass} `) < 0) { 
      el[i].className += ` ${myClass}`;//key code
    }
  }
}
```

### removeClass
```js
const removeClass = (el, myClass) => {
  //檢查element是否存在
  if (!el) {
    return;
  }

  //取得所有element(s)
  if (typeof(el) === 'string') {
    el = document.querySelectorAll(el);
  } else if (el.tagName) {
    el = [el];
  }

  //利用RegExp找到此class
  let reg = new RegExp(`(^| )${myClass}($| )`, 'g')

  for (let i = el.length - 1; i >= 0; i--) {
    el[i].className = el[i].className.replace(reg, ' ');//key code
  }
}
```

## IE10+
### addClass
```js
const addClass = (selector, myClass) => {
  //取得所有element(s)
  el = document.querySelectorAll(selector);

  for (let i = el.length - 1; i >= 0; i--) {
    el[i].classList.add(myClass);//key code
  }
}
```

### removeClass
```js
const removeClass = (selector, myClass) => {
  //取得所有element(s)
  el = document.querySelectorAll(selector);

  for (let i = el.length - 1; i >= 0; i--) {
    el[i].classList.remove(myClass);//key code
  }
}
```
