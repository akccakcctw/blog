---
title: "解決 Nginx 403 Forbidden"
date: "2017-06-18T17:46:00"
categories:
  - Nginx
  - Server
---

1. 檢查 error log
1. 確定檔案權限為 755
1. 確定 SElinux

```sh
ll -Z /etc/nginx/conf.d/xxx.conf # 顯示出 [身分識別:角色:type] 的SElinux 訊息，type 最重要，可能會是 "httpd_config_t"
ll -Z /srv/www # type可能是"var_t"或是其他，總之不是httpd開頭就會有權限問題

restorecon -Rv /srv/www 
# -R：連同子資料夾
# -v：顯示過程
# 此時 /srv/www 的 type 變成 "httpd_sys_content_t"，成功~
```

```sh
su - # 進入root身分
getsebool -a | grep httpd # 顯示 SElinux boolean 權限
setsebool -P httpd_enable_homedirs 1
setsebool -P httpd_can_network_connect 1 # -P flag = persist
reboot # 重啟linux
service nginx restart # 重啟nginx

# 或是先關掉SElinux（不建議）
vim /etc/sysconfig/selinux 
getenforce # 取得 SElinux 狀態
setenforce permissive # 寬容模式（enforcing, permissive, disabled）
```

## 參考資料

- [鳥哥的 Linux 私房菜：SELinux 初探](http://linux.vbird.org/linux_basic/0440processcontrol.php#selinux)
- [(13: Permission denied) while connecting to upstream:[nginx]](http://stackoverflow.com/questions/23948527/13-permission-denied-while-connecting-to-upstreamnginx)
- [Nginx 403 forbidden for all files](http://stackoverflow.com/questions/6795350/nginx-403-forbidden-for-all-files)
