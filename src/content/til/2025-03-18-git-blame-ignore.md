---
title: git blame ignore
date: 2025-03-18T22:10:39.000+08:00
tags:
  - Git
---

看到同事 push 了一個檔案，檔名叫作 `.git-blame-ignore-revs`，內容只有 commit hash 而已，像是這樣：

```gitconfig
# changed tabs to space
a926bba49c89a5b882cd298be3af2570b1e6252c
```

查了一下原來可以忽略某些 commit 的 blame 資訊，通常使用在單純改變 coding style，或是單純 format 檔案格式的 commit 上，上面這個檔案設定好之後，還要記得設定 `.git/config` 才會生效：

```gitconfig
[blame]
    ignoreRevsFile = .git-blame-ignore-revs
```

如果檔名使用 `.git-blame-ignore-rev` 時，在 [GitHub 也有支援](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files#ignore-commits-in-the-blame-view)！

## 參考資料

- https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt
- [Gea-Suan Lin: 讓 git blame 可以忽略掉某些 restyle/reformat 的 commit](https://blog.gslin.org/archives/2023/12/23/11545/%E8%AE%93-git-blame-%E5%8F%AF%E4%BB%A5%E5%BF%BD%E7%95%A5%E6%8E%89%E6%9F%90%E4%BA%9B-restyle-reformat-%E7%9A%84-commit/)
- https://www.stefanjudis.com/today-i-learned/how-to-exclude-commits-from-git-blame/



