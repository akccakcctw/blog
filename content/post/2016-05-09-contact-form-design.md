---
title: "contact 表單設計"
date: "2016-05-09T07:19:00"
categories: ["CSS", "Form", "表單"]
---

上週逛 awwwards，看到[這個網站](http://www.giantstepsmedias.com/contact)的表單設計得不錯，手癢也來仿作了一個。

利用 Javascript，我在使用者輸入資料後（偵測到`oninput`事件時），動態加上`value`的`attribute`，並且配合 CSS（`input[value]:invalid`），來判斷使用者輸入的資料是否符合規則，如果不符合規則可以及時反應（字變紅），減少使用者輸入表單的難度。

以下提供程式碼：
<p data-height="500" data-theme-id="0" data-slug-hash="oxQzdM" data-default-tab="css,result" data-user="akccakcctw" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/akccakcctw/pen/oxQzdM/">Simple input box design</a> by Rex Tsou (<a href="http://codepen.io/akccakcctw">@akccakcctw</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

HTML
```html
<form action="#" class="form-container" method="post">
  <div class="input-container">
    <input id="name" name="name" type="text" required>
    <label for="name">name</label>
  </div>
  <div class="input-container">
    <input id="email" name="email" type="email" required>
    <label for="name">email</label>
  </div>
  <div class="input-container">
    <textarea id="massage" name="massage" cols="20" rows="5" required></textarea>
    <label for="name">massage</label>
  </div>
  <div id="sent-container" class="input-container sent-wrap">
    <input id="sent" type="submit" value="SENT">
  </div>
</form>
```

CSS
```css
@mixin trans-time($time:0.5s){
  transition: all $time cubic-bezier(0.2, 0.8, 0.25, 1 );
}
%sent-hover{
  cursor: pointer;
  @include trans-time(1s);
}
*{
    outline: none;
}

html,
body {
    height: 100%;
    margin: 0;
} 

body {
    background: black;
    color: white;
    font-family: monospace;
}   
.form-container {
    margin: 30px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
    
.input-container {
    position: relative;
    margin-top: 2em;
    width: 250px;
}
input,
textarea {
    position: relative;
    width: 100%;
    padding: 6px 0;
    line-height: 160%;
    font-size: 14px;
    background: none;
    color: white;
    border: none;
    border-bottom: 1px solid #aaa;
    }

label {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    line-height: 14px;
    padding: 6px 0;
    text-transform: uppercase;
    @include trans-time(0.5s);
}

input:focus+label,
input:valid+label,
textarea:focus+label,
textarea:valid+label {
    transform: translateX(-4.5em);
    opacity: 0.5;
}

input[value]:invalid+label,
textarea[value]:invalid+label{
  color:red;
  transform: translateX(-4.5em);
  opacity:0.5;
}

.sent-wrap{
    @extend %sent-hover;
    #sent{
        @extend %sent-hover;
        z-index: 2;
    }
    &:after{
        content: "CLICK!";
        line-height: 34px;
        position: absolute;
        text-align: center;
        color: black;
        opacity: 0;
        top: 0;
        left: 0;
        height: 100%;
        background: white;
        @include trans-time(0.5s);
        width: 100%;
    
    }
    &:hover{
        #sent{
           opacity: 0;
        }
        &:after{
           opacity: 1;
        }
      }
}
```

JS
```js
$("input, textarea").on('input',function(){
  this.setAttribute('value', this.value);
});
```

## 參考資料
- [http://www.hksilicon.com/articles/102795](http://www.hksilicon.com/articles/102795)
- [http://www.giantstepsmedias.com/contact](http://www.hksilicon.com/articles/102795)
