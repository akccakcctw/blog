---
title: View System Sensors on Linux
date: 2024-09-21T04:47:09.248Z
---

```sh
# install lm_sensors
sudo pacman -S lm_sensors

# configuration
sudo sensors-detect

# view
sensors

# monitor (use `watch` command)
watch sensors
```

## 參考資料

- [GitHub: lm-sensors](https://github.com/lm-sensors/lm-sensors)
- [View CPU Temperature On Linux Using Lm_sensors](https://www.ostechnix.com/view-cpu-temperature-linux/)
