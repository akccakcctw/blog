---
title: "利用URL.createObjectURL方法，即時產生可下載檔案"
date: "2016-04-19T06:36:00"
categories: ["html5", "javascript"]
---

最近在看 HTML5 的一些 API，發現有不少好用的功能，剛才看到[黑暗執行緒](http://blog.darkthread.net/post-2014-03-12-html5-object-url.aspx)這篇介紹，可以利用`URL.createObjectURL`，將物件內容暫時存在瀏覽器記憶體中，並且可以產生下載連結！

馬上嘗試了一下，還挺好用的。話不多說，以下是程式碼，寫在這邊作為分享，也作為自己的備忘筆記：

<p data-height="370" data-theme-id="dark" data-slug-hash="wGXaQZ" data-default-tab="css,result" data-user="akccakcctw" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/akccakcctw/pen/wGXaQZ/">URL.createObjectURL demo</a> by Rex Tsou (<a href="http://codepen.io/akccakcctw">@akccakcctw</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>URL.createObjectURL demo</title>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
    <style>
    body {
        font-family: monospace;
    }
    
    #file_content,
    #file_name {
        display: block;
        background: #777;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        font-family: monospace;
        margin-bottom: 5px;
    }
    
    #create_file,
    #revoke_file {
        padding: 10px;
        border: none;
        color: #fff;
        background: #333;
        transition: 0.3s;
        cursor: pointer;
    }
    
    #create_file:hover,
    #revoke_file:hover {
        background: #777;
    }
    
    #create_file:active,
    #revoke_file:active {
        background: #000;
    }
    
    #download_link {
        padding: 10px;
    }
    
    .revoke {
        text-decoration: line-through;
        color: #f00;
    }
    </style>
</head>

<body>
<!-- 
key code:
URL.createObjectURL() 
URL.revokeObjectURL()
-->
    <textarea id="file_content" cols="30" rows="10" placeholder="file content" title="file content"></textarea>
    <input id="file_name" type="text" placeholder="file name" title="file name">
    <button id="create_file">Gen File</button>
    <button id="revoke_file">Revoke File</button>
    <a id="download_link" title="click to download"></a>
    <script>
    $(function() {
        $("#create_file").click(function() {
            $("#download_link").removeClass("revoke");
            var blob = new Blob([$("#file_content").val()], {
                type: "application/octect-stream"
            });
            var blobUrl = URL.createObjectURL(blob);
            var fileName = $("#file_name").val();

            $("#download_link").attr({
                href: blobUrl,
                download: fileName + ".txt",

            }).text(fileName + ".txt");

        });

        $("#revoke_file").click(function() {
            blobUrl = URL.revokeObjectURL($("#download_link").attr("href"));
            $("#download_link").addClass("revoke");
        })
    });
    </script>
</body>

</html>
```

## 參考資料

- [Mozilla Developer: createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
- [Mozilla Developer: revokeObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
- [黑暗執行緒：HTML5筆記–Object URL](http://blog.darkthread.net/post-2014-03-12-html5-object-url.aspx)
