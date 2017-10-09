---
title: "純 CSS 實現打字效果"
date: "2017-02-15T02:22:00"
categories:
  - CSS
---

剛剛看到這個[搜尋樣式](https://tympanus.net/Development/SearchUIEffects/index11.html)，覺得在搜尋前使用 #tag 的方式提醒使用者可用的關鍵字不錯，應該會適合小網站或部落格。

好奇就順便看了下程式碼，發現她的打字效果居然是純 CSS！利用`animation`配合`steps`和`ch`(charactor)這個長度單位來達成，類似這樣：

```css
.js .search--open .terminal__line {
  animation: typing 1s steps(30, end), scaleUp 0.1s forwards;
}

/* 依據字數不同，設定不同的steps */
.js .search--open .terminal__line:first-child {
  animation-timing-function: steps(20, end), ease;
}

.js .search--open .terminal__line:nth-child(2),
.js .search--open .terminal__line:nth-child(3) {
  animation-timing-function: steps(27, end), ease;
}

.js .search--open .terminal__line:nth-child(4) {
  animation-timing-function: steps(28, end), ease;
}

@keyframes typing {
  from {
    width: 0;
  }
}

```

這個方法是 Lea Verou 想到的，她有寫了篇[介紹](http://lea.verou.me/2012/02/simpler-css-typing-animation-with-the-ch-unit/)。只是這樣的方法需要字數固定，所以可以看到字數不同的話，step 的次數也需要調整。（字數不固定或許配合 JS 也可以？）


此外，她的`scaleUp`利用到了`animation-fill-mode`的`forwards`，也很值得參考：
```css
.js .search--open .terminal__line {
  animation: typing 1s steps(30, end), scaleUp 0.1s forwards;
}

@keyframes scaleUp {
  from {
    height: 0;
  } to {
    height: 1.5em;
  }
}

```

## 參考資料
- [Inspiration for Search UI Effects](https://tympanus.net/codrops/2017/02/08/inspiration-search-ui-effects/)
- [Demo](https://tympanus.net/Development/SearchUIEffects)
- [animation-fill-mode](https://developer.mozilla.org/zh-TW/docs/Web/CSS/animation-fill-mode)
