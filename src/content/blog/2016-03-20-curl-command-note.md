---
title: "cURL指令備忘"
date: "2016-03-20T15:59:00"
categories:
  - command-line
---

## 一般用法
```sh
# 顯示網頁原始碼
curl http://sample.xxx/

# 將網頁內容輸出為sample.html
curl -o sample.html http://sample.xxx/

# 同上，但輸出時維持原檔名
curl -O http://sample.xxx

# 用來下載檔案也沒問題
curl -O http://sample.xxx/image/image001.jpg

# 批次下載檔名連續圖片
curl -O http://sample.xxx/image/image[001-100].jpg
```

## 進階用法
```sh
# 批次下載檔名連續圖片
curl -O http://sample.xxx/image/{a,b}[001-100].jpg

# 使用指定帳密上傳檔案
curl -T localfile -u name:passwd ftp://upload_site:port/path/
```

`-o`：輸出檔名
`-O`：輸出為原檔名
`-x`：指定proxy
`-i`：取得header
`-H`：指定header
`-v`：顯示處理過程
`-D`：輸出cookie
`-b`：指定cookie
`-A`：指定user-agent資訊
`-e`：指定referrer

## 參考資料：
[https://curl.haxx.se/docs/manpage.html](https://curl.haxx.se/docs/manpage.html)
