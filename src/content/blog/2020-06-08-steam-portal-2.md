---
title: "修正 Portal 2 於 Linux 中文顯示問題"
date: 2020-06-08T22:48:46+08:00
draft: false 
categories:
  - Games
tags:
description: ""
lastmod: 2020-06-09T00:02:02+08:00
---

最近在電腦上重裝 [Portal 2](https://zh.wikipedia.org/zh-tw/傳送門2) 來玩，字幕設定爲中文時竟然無法顯示。試着用英文玩了一下，可以大致聽懂，無奈英文程度還不夠好，許多俚語和黑色幽默都 catch 不到點，還是決定先花點時間讓中文字幕可以顯示，花了一整個晚上終於試出解法。

我猜測因爲環境以及遊戲版本不同，查到的解法都有些許不同，因此也把我的解決方法記錄如下，希望能幫助到其他人。

## 環境：

- Arch Linux
- Gnome
- Steam
- Portal 2:
  + 最後更新時間 2020/05/02（更新訊息有提到 Updated localization strings.）


## 無法顯示的原因

Protal 2 的遊戲字型爲 Helvetica[^1]，然而這個字型不包含中文字元，因此字幕設定爲中文（不管簡體繁體、或日文、韓文）時，顯示出來的都是一片空白。

因此，我們必須要自己調整遊戲使用的字型。


## 新增設定檔

```sh
# 不希望影響到其它顯示，因此開一個 portal2 專用的設定檔
vim ~/.config/fontconfig/portal2.conf
```

檔案內容如下：

```conf
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <match target="pattern">
    <test name="family" qual="any">
      <string>Helvetica</string>
    </test>
    <edit name="family" mode="assign" binding="same">
      <string>文泉驛微米黑</string>
      <string>Noto Sans CJK TC</string>
      <string>Noto Sans CJK JP</string>
      <string>Noto Sans CJK KR</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
      <string>sans-serif</string>
    </edit>
  </match>
  <dir>/usr/share/fonts</dir>
</fontconfig>
```

字型名稱也可以打英文 `WenQuanYi Micro Hei`，意思一樣。這個檔案的用途是告訴系統：如果字型名稱是 Helvetica，請依序用以下設定的字型來取代。

這邊我一次設定了好幾種不同字型，你也可以依照自己的喜好來修改，只要該字型有支援中文就行，個人覺得「文泉驛微米黑」的顯示效果滿好的。

如果你沒有裝過「文泉驛微米黑」，請繼續安裝字型。


## 安裝字型

你可以直接用你習慣的 package manager 下載安裝，以下舉例：

```zsh
# Arch Linux
pacman -S wqy-microhei

# Ubuntu
apt-get install fonts-wqy-microhei
```

## 設定 Portal 2 啟動變數

有了設定檔及字型之後，我們還需要讓遊戲使用該設定檔才行。開啟 Steam 客戶端，在 Portal 2 頁面依序點選：「設定 -> 內容... -> 設定啟動選項...」，會出現一個輸入框，輸入指令：

```sh
FONTCONFIG_FILE=~/.config/fontconfig/portal2.conf %command%
```

如此一來，每次從 Steam 開啟 Portal 2 時，就會以我們的字型設定爲主了！


## 參考資料

- [GitHub (ValveSoftware/portal2) issues: No cyrillic text in menus](https://github.com/ValveSoftware/portal2/issues/134#issuecomment-314821964)
- [Ubuntu 正體中文站論壇：關於steam遊戲--Portal 2 無法顯示中文字型](https://www.ubuntu-tw.org/modules/newbb/viewtopic.php?post_id=358532)[^2]


[^1]: 網路上大家提到的字型都是「Nimbus Sans L」，有可能是因爲遊戲更新調整過，我後來發現是「Helvetica」才對。
[^2]: 論壇內 `samwhelp` 有講解了一些 Linux 字型設定的知識，推薦閱讀！
