---
title: "Javascript 判斷小數是否相等"
date: "2017-02-08T03:29:00"
categories:
  - JavaScript
---

![IEEE_754_Double_Floating_Point_Format](https://i.imgur.com/AemLA5y.png)

大家都知道，在 Javascript 裡，`0.1 + 0.2 !== 0.3`，因為浮點數並不是精確值。

那麼需要比較小數的時候怎麼辦呢？只要定義好誤差範圍即可，依據 [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754) 的標準，64 位元的雙精度浮點數（double）的誤差值應在 2^-53 以內（Javascript 浮點數：符號佔 1 位，指數佔 11 位，小數佔 52 位，加起來共 64 位），因此，我們可以依據這個標準定義出精確度，就可以進行比較了，以下為實作範例：

```js
const EPSILON = Math.pow(2, -53); //1.1102230246251565e-16

const epsEqu = (x, y) => {
  return Math.abs(x - y) < EPSILON;
};

// usage
epsEqu(0.1+0.2, 0.3); // true
```

## 參考資料
- [Wikipedia: Machine epsilon](https://en.wikipedia.org/wiki/Machine_epsilon)
- [IEEE754 浮点数格式 与 Javascript number 的特性](https://segmentfault.com/a/1190000008268668)
- [JavaScript 中的数字值](http://www.jianshu.com/p/7462444d1fff)
