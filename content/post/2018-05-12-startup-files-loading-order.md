---
title: "Bash/Zsh 環境變數載入順序"
date: 2018-05-12T11:56:05+08:00
categories:
  - command-line
  - Linux
tags:
description: ""
---

## login 與 non-login

為什麼要先談這個？因為 login shell 與 non-login shell，載入的檔案不同，這邊參照鳥哥的說明：

> **login shell**：取得 bash 時需要完整的登入流程的，就稱為 login shell。舉例來說，你要由 tty1 ~ tty6 登入，需要輸入使用者的帳號與密碼，此時取得的 bash 就稱為「login shell」囉；
>
> **non-login shell**：取得 bash 介面的方法不需要重複登入的舉動，舉例來說，(1) 你以 X window 登入 Linux 後， 再以 X 的圖形化介面啟動終端機，此時那個終端介面並沒有需要再次的輸入帳號與密碼，那個 bash 的環境就稱為 non-login shell了。(2) 你在原本的 bash 環境下再次下達 bash 這個指令，同樣的也沒有輸入帳號密碼， 那第二個 bash (子程序) 也是 non-login shell。

當進入一個 shell 時，如果是 login shell （或是有 `--login` 這個 flag），就會讀取 login shell 的設定檔，反之則讀取 non-login shell 的設定檔。

當離開 shell 時，如果是 login shell （或是 non-login shell 使用 `exit` 指令），就會讀取 logout 設定檔。


## 有哪些設定檔？

先來看 Bash：

 - /etc/profile
 - /etc/bashrc
 - ~/.bash_profile
 - ~/.bash_login
 - ~/.profile
 - ~/.bashrc
 - ~/.bashlogout

有 `/etc/` 開頭的都是系統級別的設定檔，在家目錄底下的則為使用者自己的設定檔。通常修改時不會直接動到系統設定，只會修改家目錄底下的檔案。

**profile/login 設定檔**，只會在 login 時讀取，這些檔案包含 `~/.bash_profile`, `~/.bash_login`, `~/.profile`，通常只會有其中一個，不同的 Linux 發行版使用的檔案有所不同，如果存在兩個以上，只會依照這個順序讀取第一個檔案。

**rc 設定檔[^1]**，則只會在 non-login 時讀取。

讀取順序可以簡化為這樣一個表（取自 [ The Lumber Room ](https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/)）：


|                 | Interactive login | Interactive non-login | Script |
|-----------------|-------------------|-----------------------|--------|
| /etc/profile    | A                 |                       |        |
| /etc/bashrc     |                   | A                     |        |
| ~/.bashrc       |                   | B                     |        |
| ~/.bash_profile | B1                |                       |        |
| ~/.bash_login   | B2                |                       |        |
| ~/.profile      | B3                |                       |        |
| BASH_ENV        |                   |                       | A      |
| ...             |                   |                       |        |
| ~/.bash_logout  | C                 |                       |        |

因此，**自訂的環境設定可以都新增在** `~/.bashrc`，**並且在 profile 檔** `source` 它，這樣不管是 login 或 non-login 就都吃得到。如果有些設定希望只有 login/non-login shell 使用，就加個判斷：

```sh
if [[ -n $PS1 ]]; then
    : # These are executed only for interactive shells
    echo "interactive"
else
    : # Only for NON-interactive shells
fi

if shopt -q login_shell ; then
    : # These are executed only when it is a login shell
    echo "login"
else
    : # Only when it is NOT a login shell
    echo "nonlogin"
fi
```

---

再來看 Zsh：

 - /etc/zshenv
 - ~/.zshenv
 - /etc/zprofile
 - ~/.zprofile
 - /etc/zshrc
 - ~/.zshrc
 - /etc/zlogin
 - ~/.zlogin
 - ~/.zlogout
 - /etc/zlogout

執行順序如下：

|               | Interactive login | Interactive non-login | Script |
|---------------|-------------------|-----------------------|--------|
| /etc/zshenv   | A                 | A                     | A      |
| ~/.zshenv     | B                 | B                     | B      |
| /etc/zprofile | C                 |                       |        |
| ~/.zprofile   | D                 |                       |        |
| /etc/zshrc    | E                 | C                     |        |
| ~/.zshrc      | F                 | D                     |        |
| /etc/zlogin   | G                 |                       |        |
| ~/.zlogin     | H                 |                       |        |
| ...           |                   |                       |        |
| ~/.zlogout    | I                 |                       |        |
| /etc/zlogout  | J                 |                       |        |


因此，**zsh 的自訂設定可以直接放在** `~/.zshrc`，不管是 login 或 non-login 都會執行。

特別需要注意的是上表沒提到的 `~/.profile`，一般來說，zsh 只會執行 `~/.zprofile` ，而 `~/.profile`，只有在 sh-compatible  模式裡才會執行，如果希望包含 `~/.profile` 的設定的話，需要在 `~/.zprofile` 內加入以下設定（參考自[這篇](https://superuser.com/questions/187639/zsh-not-hitting-profile)）：

```sh
emulate sh
. ~/.profile
emulate zsh
```

## 參考資料

 - [鳥哥的 Linux 私房菜：bash 的環境設定檔](http://linux.vbird.org/linux_basic/0320bash.php)
 - [Zsh/Bash startup files loading order (.bashrc, .zshrc etc.)](https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/)
 - [GNU.org: Bash Startup Files](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)


## 附註

[^1]: [What does “rc” in .bashrc stand for?](https://unix.stackexchange.com/questions/3467/what-does-rc-in-bashrc-stand-for)
