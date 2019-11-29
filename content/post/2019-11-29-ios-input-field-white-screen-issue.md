---
title: "iOS Input Field White Screen Issue"
date: 2019-11-29T23:53:05+08:00
categories:
tags:
  - CSS
description: ""
lastmod: 2019-11-29T23:53:05+08:00
---

## TL;DR

檢查看看 CSS 內是否有 `-webkit-overflow-scrolling: touch;`，改成 `-webkit-overflow-scrolling: auto;` 或許就能解決了。

---

今天在公司的專案遇到一個通靈級別的 bug，只有在比較舊的 iOS 手機（iOS 10, iPhone6s）會發生。問題比較罕見，排除問題的過程也值得記錄一下。

專案用的是 vue，但後來測試結果證實和 vue 無關。發生問題的 code 長下面這樣：

```html
<input
  :id="`booking-traveler-passport-first-name-${ i }`"
  v-validate="'required|passportName'"
  :value="_.get(orderCustomList[i - 1], 'englishName.firstName')"
  :name="`passport-firstname-${ i }`"
  :placeholder="lang('booking_index_cust_data_passport_english_firstname_placeholder')"
  type="text"
  class="form-control"
  @focus="updateIsShowBookingFixBar(false)"
  @blur="updateIsShowBookingFixBar(true)"
  @input="updateOrderCustomListByPath({
    $event,
    index: i - 1,
    path: 'englishName.firstName',
  })"
>
```

這是一個 text 類型的 `input` 輸入框，由於是用 vue 寫，因此綁定了許多特定事件在元素上，有：

1. focus 事件：`updateIsShowBookingFixBar`
2. blur 事件：`updateIsShowBookingFixBar`、觸發 v-validate 執行資料驗證
3. input 事件：`updateOrderCustomListByPath`
4. :value：資料綁定

語法看起來是沒問題的，只是當 `input` 被點擊（focus 事件）並觸發螢幕虛擬鍵盤展開（這時候還是正常的），再隨便按任何 2 個字元（數字、空白鍵等等都可...），當你按下第 2 個字元時，瀏覽器整個區塊會白屏。看起來很像有一層白色的 layer 覆蓋在這個區塊上，只剩下 header 和 footer。但是當你 focus 到其他元素時就回到正常。

當恢復正常時，繼續打字不會再度觸發白屏的 bug。但是把這個欄位清空重新輸入到第 **2** 個字元時又會再度觸發。

一開始的想法很簡單，在旁邊寫一個乾淨的 `input` 看有沒有同樣問題：

```html
<!-- 像這樣超乾淨 -->
<input type="text">
```

結果沒問題，躺著按、坐著按，輸入中文 blahblah 就是沒問題。

看來和元素內容有關？

於是我開始縮小範圍做實驗，最後把可能造成問題的 property 限縮在 `placeholder` 及 `@focus` 這 2 個。

- 2 個都沒有時完全正常
- 只有 `placeholder` 時（不管前面是否有 `:`），情形和一開始敘述的一樣
- 只有 `@focus` 時，重整頁面後輸入第 1 個字元就會觸發白屏，但是只會發生 1 次，之後就不會再觸發

這時我決定去找同事尋求一些建議，同事想到其他頁面也有 `input` 欄位，而且似乎很正常沒出過問題，這時的靈光開始導向 CSS，感覺是 CSS 在作怪。

把 CSS 全部拿掉後，發現是正常的。然後同事就找到[這篇](https://stackoverflow.com/questions/45643879/cordova-ios-white-screen-after-click-in-a-input-field#)，雖然這個問題非常冷門，但我搜尋一下解答中提到的

```css
-webkit-overflow-scrolling: touch;
```

發現還真的有！試著改成

```css 
-webkit-overflow-scrolling: auto;
```

白屏的問題就解決了！

> Tips：`-webkit-overflow-scrolling` 是 iOS 的非標準 CSS 規則，用來改變手指在觸控螢幕上捲動畫面的回彈效果，設定為 auto 時，手指移開捲動會立即停止；設定為 touch 時，會有回彈效果。


白屏的問題看起來在新版 iOS 已經修正了，不過還不太清楚問題的原因為何，又為何與 placeholder 和 focus 有關？就等之後比較有空再來研究了。


## 參考資料

- https://stackoverflow.com/questions/45643879/cordova-ios-white-screen-after-click-in-a-input-field
-
