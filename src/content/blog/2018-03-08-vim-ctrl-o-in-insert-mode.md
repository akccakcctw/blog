---
title: "Vim 如何在 insert mode 換行"
date: 2018-03-08T23:19:33+08:00
categories:
  - vim
tags:
description: ""
---

使用 Vim 好一陣子了，但一直有個地方覺得不順，就是在打到要換行的時候，需要先按 `<Esc>` 回到 Normal mode 再按 `o`。儘管可以用 `<C-[>` 代替 Esc，右手還是有按錯的可能性，而且不那麼直覺（對我來說啦）。

今天終於找到比較好按的方式：`<C-o> o`。先按 `<C-o>` 可以暫時回到 Normal mode，然後再用 `o` 換行，由於右手按的都是比較近的 `o`，而且又是連續按，因此錯誤率以及速度比原來快上不少！

依樣畫葫蘆，`<C-o>` 也可以配合其他指令，例如移位、換行、刪除行等等，真的是很有用的快捷鍵呀！（用了那麼久的 Vim 才知道 `<C-o>` 可以暫時回到 Normal mode⋯⋯）



## 參考資料

  - [stackoverflow: Create New Line While in Insert Mode](https://stackoverflow.com/questions/18139047/create-new-line-while-in-insert-mode)

