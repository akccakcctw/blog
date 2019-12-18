---
title: "Tips: Base64 Encode & Decode"
date: 2019-12-18T23:31:58+08:00
categories:
  - command-line
tags:
description: ""
lastmod: 2019-12-18T23:31:58+08:00
---

## Origin Data

```bash
'{"foo":"bar"}'
```

---

## Encode

### Shell

```bash
echo -n '{"foo":"bar"}' | base64
# eyJmb28iOiJiYXIifQ==
```

### Browser

```javascript
btoa('{"foo":"bar"}');
// eyJmb28iOiJiYXIifQ==
```

### Nodejs

```javascript
Buffer.from('{"foo":"bar"}').toString('base64');
// 'eyJmb28iOiJiYXIifQ=='
```

### Python

```python
import base64
base64.b64encode(bytes('{"foo":"bar"}', 'utf-8'))
# b'eyJmb28iOiJiYXIifQ=='
```

---

## Decode

### Shell

```bash
echo -n 'eyJmb28iOiJiYXIifQ==' | base64 -d
# {"foo":"bar"}%
```

### Browser

```javascript
atob('eyJmb28iOiJiYXIifQ==');
// {"foo":"bar"}
```

### Nodejs

```javascript
Buffer.from('eyJmb28iOiJiYXIifQ==', 'base64').toString();
// '{"foo":"bar"}'
```

### Python

```python
base64.b64decode('eyJmb28iOiJiYXIifQ==')
# b'{"foo":"bar"}'
```
