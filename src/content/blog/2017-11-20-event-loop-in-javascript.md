---
title: "Event Loop in JavaScript"
date: 2017-11-20T00:08:12+08:00
categories:
  - JavaScript
tags:
  - event loop
description: "主執行緒不斷從任務佇列中讀取事件，這個運行機制因此被稱為 Event Loop。"
---

前兩天面試被問到對於 JavaScript Event Loop 的理解，覺得自己回答得不夠好，又去查了不少資料來補強，為加深印象，決定做個筆記。


## JavaScript 是單執行緒（single thread）語言

首先，什麼是「執行緒」？節錄陳鍾誠教授對於 Thread 的[解釋](http://ccckmit.wikidot.com/thread)如下：

> 在現代的作業系統當中，如果我們將一個程式重複執行兩次，那麼這兩個程式將是毫不相關的。任何一個程式都不需要知道另一個程式是否存在，通常也不會與另一個程式進行溝通。現代的作業系統可以很容易的利用『多工』(Multitask) 機制，『同時』執行許多程式，並讓這些程式不會互相干擾，充分發揮整個電腦的 CPU 與記憶體效能，並協調程式對周邊設備的存取，讓整台電腦發揮最大的功效。

> 但是，如果我們希望兩個程式能夠互相分享某些變數，但是卻又同時執行，此時就可以利用 Thread 的機制。對於程式設計師而言，Thread 就像一個可以單獨執行的函數，這個函數與其他程式 (包含主程式) 同時執行，感覺上好像互相獨立，但是又可以利用變數存取某些共用變數。這種既獨立執行又能在變數上互相存取的函數，就稱為 Thread 函數。

當程式執行時必須向系統註冊、要資源，系統則會提供此程式一個 Process ID 、分配資源（CPU）供使用，這個過程可稱為「建立一個處理程序」。每個處理程序是分開的，不會與其他程序溝通。

雖然兩個程序（process）無法溝通，作業系統處理工作所能運用的最小單元「執行緒」卻可以，在同一個程序底下可以有多個執行緒，它們能夠共享某些變數，平行執行不同的任務，讓工作得以在更短的時間完成。就像是一個工廠（process）內可以有多個工人（thread），分工合作以加快完成速度。

因此，「JavaScript 是單執行緒語言」這句話，可以理解為 JavaScript 這個工廠只有一個工人，它同時間只能做一件事。在瀏覽器環境中，每一個「window」基本上就是一個 thread，如果派給它很多工作，就要排隊。


## 為什麼 JavaScript 設計為單執行緒？

因為 JavaScript 原先的設計是當作瀏覽器的腳本語言，為了能簡便地操作 DOM，與使用者互動。如果它不是單執行緒，那麼同步問題會變得很複雜：

> JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

> 所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

> -- -- <cite>阮一峰</cite>

當然，HTML5 之後，JavaScript 已經可以利用 Web Worker 建立多個執行緒，但是 Web Worker 無法存取 DOM 或是 window 的一些方法和屬性，仍需依賴主執行緒（UI thread）來執行，因此沒有改變它單執行緒的本質。


## 同步與非同步

了解單執行緒的特性之後，應該隨即會想到，如果 JavaScript 同時間只能做一件事，那不就會很慢嗎？

沒錯，如果某一個工作需時很長，後面的工作就必須在隊伍裡面等待。但是事實上，大多數時間都是在等待 I/O 操作（讀寫資料、網路請求、外部設備、定時器），在這漫長的等待中，CPU 是閒置的。

要怎麼樣讓 JavaScript 不要被這樣的耗時工作阻塞呢，答案就是非同步（asynchrony）處理。在 I/O 任務進行時，JavaScript 可以先執行下面的任務，等到 I/O 任務完成，再繼續處理該任務就好。

JavaScript 處理任務時，會將任務放到呼叫堆疊（call stack，又稱 execution stack，也可直接簡稱 stack）再依序執行，如果是非同步任務，則會被暫時放到瀏覽器的任務佇列（task queue）裏頭，任務佇列是先進先出的，當任務佇列通知呼叫堆疊它完成了，該任務才會被放回到 stack 執行。

## Event Loop

主執行緒不斷從任務佇列中讀取事件，這個運行機制因此被稱為 Event Loop。因為有了這個機制，即使 JavaScript 是單執行緒，也能良好的利用資源，看起來就像是同時做很多事一樣。（這邊要注意，雖然 JavaScript 是單執行緒，但是瀏覽器不是）

以下示意圖取自 Philip Roberts 的演講「[Help, I’m stuck in an event-loop.](https://vimeo.com/96425312)」，應該能夠幫助理解 Event loop。
![Event loop in JavaScript](https://i.imgur.com/rUwIkf6.jpg)

Philip Roberts 還做了一個視覺化工具[Loupe](http://latentflip.com/loupe/)，值得玩玩。


## 參考資料

- [Philip Roberts: Help, I’m stuck in an event-loop](https://vimeo.com/96425312)
- [阮一峰：JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [劉彥佐：从Javascript单线程谈Event Loop](https://tw.saowen.com/a/ea664e214153880c3acffc8c61315a848124a83000f92a0bc55693abb5d0b66a)
- [Re: [討論] javascript是共時、多執行緒嗎?](https://www.ptt.cc/bbs/Ajax/M.1320492552.A.2F1.html)
- [MDN: 並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)
