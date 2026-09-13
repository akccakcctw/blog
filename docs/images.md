# 文章圖片

文章圖片放在 **`static.rex-tsou.com`**，背後是 Cloudflare R2 的 `static` bucket。
不要把圖片放進這個 repo（`public/` 底下那些是主題自帶的 demo 素材）。

## 為什麼不用 Astro 的 `astro:assets`

用外部圖床是為了讓 repo 保持輕量、build 保持快速。代價是失去 Astro build 時的
圖片最佳化，改由 Cloudflare Image Transformations 在邊緣處理（見下）。

## 路徑慣例

```
blog/<post-slug>/<檔名>
```

`post-slug` 就是 Markdown 檔名去掉 `.md`，例如
`src/content/blog/2016-07-26-chrome-devtool-event-detection-tips.md`
的圖片放在 `blog/2016-07-26-chrome-devtool-event-detection-tips/`。

## 上傳

需要先設定好 rclone remote（見最後一節）。

```sh
rclone copy ./你的圖片資料夾 r2:static/blog/<post-slug>/ \
  --header-upload "Cache-Control: public, max-age=31536000, immutable"
```

單一檔案：

```sh
rclone copyto ./foo.png r2:static/blog/<post-slug>/foo.png \
  --header-upload "Cache-Control: public, max-age=31536000, immutable"
```

確認：

```sh
rclone ls r2:static/blog/<post-slug>/
curl -sI https://static.rex-tsou.com/blog/<post-slug>/foo.png
```

## 在文章裡引用

```markdown
![說明文字](https://static.rex-tsou.com/blog/<post-slug>/foo.png)
```

一律用 `https://`。用 `http://` 的話瀏覽器會以混合內容為由擋掉，圖片不會顯示。

### 搭配 Image Transformations

啟用後（Cloudflare → Images → Transformations，對 `rex-tsou.com` 這個 zone），
可以在路徑中插入轉換參數，由邊緣即時縮圖與轉檔：

```markdown
![說明文字](https://static.rex-tsou.com/cdn-cgi/image/width=800,format=auto,quality=85/blog/<post-slug>/foo.png)
```

- `format=auto` — 依瀏覽器的 `Accept` 自動送 AVIF / WebP / 原格式
- `width=800` — 文章版面寬度大約就是這個數字，超過沒有意義
- `quality=85` — 通常肉眼看不出與原圖的差異

Free 方案每月 5,000 次**唯一**轉換免費（同一組參數 + 同一張圖只算一次）。
超過額度時新的轉換會回錯誤，但不會計費。

## 注意事項

**換圖一律換檔名。** 上傳時宣告的 `immutable` 告訴瀏覽器這個網址的內容永遠不會變，
已經快取過的使用者在一年內不會重新抓取。覆蓋同名檔案他們是看不到的。

**不要刪除 bucket 內既有的物件。** `IEEE_754_Double_Floating_Point_Format.svg`
還被 `2017-02-08-javascript-determines-whether-the-decimal-equivalent.md` 引用中。

**R2 免費額度**：10 GB 儲存、每月 100 萬次寫入、1000 萬次讀取、對外流量完全免費。

## rclone 設定

```sh
sudo pacman -S rclone
rclone config      # 新增 remote，名稱 r2
```

| 項目 | 值 |
|---|---|
| Storage | `s3` |
| provider | `Cloudflare` |
| region | `auto` |
| endpoint | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` |
| `no_check_bucket` | **`true`** |

`no_check_bucket` 是必要的：R2 API token 的範圍限定在 `static` 這一個 bucket，
沒有帳號層級的 `ListBuckets` 權限，rclone 預設的存在性檢查會失敗並誤以為要建立
bucket，導致上傳被拒（`CreateBucket: AccessDenied`）。

金鑰在 Cloudflare → R2 → Manage R2 API Tokens 建立（**Account API token**、
權限 Object Read & Write、範圍只勾 `static`），存在 `~/.config/rclone/rclone.conf`。
