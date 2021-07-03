---
title: "Linux 環境偵測不到 3.5mm 接孔的耳機麥克風解法"
date: 2021-07-03T14:54:56+08:00
draft: false
categories:
tags:
  - microphone
description: ""
lastmod: 2021-07-03T14:54:56+08:00
---

![my device](https://i.imgur.com/4vbRlhY.png)

我現在使用的電腦是 Intel 的 NUC (NUC8i7HVK)，體積小巧，又提供了非常充足的設備連接介面可使用。

無奈它的內建麥克風品質不好，一定要靠很近才聽得清楚，音質也不佳。試過把耳麥接上 NUC 提供的 3.5mm 孔（4-pin 3.5mm TRRS jack），也無法正確偵測到耳麥的麥克風。每次線上會議時總要經由 USB port 接上另外買的桌上型麥克風才有辦法正常開會，這困擾最近終於解決了。

[解法](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack)很簡單，只要將以下設定加到 `/etc/modprobe.d/alsa-base.conf` 後，重新開機即可：

```conf
# syntax: options snd_hda_intel index=0 model=your_model_setting
options snd-hda-intel model=dell-headset-multi
```


## 參考資料

- [arch wiki: Advanced Linux Sound Architecture](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack)
- [Intel Community: NUC10i5 headphones jack audio not working with Ubuntu 20.04](https://community.intel.com/t5/Intel-NUCs/NUC10i5-headphones-jack-audio-not-working-with-Ubuntu-20-04/td-p/643946)
- [askubuntu: Install Realtek Audio drivers in Ubuntu 20.04 (Intel Nuc nuc10i7fnh)](https://askubuntu.com/questions/1258583/install-realtek-audio-drivers-in-ubuntu-20-04-intel-nuc-nuc10i7fnh)
- [kernel.org: HD-Audio Codec-Specific Models](https://www.kernel.org/doc/html/latest/sound/hd-audio/models.html)
- [Youtube 分享家-羽: 原來耳機的插頭有分2環跟3環，差別在哪？](https://www.youtube.com/watch?v=2qvsCtE7Vyw)
