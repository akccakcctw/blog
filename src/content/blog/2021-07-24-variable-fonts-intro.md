---
title: "Variable Fonts 簡介"
date: 2021-07-24T22:54:00+08:00
draft: false
categories:
tags:
  - fonts 
description: ""
lastmod: 2021-07-24T22:54:00+08:00
---

本文亦同步發表於 [KKday Tech Blog](https://medium.com/kkdaytech/variable-fonts-%E7%B0%A1%E4%BB%8B-90ea546260bb)。


## 名詞定義

在敘述 Variable Fonts 時，會用到許多排版專業術語，由於排版印刷技術進步快速，許多排版術語也因爲過時或演進而更容易混淆。因此，在嘗試理解 Variable Fonts 之前，先理解排版術語可能會有所幫助。


## Typeface 及 Font 的古典意義

先來看看牛津詞典的解釋：

- [typeface](https://dictionary.cambridge.org/us/dictionary/english/typeface): letters and numbers in a particular design, used in printing or on a computer screen.
- [font](https://dictionary.cambridge.org/us/dictionary/english/font): a set of letters and symbols in a particular design and size.

也就是說，typeface 是一個抽象的「設計的總體」，而 font 則是這個抽象概念以固定參數制約而成的一組「具有確定大小和風格的鉛字」，是 typeface 的子集（font 的傳統英式英語爲 fount，與 foundry 的字根相同，都來自 found，有融化、注入的意義，因爲古典印刷的鉛字需要熔鑄製造）。

![Imgur](https://i.imgur.com/4bNuEgw.png)  
*image source: justfont (https://justfont.com/jinxuan/)*

以 [justfont](https://justfont.com/) 的字體「[金萱](https://justfont.com/jinxuan/)」爲例，「金萱」就是 typeface（字體），而「金萱一分糖」、「金萱二分糖」、「金萱半糖」等等都是隸屬於「金萱」的 font（字型）。


## Typeface 及 Font 的現代意義

隨着技術演進，字體的尺寸已不再受到鉛字限制，可自由調整大小，因此 font 的原義就糢糊了。而且 font 原本代表的「鉛字」如今已不一定會被鑄造，字體設計也可以經由各種方式直接或間接呈現在紙張上。

再由於電腦中太常使用到 font 來稱呼一款字體設計，typeface 和 font 的意義分野便逐漸糢糊了。

於是，font 的意義逐漸轉爲「typeface 的具體實現」。一樣以金萱爲例，「金萱」是一款 typeface，而「金萱一分糖」是它的 font，且「金萱一分糖」不再限定某種大小，可隨時調整尺寸。

當然，實際情況有可能更複雜一些，例如 Garamond 系列有不止一種 typeface：

- ITC Garamond
    + ITC Garamond Bold Condensed Italic
    + ITC Garamond Condensed Italic
    + ITC Garamond Bold Condensed
- Adobe Garamond
- Monotype Garamond
- EB Garamond

其中，「ITC Garamond Bold Condensed Italic （粗體、緊縮、義大利體版本）」與「ITC Garamond Condensed Italic」和「ITC Garamond Bold Condensed」同屬於「ITC Garamond」這個 typeface（字體），但分別爲不同 font（字型）。[^1]


## Glyph

延續上述，一個 typeface（字體）是由一個或多個 font（字型）組成的集合。而每個字型又由具有共同設計特徵的 glyph（字形）組成，字形（glyph）爲單個字（字母、漢字、符號等等）的形體。

對於名詞有了基礎理解之後，我們可以聚焦回到本文主題—— Variable Fonts 是什麼？它可以解決什麼問題？


## 現行字型檔（Static Fonts）缺點

> Before variable fonts, each style was implemented as a separate font file. With variable fonts, all styles can be contained in a single file.
> — <cite>https://web.dev/variable-fonts/</cite>

相對於 Variable Fonts，我們可以將現行字型檔稱作 Static Fonts。

一個網頁若要像紙本排版一樣，滿足比較複雜的文字樣式，可能會需要有 regular、italic、以及多個字重（weight）甚至字寬（width）的要求。在 Static Fonts 的限制下，不可避免的會需要載入多個字型檔（多個 fonts）。在瀏覽器中載入多個字型檔有以下缺點：

- 額外網路傳輸
- 增加頁面渲染時間
- [FOIT / FOUT](https://www.zachleat.com/web/fout-vs-foit/)

正由於 Static Fonts 在 web 環境上有以上缺點，Variable Fonts 誕生了。


## Variable Fonts (OpenType Font Variations)

> allows a single file to contain all of those previously separate files in a single, highly efficient one
> — <cite>Jason Pamental</cite>

爲了減少上述 Static Fonts 造成的不良影響，Variable Fonts 的核心概念是將多種設計樣式（多種 axis）放入同一個檔案中。例如一個 Variable Fonts 可像平常指定字級（font-size）一樣，隨時調整字重（weight）、字寬（width）、義大利體（italic）、傾斜程度（slant）、視覺尺寸（optical size）等 5 種 axis 設定，除了以上預先註冊 axis，甚至還可以依設計師的需求定義額外的設定。

可能有人會問，同一個檔案放入那麼多設定，會比較有效率嗎？答案是會，雖然單一檔案會變大，但仍然小於分別載入的大小加總。且由於 Variable Fonts 的彈性，工程師更可以利用它作出 Static Fonts 無法或難以作出的效果。


## Variable Fonts 的特徵

以下條列出 Variable Fonts 的特徵：

- 檔名爲 `*-VF.woff2`
- 格式（CSS format）
  - `woff2-variations`
  - `woff-variations`
  - `truetype-variations`
- 可經由 CSS property: `font-variation-settings` 改變 variation axis
- [5 種預先註冊的 axes](https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg#registered-axis-tags)
  - 字重：[wght (weight)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#weight)
  - 字寬：[wdth (width)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#width)
  - 義大利體：[ital (italic)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#italic)
  - 傾斜：[slnt (slant)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#slant)
  - 視覺尺寸[^2]：[opsz (optical size)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#optical_size)
- 自訂的 axes
  - 任何 4 個字母的 tag（隨設計師設計）


## Variable Fonts 使用方式

> Talk is cheap. show me the code.
> — <cite>Linus Torvalds</cite>

說了這麼多，該怎麼使用呢？直接使用既有語法 `@font-face` 即可，底下以 Roboto 爲例[^3]，爲了向後相容，我們可利用 `@supports` 判斷瀏覽器是否支援：

```scss
// Set up Roboto for old browsers, only regular + bold
@font-face {
  font-family: Roboto;
  src: url('Roboto-Regular.woff2');
  font-weight: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Bold.woff2');
  font-weight: bold;
}

body {
  font-family: Roboto;
}

.super-bold {
  font-weight: bold;
}

// Set up Roboto for modern browsers, all weights
@supports (font-variation-settings: normal) {
  @font-face {
    font-family: 'Roboto';
    src: url('RobotoFlex-VF.woff2') format('woff2 supports variations'),
         url('RobotoFlex-VF.woff2') format('woff2-variations');
    font-weight: 100 1000;
    font-stretch: 25% 151%;
  }

  .super-bold {
    // 你沒看錯，Roboto Flex 的字重最高可以到 1000，而且是無段調整
    font-weight: 1000;
  }
}
```

如果好奇上面說的 font-weight 無段調整，這邊有 [Roboto Flex 改變 weight 的 demo 影片](https://storage.googleapis.com/web-dev-assets/variable-fonts/roboto-flex-weight.mp4)

引入 font-face 之後，就可以來使用啦，語法很簡單：

```scss
// 語法格式 font-variation-settings: [axis] [value];
.text {
  // 和 font-weight: 375 效果相同
  font-variation-settings: 'wght' 375;
}

.grade-light {
  // GRAD (grade) 是 Roboto Flex 定義的 custom axis，可在不改變寬度的前提下調整字重
  // custom axis 總是使用 4 個大寫英文字母表示
  font-variation-settings: 'GRAD' -1;
}

.grade-normal {
  font-variation-settings: 'GRAD' 0;
}

.grade-heavy {
  font-variation-settings: 'GRAD' 1;
}
```

這裡特別提一下 CSS 權重，要注意的是 `font-variation-settings` 權重較大，盡量不要混用，如果有混用時要小心：

```scss
.text {
  font-variation-settings: 'wght' 500; // 這行權重大於 font-weight，所以結果會等於 font-weight: 500
  font-weight: 375;
}
```

## Variable Fonts 支援度

網頁工程師被瀏覽器支援度坑久了，研究新技術時都會怕怕的。還好，除了 IE 以外，主流瀏覽器都已經支援 Variable Fonts，我們不用再等幾年，現在就可以開始用了。

- https://caniuse.com/variable-fonts
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#using_a_variable_font_font-face_changes


## 一些很<s>實用</s>潮的 Demo
- [codepen: 馬](https://codepen.io/lorp/pen/PRdNYq)


## 一些很實用的 Playground 與工具
- [What Can My Font Do?](https://wakamaifondue.com/beta/)
- [Axis Praxis](https://www.axis-praxis.org/)
- [v-fonts.com](https://v-fonts.com)
- [Font Playground](https://play.typedetail.com/)


## 參考資料

- [Wikipedia: 字體](https://zh.wikipedia.org/wiki/%E5%AD%97%E4%BD%93)
- [英语术语「typeface」和「font」的区别是什么？](https://www.zhihu.com/question/19566628)
- [Microsoft Open Type Variations Introduction](https://docs.microsoft.com/en-us/typography/opentype/spec/otvaroverview)
- [Introduction to variable fonts on the web](https://web.dev/variable-fonts/)
- [An Introduction to Variable Fonts](https://24ways.org/2019/an-introduction-to-variable-fonts/)
- [MDN: Variable fonts guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
- [TypeNetwork: variable fonts](https://variablefonts.typenetwork.com/)


## 與本文無關但有趣的字體小知識

### 斜體就斜體，爲什麼要特別稱作 italic？

```css
p {
  font-style: italic;
  font-style: oblique;
}
```

oblique 與 italic 差別在於，oblique 只是將原字型（roman style）向右傾斜，而 italic 經過設計師設計，可能會使用不同的 glyph 讓排版看起來更有美感，且 italic 並不一定是傾斜的。

傳統排版中，漢字不使用斜體，斜體的排版方式是由西文帶來的。漢字絕大多數的字型都沒有相應的 italic 設計，因此斜體的呈現都是單純將字面由正方形改爲平行四邊形的「僞斜體」。（當然有例外，例如之前進行募資的「[激燃體](https://justfont.com/burnfont/)」）

我也在 codepen 做了[一個 demo](https://codepen.io/akccakcctw/pen/BaQXqmv) 來展示斜體、僞斜體的差別。

更詳細的解釋如果有興趣研究，可以參考以下資料：

- [Wikipedia: Oblique type](https://en.wikipedia.org/wiki/Oblique_type)
- [Wikipedia: 斜體](https://zh.wikipedia.org/wiki/%E6%96%9C%E4%BD%93)
- [stackoverflow: font style italic vs oblique in css](https://stackoverflow.com/a/1680673)

[^1]: Garamond 是一類西文襯線字體的總稱，也是舊襯線體的代表字體。詳參 [wiki: Garamond](https://zh.wikipedia.org/wiki/Garamond)。
[^2]: 小尺寸鉛字的細線若過細，在紙本印刷中很難印上，因此這個 axis 最初是爲了在紙本印刷中提供視覺補償，以確保小尺寸文字的可讀性。
[^3]: Roboto 是 Google 在 2011 年爲 android 系統特別設計的無襯線字體，Google 描述其爲「現代的，但平易近人（modern, yet approachable）」和「有感情的（emotional）」，2013 年開始，Google 相關服務預設都使用 Roboto。[Roboto Flex 專案](https://github.com/TypeNetwork/Roboto-Flex)。

