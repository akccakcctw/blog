---
title: "使用 Cloudflare Email Routing 設定屬於自己的電子郵件"
date: 2022-08-02T01:20:57+08:00
draft: false
categories:
tags:
description: ""
lastmod: 2022-08-02T01:20:57+08:00
---

之前花了一點時間研究 email，發現要自己架 mail server 收發信其實滿困難的，因為現在大部分人都使用 Gmail、Hotmail 等電子郵件服務。由於廣告郵件氾濫，這些服務提供者也逐漸嚴格，如果是自己架 mail server，有很大機會被這些郵件服務擋住或者寄到垃圾郵件裡面。

後來發現一直在使用的 Cloudflare 就有提供 email routing 方案，這個方案是免費的，只要有自己的網域，稍微設定一下就可以讓自己的 email 看起來更專業，而且後續維護成本很低！


## DNS 指向 Cloudflare

如果你還未使用過 Cloudflare，需要先將網域的 DNS 指向 Cloudflare，才有辦法使用 Cloudflare 的 DNS 設定後臺，我自己的網域是在 [namecheap](https://www.namecheap.com/) 購買的，設定方式可以[參考這篇文章](https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-cloudflare-account/)，或者也可以直接[參考 Cloudflare 的說明](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)。

然後，你就可以[在後臺設定 email routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/) 了，Cloudflare 會幫我們設定好一些預設值，不過有些設定還需要調整一下。


## Cloudflare Email Routing（電子郵件路由）

簡單來說就是轉信服務，利用 Cloudflare 設定好 `MX`、`TXT` 等 DNS 記錄，就可以將寄到自己網域的信件轉到其他信箱，也可以使用自己擁有的網域當做寄件人，而不再是像 `@gmail.com` 這種免費信箱。

目前 Cloudflare Email Routing 還在 beta 階段，但設定方式短期內應該不會變化太大。

{{<tip>}}
[What is a DNS MX record?](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/)
{{</tip>}}

## 調整 Cloudflare DNS 設定

### 調整 SPF record

```
v=spf1 a mx include:_spf.google.com include:_spf.mx.cloudflare.net  ~all
```

{{<tip>}}
[什麼是 DNS SPF 記錄？](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-spf-record/)

發送方原則框架（SPF, Sender Policy Framework）記錄是一種 DNS TXT 記錄，其中列出所有獲得授權從特定網域發送電子郵件的伺服器。
{{</tip>}}


### 調整 DMARC record

```
v=DMARC1; p=none; rua=mailto:you@example.com; aspf=r;
```

{{<tip>}}
[What is a DNS DMARC record?](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-dmarc-record/)

DMARC (Domain-based Message Authentication Reporting and Conformance) is an important part of email security. DMARC policies are stored within DNS TXT records.

DMARC is a method of authenticating email messages. A DMARC policy tells a receiving email server what to do after checking a domain's Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records, which are additional email authentication methods.
{{</tip>}}

### Email Route

在 Cloudflare 左側選單找到 Email 選項，點進去就可以設定 email route，我們將 `you@example.com` 的信，設定爲寄到你平常使用的 gmail 信箱（例如 `you@gmail.com`）即可。


## Gmail 設定

### 產生 app password

由於 gmail 新增寄件人需要設定 SMTP server，我們得產生一個 app password 來讓它使用。

前往 https://myaccount.google.com/apppasswords，應用程式選「郵件」、裝置選「其他」，並給他一個好記的名稱。把產生的密碼複製起來待會使用。

### 將 email 新增至「選擇寄件地址」

打開 [gmail 設定](https://mail.google.com/mail/u/0/#settings/accounts)，找到「選擇寄件地址」欄位，點擊「新增另一個電子郵件地址」。

- 「`名稱`」是收信時其他人會看見的，輸入希望別人看到的名稱
- 不要勾選「`視爲別名`」
- 點開「`指定不同的 [回覆至] 地址`」。
- 「`電子郵件地址`」及「`回覆地址`」輸入要設定的信箱 `you@example.com`

接着按下一步

- 「`SMTP Server`」輸入 `smtp.gmail.com`，「`Port`」選擇 `587`
- 「`Username`」使用你原本 gmail 信箱的帳號
- 「`Password`」使用上面產生的 app password


## 大功告成

如果上面的步驟都有正常設定，到這一步就設定好了！在寄信或者回覆郵件時，只要點擊寄信者，就會出現列表讓你選擇剛剛設定好的信箱囉！


## 參考資料

- [Cloudflare: 使用 Cloudflare 電子郵件路由輕鬆創建和路由電子郵寄地址](https://blog.cloudflare.com/zh-tw/introducing-email-routing-zh-tw/)
- [Back in 5 mins: Use a basic Gmail account to "Send mail as" with a domain that uses Cloudflare email routing](https://jay.gooby.org/2022/05/06/use-a-basic-gmail-account-to-send-mail-as-with-a-domain-that-uses-cloudflare-email-routing)
- [Google Cloud Help: I need to set up SPF for my domain](https://support.google.com/googlecloud/answer/10536773#zippy=%2Cbefore-you-begin%2Cset-up-spf-for-your-domain)

