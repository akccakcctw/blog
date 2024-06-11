---
title: "CSS @font-face 用法概要"
date: "2016-10-21T16:19:00"
categories:
  - CSS
  - Font
---

在CSS檔開頭用`@font-face`宣告你的自定義字型，詳細語法說明如下：

- `font-family`：定義字型名稱，可自行更改看自己喜歡
- `src`：指定資源的關鍵字，最少要有一個
- `local`：指定字型名稱。會尋找 user 的電腦，如果有相同名稱的檔案，就不用從 server 下載，建議寫，可節省時間與流量
- `url`：定義字型位置，可用絕對路徑( `http://xxx.com/font/myfont.ttf`)，或相對路徑(`font/myfont.ttf`)。
- `format`：接在`url`後面，可寫可不寫，有寫的話瀏覽器會解析得比較快

## 完整寫法：可支援很多瀏覽器
```css
@font-face {
  font-family: 'MyWebFont'; /* 定義你的字型名稱 */
  src: url('webfont.eot'); /* IE9 Compat Modes  支援IE9才需要 */
  src: local('MyWebFont'), /* 如果user電腦已經有這個字型就用local的 */
       local('MyWebFont-Bold'), /* 可以指定多個local */
       url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```

## 簡單寫法：支援大部分瀏覽器
受限於找不到那麼多種檔案格式，通常都用簡單寫法就可以了

- `woff2`：屬於比較新的格式，IE 完全不支援，找不到可省略不寫
- `woff`與`ttf`：這兩種格式至少二選一，可支援目前大部分瀏覽器

```css
@font-face {
  font-family: 'MyWebFont'; 
  src: local('MyWebFont'), 
       url('webfont.woff2') format('woff2'), /* 比較新的格式，找不到可省略 */
       url('webfont.woff') format('woff'), /* 和 ttf 至少要有一個 */
       url('webfont.ttf')  format('truetype'); /* 和 woff 至少要有一個 */
}
```

## 用法
建議還是要有`fallback`字型（隨你喜歡），與`sans-serif`在後面，避免字型檔案出問題，或者老舊瀏覽器無法解析`@font-face`時會完全看不到字：

```css
body {
  font-family: 'MyWebFont', Fallback, sans-serif;
}
```

## 備註
字型格式與副檔名的關係如下：

- WOFF：.woff，`format('woff')`
- TrueType：.ttf，`format('truetype')`
- OpenType：.ttf 或 .otf，`format('opentype')`
- Embedded OpenType：.eot，`format('eot')`
- SVG Font：.svg 或 .svgz，`fotmat('svg')`


## 參考資料
- [CSS 網頁字型 @font-face 使用教學與範例](https://blog.gtwang.org/web-development/css-font-face/)
- [Using @font-face](https://css-tricks.com/snippets/css/using-font-face/)
