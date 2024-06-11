---
title: "XDG Autostart"
date: 2022-04-15T23:49:32+08:00
categories:
tags:
  - Linux
description: ""
lastmod: 2022-04-15T23:49:32+08:00
---

## Autostart Directories

依以下優先順序
```sh
# 1: user-specific
$XDG_CONFIG_HOME/autostart

# 2: user-specific default
~/.config/autostart

# 3: system-wide
$XDG_CONFIG_DIRS/autostart

# 4: system-wide default
/etc/xdg/autostart
```


## `.desktop` file format

有興趣看詳細定義可閱讀 [Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/latest/) 。

以 Steam 裡面的遊戲「Little Nightmares」爲例：

```desktop
[Desktop Entry]
Name=Little Nightmares
Comment=Play this game on Steam
Exec=steam steam://rungameid/424840
Icon=steam_icon_424840
Terminal=false
Type=Application
Categories=Game;
```

TBD..


## 參考資料

- [ArchWiki: XDG Autostart](https://wiki.archlinux.org/title/XDG_Autostart)
- [Desktop Application Autostart Speccification](https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html)
- 
