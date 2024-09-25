---
title: Use tracepath to Analyze Network Latency to the Server
date: 2024-09-25T13:45:12.607Z
---

`tracepath` 通常在大多數 Linux 發行版上都可用，因為它是屬於 `iputils` 套件的一部分。可以用來顯示從你的電腦到目標伺服器之間的網絡路徑，並測量每一跳的延遲時間。用來排查網絡連線問題，幫助找到網絡瓶頸或延遲的節點。

基本用法：

```sh
tracepath <URL_OR_IP>
```

例如

```sh
tracepath google.com
```

會顯示從你的電腦到 google.com 之間的每個網絡節點，以及每一跳的延遲時間。