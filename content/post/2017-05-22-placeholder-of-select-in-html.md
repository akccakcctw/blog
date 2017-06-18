---
title: "HTML select 的 placeholder 寫法"
date: "2017-05-22T07:17:00"
draft: true
categories: ["HTML"]
---

假如我有一個`select`表單，該如何讓它預設顯示`placeholder`呢？（這個預設值僅為提示用，不是選項之一）

可以這樣寫：

```html
<select>
    <option value="" disabled selected>請選擇</option>
    <option value="a">a</option>
    <option value="b">b</option>
</select>
```

如此一來，就會預設選在「請選擇」的位置，且user不能選這個選項

## 參考資料：
- [How do I make a placeholder for a 'select' box?](http://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box)

- [Can I apply the required attribute to `<select>` fields in HTML5?](http://stackoverflow.com/questions/6048710/can-i-apply-the-required-attribute-to-select-fields-in-html5/6048891#6048891)
