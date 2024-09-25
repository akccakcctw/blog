---
title: Use `dig` to Retrieve Server Information for a Domain
date: 2024-09-25T13:36:03.489Z
---

想要知道一個 domain 的 DNS 資訊，可以使用 `dig` 來達成

```sh
# 語法
dig <DOMAIN>
```

例如

```sh
dig google.com
```

會顯示 `google.com` 的 DNS 記錄，包括 IP 和相關資訊

進階用法
```sh
dig +short <DOMAIN> # 只顯示簡短的結果
dig <DOMAIN> ANY # 查詢 domain 的所有 DNS 記錄
dig <DOMAIN> MX # 查詢 domain 的郵件伺服器
```