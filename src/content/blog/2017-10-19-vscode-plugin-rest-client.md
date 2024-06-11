---
title: "VSCode 實用套件： REST Client"
date: 2017-10-19T12:56:26+08:00
categories:
  - Editor
tags:
  - VSCode
  - REST
description: ""
---

[REST Client: 官方載點](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

[REST Client: Github 專案](https://github.com/Huachao/vscode-restclient)

---

不多說，先直接上圖感受一下：

![rest-client-usage](https://raw.githubusercontent.com/Huachao/vscode-restclient/master/images/usage.gif)


## 簡介

> REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

REST Client 這個套件可以讓 VSCode 擁有像 [Postman](https://www.getpostman.com/) 一樣，對 server 發送`GET`、`POST`等等 HTTP 請求的能力。

除了讓你不需要離開編輯器環境之外，它的強大之處在於，可以把這些 HTTP request 預先編輯成`*.http`文件，方便重複使用，而且還能儲存 request 的歷史紀錄，如果 request 的資源是圖片的話，甚至能直接在編輯器內顯示（身為一個瀏覽器，可以顯示圖片也是很合理的（無誤））。

而且！它能夠依照你的 request 產生相對應的程式碼，非常方便。

接下來，我們需要了解一下該怎麼使用。以下使用方式說明大多數取自[官方文件](https://github.com/Huachao/vscode-restclient/blob/master/README.md)，如果習慣閱讀英文，可以直接前往閱讀。

## 使用方式

最簡單的用法，就是直接在`*.http`的檔案內（或是在編輯器右下角暫時切換 syntax language），然後輸入網址即可。例如：

```http
https://example.com/comments/1
```

然後，你會發現網址上方多了`Send Request`的文字按鈕，點擊之後會自動打開一個 tab，裡面顯示的就是 response 結果。

編輯器底下的狀態列也有這次 request 的詳細資訊，包含 Socket, DNS, TCP, First Byte 和 Download，只要把滑鼠移上圖示就可以看到詳細內容。

你也可以發送符合 [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html) 標準的 request，範例如下：

```http
POST https://example.com/comments HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

如果要在一份檔案內保留不同的 request，只要以三個或三個以上的`#`作為分隔符即可：

```http
GET https://example.com/comments/1 HTTP/1.1

###

GET https://example.com/topics/1 HTTP/1.1

###

POST https://example.com/comments HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

## 進階使用

### Query Strings

request 可以包含 query strings，而且 query strings 可以分行書寫：

```http
GET https://example.com/comments?page=2&pageSize=10

###

GET https://example.com/comments
    ?page=2
    &pageSize=10
```

### Request Headers

在 request line 之後，可以緊接著（中間無空行）自訂 header 資訊：

```http
User-Agent: rest-client
Accept-Language: en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4
Content-Type: application/json
```

### Request Body

還可以自訂 body 資訊：

```http
POST https://example.com/comments HTTP/1.1
Content-Type: application/xml
Authorization: token xxx

<request>
    <name>sample</name>
    <time>Wed, 21 Oct 2015 18:27:50 GMT</time>
</request>
```

body 資訊不一定要寫在同一份檔案內，可以引用方式添加，前方須以`< `開頭：

```http
POST https://example.com/comments HTTP/1.1
Content-Type: application/xml
Authorization: token xxx

< ./demo.xml
```

### 表單資料

有時我們需要測試表單的 POST 提交，可以用 [`multipart/form-data`](https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean) 的方式：

```http
POST https://api.example.com/user/upload
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="1.png"
Content-Type: image/png

< ./1.png
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### cURL

REST Client 還支援了 cURL request，寫法就像你在終端機裡面一樣，但請注意並非支援 cURL 的所有功能，根據官方文件，目前支援功能如下：

- -X, --request
- -L, --location, --url
- -H, --header(no @ support)
- -b, --cookie(no cookie jar file support)
- -u, --user(Basic auth support only)
- -d, --data, --data-binary

### 歷史紀錄

曾經發出的 request 會有紀錄，可以利用快捷鍵`Ctrl + Alt + H`（MAC 為`Cmd + Alt + H`）或是`F1`叫出指令列後搜尋 Request History。

### 另存 Response

![save full response](https://raw.githubusercontent.com/Huachao/vscode-restclient/master/images/response.gif)

在預覽的那個 Tab 右上角會有儲存的按鈕，按下去即可儲存。

### 產生 Code Snippet

![generate code snippet](https://raw.githubusercontent.com/Huachao/vscode-restclient/master/images/code-snippet.gif)

這個功能非常實用，可以依照欲傳送的 request 反推出各語言的程式碼。

其他還有許多更進階的功能，就請直接參照文件使用了。

---

## 參考資料

- [REST Client for VS Code, an elegant alternative to Postman](http://josephwoodward.co.uk/2017/10/rest-%20client-for-vs-code-an-elegant-alternative-postman)
