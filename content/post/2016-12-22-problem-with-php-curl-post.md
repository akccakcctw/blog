---
title: "$_POST 介接訂房系統 API 遇到的問題"
date: "2016-12-22T08:02:00"
categories: ["PHP", "form", "POST", "cURL"]
---

最近製作某飯店集團網站，其中有個功能需要在網站內提供線上訂房的表單，當使用者選擇分館、入住日期、離開日期之後，按下快速訂房按鈕就直接查詢訂房系統（其他系統商），如圖：

![sp161222_151426.png](http://user-image.logdown.io/user/14750/blog/13947/post/1234234/kPPq3MHsQoKtY3lRv07K_sp161222_151426.png)

對方的 API 必須使用`POST`，不能用`GET`，一開始想法很簡單，覺得直接用 PHP 的`curl`就可以了吧，於是我這樣寫：

```php
// index.php

<form id="booking-form" action="booking.php" method="post" target="_blank">
<!-- 裡面省略 -->
</form>

```


```php
// booking.php

$postData = array(
  "syear"=>$syear,
  "smonth"=>$smonth,
  "sday"=>$sday,
  "eyear"=>$eyear,
  "emonth"=>$emonth,
  "eday"=>$eday,
  "hid"=>$hid,
  "orcnt"=>$orcnt,
  "lang"=>$lang,
);

// cURL POST
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $toUrl);
curl_setopt($ch, CURLOPT_POST, true); // 啟用POST
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData)); 
curl_exec($ch); 
curl_close($ch);

```

當我按下查詢鍵，嗯～對方的網頁內容看起來都回傳成功了，而且網址還是我們的，看起來很專業！館別、語系、時間、blahblah......都對了，咦，圖片怎麼全是叉燒包，看一下 F12，嗯～應該是相對路徑的問題，因為網址還是我們的，他們回傳的路徑應該要改成絕對路徑才對。

於是我滿心歡喜的去找 PM，請系統商把網址都改成絕對路徑，過了不久，系統商來信說把圖片都幫我們改成絕對路徑了（真乖），嗯～圖片都出來了。就在這個 moment，當我覺得一切都沒問題的時候，我才發現事情不是我想的那麼單純，因為當我想在回傳的頁面（此時網址是我們的，但內容是他們的）點任何連結時，都會有問題，因為每一個連結都是相對路徑！

OK，好，看來是我的問題。

於是我開啟「google 工程師」模式（上網到處搜尋），外加問前輩，發現只能回歸最原始的方法，用純粹的 HTML `<form>`標籤解決，解法是`<form>`必須直接 submit 到系統商那邊，所以`action`的位置要修改。但是，由於這個網站架構比較大，有訂房表單的地方不只一個，訂房相關的 code 還是統一在`booking.php`內維護比較方便，因此我不打算修改前端，而是修改`booking.php`，從後端產出一個假的`form`，並配合 Javascript submit 來解決這個問題，以下是我的解法：

```php

// booking.php

// 自動產生 form 且帶入 value 後，用 Javascript submit
$hiddenInput='';
foreach ($postData as $key => $value) {
  $hiddenInput.= <<<HTML
    <input type="hidden" name="{$key}" value="{$value}">
HTML;
}

echo <<<HTML
  <form id="booking_form" action="{$toUrl}" method="post">
    {$hiddenInput}
  </form>
  <script>
    document.getElementById('booking_form').submit();
  </script>
HTML;

```

耶，世界又恢復和平～
