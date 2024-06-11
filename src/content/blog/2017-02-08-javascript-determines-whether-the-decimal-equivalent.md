---
title: "JavaScript 判斷小數是否相等"
date: "2017-02-08T03:29:00"
categories:
  - JavaScript
---

![IEEE_754_Double_Floating_Point_Format](https://i.imgur.com/AemLA5y.png)

大家都知道，在 JavaScript 裡，`0.1 + 0.2 !== 0.3`，因為浮點數並不是精確值。

那麼需要比較小數的時候怎麼辦呢？只要定義好誤差範圍即可，依據 [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754) 的標準，64 位元的雙精度浮點數（double）的誤差值應在 2^-52 以內（JavaScript 浮點數：符號佔 1 位，指數佔 11 位，小數佔 52 位，加起來共 64 位），因此，我們可以依據這個標準定義出精確度，就可以進行比較了，以下為實作範例：

```js
const EPSILON = Math.pow(2, -52); // 2.220446049250313e-16

const epsEqu = (x, y) => Math.abs(x - y) < EPSILON;

// usage
epsEqu(0.1 + 0.2, 0.3); // true
```

---

**20180203 更新：**


## `Number.EPSILON`

在 ES6 之後， JS 已經有定義一些 `Number` 的常數（[spec 在這](https://www.ecma-international.org/ecma-262/6.0/#sec-number.epsilon)），其中就有 `Number.EPSILON`，因此上面的 function 我們可以這樣用：

```js
const epsEqu = (x, y) => Math.abs(x - y) < Number.EPSILON;
```

特別注意 IE 不支援，需要 polyfill：

```js
if (Number.EPSILON === undefined) Number.EPSILON = Math.pow(2, -52);
```

以為這樣就天下太平了嗎？不！JS 總是充滿驚喜，這樣會出問題，至少我用 chrome 實測會有問題：

```js
epsEqu(32.17 - 0.01, 32.16); // false
```

這邊本來應該輸出為 `true` 的，但是在某些數字卻會輸出 `false`……  
雖然覺得是瀏覽器實作的問題，但這逼得我們不得不想別的辦法


## B 計畫：`Math.round()`

workaround 雖然可恥但是有用，這裡的邏輯是先將數字變成整數再來計算，避免浮點數取值問題，但就需要依照需求修改誤差範圍了。範例如下：

```js
// eplilon: 算到小數第幾位
const epsEqu = (x, y, epsilon = 4) => {
  return Math.round(x * Math.pow(10, epsilon)) === Math.round(y * Math.pow(10, epsilon));
}
```


## 參考資料
- [Wikipedia: Machine epsilon](https://en.wikipedia.org/wiki/Machine_epsilon)
- [IEEE754 浮点数格式 与 JavaScript number 的特性](https://segmentfault.com/a/1190000008268668)
- [JavaScript 中的数字值](http://www.jianshu.com/p/7462444d1fff)
- [浮点数计算引发的血泪史——以此为戒](https://futu.im/posts/2017-11-30-javascript-float-fault/)
