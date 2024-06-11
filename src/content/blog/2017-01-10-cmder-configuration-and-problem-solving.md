---
title: "Cmder 相關配置與問題解決"
date: "2017-01-10T04:05:00"
categories:
  - bash
  - command-line
---

*目前版本 v1.3.2*
下載位置：

- [官網 http://cmder.net/](https://github.com/cmderdev/cmder/releases)
- [GitHub Repo Releases](https://github.com/cmderdev/cmder/releases) 


## 中文亂碼
修改 Settings/Startup/Environment (Win+Alt+P 可打開設定介面)，
在底下新增一行 `set LANG=zh_TW.UTF8`

## 啟動資料夾更改為所在位置(current directory)
修改 Settings/Startup/Tasks 內的 Task Commands
```sh
cmd /c "%ConEmuDir%\..\git-for-windows\bin\bash --login -i" -new_console:d:%CD%
```

## 修改預設的 `λ` 符號
預設的 prompt 如果不喜歡，可以修改 `cmder/vendor/clink.lua` 這個檔案，
在檔案內用關鍵字搜尋 "lambda" 就可以找到須修改的位置，自行替換成習慣的符號

## 使用系統原有的`git-bash`
修改  Settings/Startup/Tasks 內 {bash::bash} 設定
```sh
# 預設為 
# *cmd /c "%ConEmuDir%\..\git-for-windows\bin\bash --login -i" -new_console:d:%USERPROFILE%
# 修改為（預設啟動位置也順便改成CD(current directory)了）
cmd /c "C:\PROGRA~1\Git\usr\bin\bash.exe --login -i" -new_console:d:%CD%
```

## Plugin: Powerline
專案位址：https://github.com/AmrEldib/cmder-powerline-prompt/
將`powerline_prompt.lua`複製到 "cmder/config/" 底下即可

```sh
$ cmderr # cd 到 cmder 根目錄
$ cd config
$ wget "https://raw.githubusercontent.com/AmrEldib/cmder-powerline-prompt/master/powerline_prompt.lua"
```

## 在 Bash on Ubuntu on Windows 開啟 Vim 時，方向鍵失效
在 Settings/Startup/Tasks 新增一個 Task（我取名為 {bash::bash on Windows}），以後要開啟這個子系統時就用這個task 開

- Task parameters 設定 icon `/icon "%USERPROFILE%\AppData\Local\lxss\bash.ico"`
- Commands 設定為 `%windir%\system32\bash.exe -cur_console:p`

## 參考資料
- [cmder中文显示相关问题解决方案](http://wentaoma.com/2016/08/31/cmder-chinese-encode/)
- [Cmder の Prompt を修正する方法](https://jptomo.github.io/blog/2016/11120_how_to_modify_cmder_prompt.html)
- [Github: cmder](https://github.com/cmderdev/cmder/issues/901)
