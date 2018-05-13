---
title: "HTML tag 速查表"
date: "2016-05-19T04:15:00"
categories:
  - HTML5
  - cheatsheet
---

## Main
| Tag      | English       | 中文語義     |
|----------|---------------|--------------|
| !DOCTYPE | document type | 宣告文件類型 |
| html     | html root     | HTML 根元素  |
| `!-- --` | html comment  | HTML 注釋    |

## Metadata
| Tag   | English | 中文語義           |
|-------|---------|--------------------|
| head  | head    | HTML metadata      |
| title | title   | HTML 標題          |
| base  | base    | 定義相對 URL       |
| link  | link    | 外部匯入 JS 或 CSS |
| meta  | meta    | 定義其他 metadata  |
| style | style   | 樣式               |


## script
| Tag      | English   | 中文語義                       |
|----------|-----------|--------------------------------|
| script   | script    | JS 腳本                        |
| noscript | no script | 無法使用 JS 時的替代文字       |
| template | template  | 通過 JS 執行時實例化內容的容器 |


## 章節
| Tag     | English       | 中文語義       |
|---------|---------------|----------------|
| body    | body          | HTML 內容      |
| section | section       | 章節           |
| nav     | navigation    | 導覽           |
| header  | header        | 頁面或章節頭部 |
| footer  | footer        | 頁面或章節尾部 |
| main    | main          | 主要內容       |
| article | article       | 獨立內容       |
| aside   | aside         | 內容之外資訊   |
| h1-h6   | header 1 to 6 | 標題 1 到 6    |
| address | address       | 聯絡方式       |


## 內容
| Tag        | English                | 中文語義     |
|------------|------------------------|--------------|
| p          | paragraph              | 段落         |
| hr         | horizontal rule        | 章節分隔符   |
| figure     | figure                 | 獨立內容     |
| figcaption | figure caption         | 獨立內容說明 |
| quote      | quotation              | 引用         |
| blockquote | block quotation        | 區塊引用     |
| ol         | ordered list           | 有序列表     |
| ul         | unordered list         | 無序列表     |
| li         | list item              | 列表項目     |
| dl         | definition list        | 定義列表     |
| dt         | defintion term         | 定義術語     |
| dd         | definition description | 定義描述     |
| pre        | preformatted           | 預定義格式   |


## 形式
| Tag    | English                | 中文語義                |
|--------|------------------------|-------------------------|
| div    | division               | 通用分隔符              |
| span   | span                   | 通用文字                |
| a      | anchor                 | 錨點                    |
| strong | strong                 | 加重（表重點）          |
| em     | emphasized             | 強調（表強調）          |
| small  | small                  | 變小                    |
| cite   | citation               | 作品標題或URL           |
| abbr   | abbreviation           | 縮寫                    |
| b      | bold                   | 粗體                    |
| i      | italic                 | 斜體                    |
| u      | underlined             | 底線                    |
| s      | strike through         | 刪除線                  |
| sup    | superscripted          | 上標                    |
| sub    | subscripted            | 下標                    |
| code   | code                   | 代碼                    |
| var    | variable               | 變數                    |
| samp   | sample                 | 代碼輸出                |
| mark   | mark                   | 重點標示                |
| ruby   | ruby                   | Ruby 注釋（或注音）標記 |
| rp     | ruby parenthesis       | Ruby 注釋的額外插入     |
| rt     | ruby text              | Ruby 注釋               |
| rtc    | ruby text container    | Ruby 注釋容器           |
| bdi    | bidirectional          | 嵌入未知方向文字        |
| bdo    | bidirectional override | 覆蓋默認方向            |
| time   | time                   | 表日期與時間            |
| data   | data                   | 機器可讀內容            |
| dfn    | define                 | 定義                    |
| kbd    | keyboard               | 鍵盤輸出                |
| br     | break                  | 換行                    |
| wbr    | word break opportunity | 建議換行                |


## 編輯
| Tag      | English   | 中文語義       |
|----------|-----------|----------------|
| del      | deleted   | 刪除（表移除） |
| ins      | inserted  | 插入（表修正） |


## 嵌入
| Tag    | English                  | 中文語義                  |
|--------|--------------------------|---------------------------|
| img    | image                    | 圖片                      |
| canvas | canvas                   | 繪圖區域                  |
| svg    | scalable vector graphics | 向量圖                    |
| iframe | inline frame             | 內聯框架                  |
| embed  | embed                    | 嵌入外部資源              |
| object | object                   | 物件（表外部資源）        |
| param  | parameter                | 參數（object 所指定物件） |
| math   | math                     | 數學公式                  |


## 多媒體
| Tag    | English | 中文語義                         |
|--------|---------|----------------------------------|
| map    | map     | 與 area 共同定義圖形區域         |
| area   | area    | 與 map 共同定義圖形區域          |
| video  | video   | 影片及字幕                       |
| audio  | audio   | 音訊                             |
| source | source  | 來源（指定 video 或 audio 來源） |
| track  | track   | 軌道（指定 video 或 audio 字幕） |


## 表格
| Tag      | English         | 中文語義    |
|----------|-----------------|-------------|
| table    | fieldset        | 控件組      |
| tbody    | table body      | 表格主體    |
| thead    | table head      | 表頭        |
| tfoot    | table foot      | 表尾        |
| tr       | tabel row       | 行          |
| col      | column          | 列          |
| colgroup | column group    | 單列或多列  |
| td       | table cell      | 表格單元    |
| th       | table cell head | 表格單元頭  |
| caption  | caption         | 標題        |


## 表單
| Tag      | English      | 中文語義       |
|----------|--------------|----------------|
| form     | form         | 表單           |
| label    | label        | 控件標題       |
| input    | input        | 表單輸入區     |
| button   | button       | 按鈕           |
| select   | select       | 下拉選擇       |
| datalist | data list    | 預定義選項     |
| option   | option       | 選項           |
| optgroup | option group | 選項分組       |
| textarea | text area    | 多行文字輸入區 |
| output   | output       | 計算值         |
| progress | progress     | 進度           |
| meter    | meter        | 滑動條         |
| fieldset | fieldset     | 控件組         |
| legend   | legend       | 圖標           |


## 互動元素
| Tag      | English   | 中文語義               |
|----------|-----------|------------------------|
| dialog   | dialog    | 對話框                 |
| datails  | details   | 細節（獲取額外訊息）   |
| summary  | summary   | 摘要（details 的摘要） |
| menu     | menu      | 選單                   |
| menuitem | menu item | 選單項目               |


## 已棄用（請避免使用）
| Tag      | English        | 中文語義    |
|----------|----------------|-------------|
| acronym  | acronym        | 首字母縮寫  |
| font     | font           | 字型        |
| center   | center         | 置中        |
| big      | big            | 變大        |
| keygen   | key generation | 密鑰生成    |

## 參考資料
- [Mozilla Developer: Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
