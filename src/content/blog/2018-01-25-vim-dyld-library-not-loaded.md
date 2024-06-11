---
title: "更新 Homebrew 後，啟動 vim 的問題"
date: 2018-01-25T11:11:11+08:00
categories:
  - vim
tags:
description: ""
---

今天更新 Homebrew 之後，啟動 vim 時顯示錯誤：

```sh
dyld: Library not loaded: /usr/local/opt/ruby/lib/libruby.2.4.3.dylib
  Referenced from: /usr/local/bin/vim
  Reason: image not found
[1]    52248 abort      vim
```

找到[類似問題](https://superuser.com/questions/1096438/brew-upgrade-broke-vim-on-os-x-dyld-library-not-loaded)，原因是 vim 依賴舊版的 ruby，所以更新後無法啟動，解決方法是重裝 ruby 和 vim：

```sh
brew reinstall ruby vim
```

但我重裝之後仍然無法使用，顯示如下錯誤訊息：

```sh
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink bin/rake
Target /usr/local/bin/rake
already exists. You may want to remove it:
  rm '/usr/local/bin/rake'

To force the link and overwrite all conflicting files:
  brew link --overwrite ruby

To list all files that would be deleted:
  brew link --overwrite --dry-run ruby
```

照著提示使用 `brew link --overwrite ruby`，再重新更新 vim：

```sh
brew upgrade vim
```

如此一來，ruby 成功更新到最新版，且 vim 的依賴也是新版的 ruby，就能正常啟動了！

---

另外，如果不想更新 vim，其實也可以直接讓 ruby 降版（參考[這篇](https://stackoverflow.com/questions/3987683/homebrew-install-specific-version-of-formula)）：

```sh
# 確認目前有哪些版本
brew info ruby

# 顯示訊息如下
ruby: stable 2.5.0 (bottled), HEAD
Powerful, clean, object-oriented scripting language
https://www.ruby-lang.org/
/usr/local/Cellar/ruby/2.4.3_1 (3,043 files, 16.3MB)
  Poured from bottle on 2017-12-22 at 00:00:26
/usr/local/Cellar/ruby/2.5.0 (3,323 files, 18.4MB)
  Poured from bottle on 2018-01-25 at 10:21:10

# 切換版本
brew switch ruby 2.4.3_1
```

## 參考資料

  - [superuser: brew upgrade broke Vim on OS X (dyld: Library not loaded)](https://superuser.com/questions/1096438/brew-upgrade-broke-vim-on-os-x-dyld-library-not-loaded)
  - [stackoverflow: Homebrew install specific version of formula?](https://stackoverflow.com/questions/3987683/homebrew-install-specific-version-of-formula)

