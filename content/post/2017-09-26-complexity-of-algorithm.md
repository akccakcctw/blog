---
date: 2017-09-26T11:10:26+08:00
title: 算法複雜度筆記
categories:
  - Algorithm
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
<style scoped>
.MJXc-display{
  display: inline-block;
  margin: 0;
  padding: 0 .5em;
}
</style>

## 資源
- 時間：需要經過多少步演算才能解決問題
- 空間：解決問題時需要多少記憶體

時間和空間是最重要的兩項資源。

以時間 T 為例，如果輸入的資料長度 n 作為變數，我們關注的是時間與資料之間的函數關係 T(n) ，同一算法在不同計算模型實現時可能會有常數因子的差別，因此我們使用 Big O 表達式來表示 T(n)，可以忽略常數因子。

## Big O
Big O 又可稱為 Landau symbol，最初是大寫的希臘字母 Θ（Omicron），現在用的是英文大寫 O，用來表達「無窮大漸進」。

比如說，解決規模為 n 的問題所需要的時間為<span>$$ T(n) = n^2 + n + 2 $$</span>，當 n 逐漸增加，其他各項的影響可以忽略，因此 Big O 表達式可以記為<span>$$ T(n) ∈ O(n^2) $$</span>，或是<span>$$ T(n) = O(n^2) $$</span>，我們可以說此算法有<span>$$ n^2 $$</span>的時間複雜度。

此外，Big O 也可以用來描述誤差（無窮小漸進），例如泰勒展開式<span>$$ e^x = 1 + x + {x^2 \over 2} + O(x^3) $$</span>，當 x 趨近於 0，誤差的絕對值小於 <span>$$ x^3 $$</span>的某一常數倍。


## 常數時間 <span>$$ O(1) $$</span>
所需時間與資料大小無關，例如存取陣列中的單個元素。

## 對數時間 <span>$$ O(\log n) $$</span>
由於電腦以 2 進位，對數經常以 2 為底，例如二分搜尋法。

## 線性時間 <span>$$  O(n) $$</span>
所需時間與輸入資料的大小成正比，某些數學認為無法在標準計算模型下達到線性時間的算法，可以利用平行運算架構來達成。
須依賴全部輸入內容才能得解的問題，它最少也得要線性時間才能得解，因為它至少得花線性時間來讀取資料。

## 線性對數時間 <span>$$  O(n\log n) $$</span>

## 多項式時間 <span>$$ O(n^m) $$</span>
傳統計算機只能解決多項式時間內的難題，有些密碼學原理便是依此發展，例如非對稱加密（[公開金鑰加密法](https://zh.wikipedia.org/zh-tw/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)），就是利用對大數作質因數分解的時間複雜度，提供加密內容可靠的保護。

延伸資料可以參考[P/NP問題](https://zh.wikipedia.org/wiki/P/NP%E9%97%AE%E9%A2%98)。

## 指數時間 <span>$$ O(m^n) $$</span>
所需時間隨著資料大小呈指數成長。

## 階乘時間 <span>$$ O(n!) $$</span>
例如[旅行推銷員問題](https://zh.wikipedia.org/wiki/%E6%97%85%E8%A1%8C%E6%8E%A8%E9%94%80%E5%91%98%E9%97%AE%E9%A2%98)，假設有 n 個城鎮，推銷員希望找出「可以通過每個城鎮的最短旅行路徑」，要找出來，必須窮舉所有可能的路線：

| n | 可能性 | 所需時間 |
| --- | --- | --- |
| 3 | 3 | <span>$$ {2 \times 3} \over 2 $$</span> |
| 4 | 12 | <span>$$ {2 \times 3 \times 4} \over 2 $$</span> |
| 5 | 60 | <span>$$ {2 \times 3 \times 5 \times 5} \over 2 $$</span> |
| 6 | 360 | <span>$$ {2 \times 3 \times 4 \times 5 \times 6} \over 2 $$</span> |


## 參考資料
[維基百科：大O符號](https://zh.wikipedia.org/wiki/%E5%A4%A7O%E7%AC%A6%E5%8F%B7)

[維基百科：計算複雜性理論](https://zh.wikipedia.org/wiki/Category:%E8%A8%88%E7%AE%97%E8%A4%87%E9%9B%9C%E6%80%A7%E7%90%86%E8%AB%96)

[維基百科：RSA加密演算法](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)

[stackoverflow: What is a plain English explanation of "Big O" notation?](https://stackoverflow.com/questions/487258/what-is-a-plain-english-explanation-of-big-o-notation/487278#487278)
（[中文翻譯](http://blog.jobbole.com/55184/)）
