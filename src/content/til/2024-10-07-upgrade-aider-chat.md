---
title: upgrade aider-chat
date: 2024-10-07T05:34:22.973Z
---

因爲我用 `pipx`，和官方預設不一樣，每次 `aider` 有更新時都要想一下才知道怎麽做，每次遇到的問題如下：

```sh
$ aider
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Newer aider version v0.59.1 is available.

python -m pip install --upgrade --upgrade-strategy only-if-needed aider-chat
Run pip install? (Y)es/(N)o [Yes]:

Installing: python -m pip install --upgrade --upgrade-strategy only-if-needed aider-chat


Installation failed.

error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try 'pacman -S
    python-xyz', where xyz is the package you are trying to
    install.

    If you wish to install a non-Arch-packaged Python package,
    create a virtual environment using 'python -m venv path/to/venv'.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip.

    If you wish to install a non-Arch packaged Python application,
    it may be easiest to use 'pipx install xyz', which will manage a
    virtual environment for you. Make sure you have python-pipx
    installed via pacman.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by
passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

其實只要使用 `pipx` 指令來更新就可以了，很簡單：

```sh
$ pipx upgrade aider-chat
upgraded package aider-chat from 0.58.1 to 0.59.1 (location: /home/akccakcctw/.local/share/pipx/venvs/aider-chat)
```