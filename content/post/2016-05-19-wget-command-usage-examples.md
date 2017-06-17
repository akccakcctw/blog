---
title: "Wget 指令用途與範例"
date: "2016-05-19T07:46:00"
categories: ["wget", "command-line", "download"]
---

## 範例用法
```bash
#下載指定url
wget http://sample.xxx/ 

#將指定url輸出為指定檔案
wget http://sample.xxx/sample.html -O test.html

#下載全站
wget -r http://sample.xxx/

#下載全站（進階版）
wget -t0 -c -nH -np -m -P /targetdir http://sample.xxx/ 

#確認bookmarks.html內連結狀況，但不下載頁面
wget --spider -F -i bookmarks.html

#確認bookmarks.html內連結狀況，並輸出至wget.log
wget --spider -o wget.log -F -i bookmarks.html 
```

## 工具相關
- `-h`, `--help`：說明
- `-V`, `--version`：版本
- `-b`, `--background`：背景作業
- `-e [command]`, `--execute=[command]`：執行 .wgetrc 形式的指令

## LOG 訊息相關
- `-o [logfile]`, `--output-file=[logfile]`：將記錄訊息寫入 logfile 檔案
- `-a [logfile]`, `--append-output=[logfile]`：將記錄訊息寫入 logfile 檔案末端
- `-q`, `--quite`：安靜模式
- `-v`, `--verbose`：詳細輸出模式（預設使用）
- `-nv`, `--non-verbose`：關閉詳細輸出模式（但不啟用安靜模式）

## Input 相關
- `-i [file]`：下載 file 檔案內的 URL（支援 local 與 external）
- `-F`, `--force-html`：將此檔案視為 HTML
- `-B [url]`, `--base=[url]`

## 下載相關
- `-O`, `--output-document=[file]`：將資料輸出指定檔案
- `-t [num]`, `--tries=[num]`：設定重試次數。當連結中斷或超時，試圖重新連結（`-t0`表示重試無限次數）
- `--retry-connrefused`：即使被拒絕仍重試
- `-c`, `--continue`：續傳功能
- `-r`, `--recursive`：遞迴下載
- `-l [num]`, `--level=[num]`：最大搜尋深度（`-l0`表示無限）
- `-nd`, `--no-directories`：不建立目錄
- `-nc`, `--no-clobber`：不覆寫已存在的檔案
- `-np`, `--no-parent`：不進入上層目錄
- `-nH`, `--no-host-directories`：不建立網站名稱目錄，直接在當前目錄建立
- `-N`, `--timestamping`：當遠端檔案比較新才下載
- `-m`, `--mirror`：鏡像下載（等同於`-N -r -l inf --no-remove-listing`）
- `-p`, `--page-requisites`：下載所有顯示網頁所需的檔案（如圖片）
- `-P`, `--directory-prefix=[dir]`：下載到本機的指定目錄
- `-w [seconds]`, `--wait=[seconds]`：下載每個檔案前等待秒數
- `--random-wait`：隨機等待秒數
- `--spider`：不下載資料，僅確認連結

## HTTP 相關
- `--http-user=[user]`
- `--http-passwd=[passwd]`
- `--default-page=[name]`：指定預設頁面（預設`index.html`）
- `--no-cache`：不使用快取
- `-U`, `--user-agent=[agent]`：宣稱為 agent，而不是 Wget/version
- `-S`, `--server-response`：顯示伺服器回應訊息
- `--header=[string]`：在標頭加入字串
- `--referer=[url]`：設定`Referer:url`標頭
- `--no-http-keep-alive`
- `--no-cookies`
- `--load-cookies=[file]`：由指定檔案載入 cookie
- `--save-cookies=[file]`：結束後將 cookie 存入指定檔案
- `--keep-session-cookies`：載入與儲存暫時性的 cookie
- `--post-data=[string]`：使用 POST 方式送出字串
- `--post=file=[file]`：使用 POST 方式送出檔案內容

## 額外選項
- `-A`, `--accept=[list]`：接受的檔案格式（以逗號分隔）
- `-R`, `--reject=[list]`：排除的檔案格式（以逗號分隔）
- `-D`, `--domains=[list]`：接受的網域（以逗號分隔）
- `-L`, `--relative`：只跟隨相對連結
- `-T [seconds]`：超時等待時間
- `-Q [quota]`, `--quota=[size]`：設定下載限制大小（例`-Q2m`）
- `--limit-rate=[rate]`：限制下載速度
- `--limit-rate=[num]k`：限制下載速度上限

## 參考資料
- [wget Manual](https://www.gnu.org/software/wget/manual/wget.html)
- [wget command examples](http://www.labnol.org/software/wget-command-examples/28750/)
- [http://www.ewdna.com/2012/04/wget.html](http://www.ewdna.com/2012/04/wget.html)
