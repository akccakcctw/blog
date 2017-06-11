---
title: "動態改變 CSS 樣式的 inline 寫法"
date: "2015-10-20T16:10:00"
categories: ["CSS", "Javascript"]
---

某些 CSS 樣式無法使用 inline 寫法表示，必須要寫在`<style>`標籤裡面。比如說，我們想要改變某個連結的`hover`樣式，就只能去修改 style.css，或是`<style>`標籤裡面的`a:hover`。

但有些時候，我們可能因為權限問題，沒辦法修改到主網站的樣式表，卻仍希望達到一些動態效果，該怎麼辦呢？

## 解決方案：`onmouseover`、`onmouseout`
直接實作如下

原先程式碼長這樣：
```html
<button id="aaa" style="color:red">滑鼠移上來沒啥變化</button>
```
輸出 <button id="aaa" style="color:red">滑鼠移上來沒啥變化</button>

修改後，程式碼長這樣：
```html
<button id="aaa" style="color:red" onmouseover="this.style.color='blue'" onmouseout="this.style.color='red'">滑鼠移上來試試</button>
```
輸出 <button id="aaa" style="color:red" onmouseover="this.style.color='blue'" onmouseout="this.style.color='red'">滑鼠移上來試試</button>

-----

又如果發現上面的寫法無效，可以嘗試把`this`改寫為`document.getElementById('aaa')`，像是這樣：
```html
<button id="bbb" style="color:red" onmouseover="document.getElementById('bbb').style.color='blue'" onmouseout="this.style.color='red'">滑鼠移上來試試</button>
```
輸出結果和上面是一樣的
<button id="bbb" style="color:red" onmouseover="document.getElementById('bbb').style.color='blue'" onmouseout="this.style.color='red'">滑鼠移上來試試</button>

-----

## 進階：一次修改多種樣式
```html
<button id="ccc" style="color:red" onmouseover="this.style.cssText='background-color:blue;font-size:20px;border:2px dashed;color:white;'" onmouseout="this.style.cssText='background-color:lightgrey;font-size:14px;border:1px solid;color:red;'">滑鼠移上來試試</button>
```
<button id="ccc" style="color:red" onmouseover="this.style.cssText='background-color:blue;font-size:20px;border:2px dashed;color:white;'" onmouseout="this.style.cssText='background-color:lightgrey;font-size:14px;border:1px solid;color:red;'">滑鼠移上來試試</button>


## 備註
如果遇到有`-`字號的樣式，要改用駝峰式寫法，不然瀏覽器會看不懂，
例如`text-decoration`應該要寫成`textDecoration`，而`font-size`則應該寫成`fontSize`

具體寫法如下
```js
onmouseover="document.getElementById('ccc').style.fontSize='100px'"
```

## 參考資料
- [Stack Overflow：How to write a:hover in inline CSS?](http://stackoverflow.com/questions/1033156)
- [w3schools：onmouseover事件](http://www.w3schools.com/jsref/event_onmouseover.asp)
- [w3schools：Style cssText Property](http://www.w3schools.com/jsref/prop_style_csstext.asp)
