---
title: "FormData 基礎用法"
date: "2017-01-06T02:53:00"
categories:
  - JavaScript
  - Form
---
## 創建 `FormData` 物件
```js
// 語法： var formData = new FormData(form);

// new 一個空的 FormData
var formData = new FormData();

// 或者從現有的 form 取得資料，並 new FormData
var formData = new FormData(document.querySelector('form'));
```

## 新增 (FormData.append)
```js
// 語法： formData.append(name, value[, filename]);

// 新增一筆 username 資料，值為 Rex
// 可以新增多個值在同一個 name 裡面
formData.append('username', 'Rex');
formData.append('username', 'Kate');

// 新增一筆 userpic 資料，內含照片檔，檔名為 'rex.jpg'
formData.append('userpic', myFileInput.files[0], 'rex.jpg');

// 也可使用 Blob
var content = '<a id="a"><b id="b">hey!</b></a>';
var blob = new Blob([content], {type: 'text/xml'});
formData.append('heyfile', blob);
```

## 取得 (FormData.get)
```js
// 語法： formData.get(name);
// 或取得多筆 formData.getAll(name);
 
formData.get('username'); // "Rex"
formData.getAll('username'); // ["Rex", "Kate"]
```

## 修改 (FormData.set)
```js
// 語法： formData.set(name, value[, filename]);
formData.set('username', 'Rex2');
```

## 刪除 (FormData.delete)
```js
// 語法： formData.delete(name);
formData.delete('username');
```

## POST
```js
var request = new XMLHttpRequest();
request.open('POST', 'http://xxx.xxx/xxx.php');
request.send(formData);

// 或者用 jQuery
$.ajax({
    url: 'xxx.php',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    // ... Other options like success and etc
});
```

## 參考資料
- [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
- [MDN: Using FromData Objects](https://developer.mozilla.org/zh-TW/docs/Web/API/FormData/Using_FormData_Objects)
- [How to use FormData for ajax file upload](http://stackoverflow.com/questions/21044798/how-to-use-formdata-for-ajax-file-upload)
