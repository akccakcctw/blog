---
title: "利用WAAPI(Web Animations API)製作動態效果"
date: "2016-03-24T10:46:00"
categories: ["WAAPI", "animation", "動畫"]
---

一般來說，網頁動畫常使用 Javascript、CSS、SVG 等方式製作，尤其近期 SVG 動畫有越來越流行的趨勢，這些方法都各有優缺，`WAAPI`則企圖融合 CSS 的性能（支援硬體加速，但動態調整仍需依靠 Javascript），以及 Javascript 的易於調整，並以原生 API 來達成！

我們先來看一下基本功

## 基本用法：
```js
element.animate(keyframes, timing);
```
只有短短一行。

`keyframes` 和 `timing` 是 WAAPI 需要的兩個參數，如果熟悉 CSS 動畫的寫法，應該會覺得非常容易：
```js
var keyframes = [{
  background: "#fff"
}, {
  background: "#f00"
}, {
  background: "#ff0"
}, {
  background: "#f0f"
}, {
  background: "#00f"
}, {
  background: "#0ff"
}];

var timing = {
  duration: 5000, // animation-duration(ms)
  delay: 0, // animation-delay(ms)
  iterations: 1, // animation-iteration-count: [number, Infinity...]
  direction: 'alternate', // animation-direction: [normal, reverse...]
  easing: 'ease-in-out', // animation-timing-function: [linear, ease, ease-in, ease-out...]
  fill: 'both' // animation-fill-mode [none,forwards, backwards, both...]
};

```
keyframes 的寫法就像是 CSS 中的`@keyframes`，
timing 則是調整持續時間、delay、執行次數……等

了解上面的基礎用法，我們就可以來寫一些簡單的動畫了：
**改變背景顏色**
<p data-height="268" data-theme-id="0" data-slug-hash="VabxOj" data-default-tab="result" data-user="akccakcctw" class="codepen">See the Pen <a href="http://codepen.io/akccakcctw/pen/VabxOj/">Web Animations API demo</a> by Rex Tsou (<a href="http://codepen.io/akccakcctw">@akccakcctw</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## 進階用法

如果有仔細看上面的例子，應該會發現，動畫居然還可以做播放、暫停、倒帶等操作！
要怎麼做呢？

我們延續基本用法，定義一個animate的元素：
```js
var player = document.getElementById('toAnimate').animate()
```

此時我們的 player 總共會有五種狀態："`pending`"、"`paused`"、"`running`"、"`idle`"、"`finished`"
```js
console.log(player.playState);
// "pending"、"paused"、"running"、"idle"、"finished"
```
這五種狀態代表的意義如下，
1. `pending`：播放或暫停即將發生時
2. `paused`：暫停
3. `running`：播放
4. `idel`：初始
5. `finished`：結束

除了 pending 之外，我們透過其餘方法可以改變動畫的狀態：
```js
player.pause(); // "paused"
player.play();  // "running"
player.cancel(); // "idle"
player.finish(); // "finished"
```

還可以透過`reverse()`倒帶：
```js
player.reverse();
```

以上算是 WAAPI 的入門介紹，另外附上一份控制元素移動、變形的 demo：
**控制元素移動、變形**
<p data-height="268" data-theme-id="0" data-slug-hash="EKmpbb" data-default-tab="result" data-user="akccakcctw" class="codepen">See the Pen <a href="http://codepen.io/akccakcctw/pen/EKmpbb/">Web Animations API demo 2</a> by Rex Tsou (<a href="http://codepen.io/akccakcctw">@akccakcctw</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

比較可惜的是，目前瀏覽器的支援還不夠完整（如下表），但是可先引入一份 [polyfill](https://github.com/web-animations/web-animations-js) 來彌補，所以也不需要太擔心！
不過還是希望瀏覽器廠商們可以趕快補足`WAAPI`的支援啦，敲碗~~~~
<iframe style="width:100%;min-height:300px;" src="https://caniuse.com/web-animation/embed"></iframe>

## 參考資料
- [Let’s talk about the Web Animations API](http://danielcwilson.com/blog/2015/07/animations-intro/)
- [The Web Animations API](https://seejamescode.github.io/web-animations-intro/)
- [Animation API 从入门到上座](http://www.alloyteam.com/2015/12/web-animation-api-from-entry-to-the-top/)
