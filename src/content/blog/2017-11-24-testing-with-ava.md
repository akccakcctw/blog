---
title: "用 AVA 作單元測試遇到的坑"
date: 2017-11-24T21:53:12+08:00
categories:
  - JavaScript
  - Front-end
tags:
  - Unit-test
description: ""
---

最近在開發的 Lightbox 套件 [Darkli](https://github.com/akccakcctw/darkli) 功能越來越完善了，所以就想說來幫它寫些測試吧。上網查現在比較紅的框架有哪些，發現還滿多的，除了主流的 Mocha，還有 Facebook 主推的 Jest、主打易用的 Tape、以及 Jasmine 等等，參考[這篇](https://raygun.com/blog/javascript-unit-testing-frameworks/)，以及利用 Github 上面星星數比較的結果，最後挑了多產大神 [Sindre Sorhus](https://github.com/sindresorhus) 的 [AVA](https://github.com/avajs/ava) 來用。

不愧是[連 TJ 都說讚](https://twitter.com/tjholowaychuk/status/709612159458611200)的框架，才剛上手就覺得非常好用，沒什麼學習曲線，而且文件說明也挺足夠。重點是它原生支援好多新語法呀：

- [ES2017 support](https://github.com/avajs/ava#es2017-support)
- [TypeScript support](https://github.com/avajs/ava#typescript-support)
- [Transpiling imported modules](https://github.com/avajs/ava#transpiling-imported-modules)
- [Promise support](https://github.com/avajs/ava#promise-support)
- [Generator function support](https://github.com/avajs/ava#promise-support)
- [Async function support](https://github.com/avajs/ava#async-function-support)
- [Observable support](https://github.com/avajs/ava#observable-support)

然而，因為 Darkli 這個專案同時使用 Babel + Rollup 來打包，加上我使用比較新的`import`、`export`語法，產生了套件之間水火不容的相容問題。在測試時，總是提示`SyntaxError: Unexpected token import`，按照使用說明書（README），以及查到[這篇](http://www.damianmullins.com/unit-testing-front-end-javacript-with-ava-and-jsdom/)說明，發現 AVA 預設只會在你的測試裡面傳輸程式碼，而那些測試以外的模組 import 就不予理會，如此才能確保 AVA 對你的 production 環境沒有影響。

> AVA will transpile ES2015 code in your tests; however, it won’t transpile code in modules imported from outside those tests. This is so that AVA has zero impact on your production environment.

所以依照說明書的範例，安裝了`babel-register`，然後把`package.json`改寫，在`ava`區塊新增`require`以及`babel`設定如下：

```json
...
"ava": {
  "files": [
    "test/unit/**/*.test.js"
  ],
  "require": [
    "babel-register"
  ],
  "babel": "inherit"
}
```

再跑一次測試，覺得應該是沒問題了吧！

當然！還是一樣...

◢▆▅▄▃ 崩╰(〒皿〒)╯潰 ▃▄▅▆◣

---

於是再繼續找找找，終於發現是`.babelrc`那段`"modules": false`造成的問題，下面是`.babelrc`的內容：

```json
{
  "build": {
    "presets": [
      [
        "es2015",
        {
          "modules": false
        }
      ]
    ]
  }
}
```
把它移掉之後，AVA 終於正常運作了，可是換成 babel + rollup 跳腳啦，說要把`"modules": false`加回來，不然就繼續罷工 XD，我陷入一個地雷馬的處境。

最後決定，讓 test 和 build 的 babel 設定分開，於是`.babelrc`變成這樣（`env`就靠你了！）：

```json
{
  "env": {
    "build": {
      "presets": [
        [
          "es2015",
          {
            "modules": false
          }
        ]
      ]
    },
    "test": {
      "presets": [
        "es2015"
      ]
    }
  }
}
```

因為我是在 Windows 開發，為了使用 env 的設定，還需要另外安裝 `cross-env` 這個套件，才能正常使用

```
yarn add -D cross-env
```

最後，再依據不同的 npm script 手動加上不同的環境設定就大功告成了，`package.json`片段如下：

```json
...
"scripts": {
  "test": "cross-env BABEL_ENV=test gulp lint && yarn run ava",
  "ava": "cross-env BABEL_ENV=test ava --verbose",
  "ava:watch": "cross-env BABEL_ENV=test ava --verbose --watch",
  "gulp": "cross-env BABEL_ENV=build gulp",
  "tree": "node bin/tree.js",
  "build:js": "rollup -c",
  "compress:js": "uglifyjs dist/darkli.js -o dist/darkli.min.js -c -m --comments /^!/",
  "watch:js": "rollup -c -w -m"
}
```

花了很多時間才把這個坑填起來，不知道會不會有人和我遇到一樣的問題，希望上面的解法對你有幫助，如果有錯誤或我沒注意到的部分也歡迎留言分享。
