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

### Image Transformations 是自動的

**你不需要手動寫轉換參數。** `src/plugins/rehype-r2-image.mjs` 這個 rehype plugin
會在 build 時，把所有指向 `static.rex-tsou.com` 的 `<img>` 網址自動改寫成：

```
https://static.rex-tsou.com/cdn-cgi/image/width=1232,format=auto,quality=85/blog/<post-slug>/foo.png
```

所以文章裡只要照上面那樣寫原始網址就好。要調整參數或日後換掉 CDN，改那個 plugin
一個檔案即可，不必動到任何一篇文章。

參數的選擇理由：

- `format=auto` — 依瀏覽器 `Accept` 自動送 AVIF / WebP / 原格式。轉換沒好處時
  Cloudflare 會原樣回傳原圖，**不會有變大的風險**
- `width=1232` — 這是**上限**不是固定值。Cloudflare 預設 `fit=scale-down` 不會放大，
  所以比它窄的圖只會被轉檔、尺寸不變。1232 是文章容器（約 616px）的 2 倍，供 retina 使用
- `quality=85` — 肉眼通常看不出與原圖的差異

> 不要把 `width` 改成接近實際顯示寬度的數值。實測把 711px 的小截圖強制縮到 616px，
> 檔案反而從 6.2 KB 變成 13.7 KB。

**例外**：用原始 `<img>` HTML 標籤寫的圖片不會被改寫（rehype 預設不解析 raw HTML）。
想讓圖片享有最佳化，請用 Markdown 的 `![]()` 語法。

`format=auto` 會依 `Accept` 標頭自動降級（AVIF → WebP → JPEG），不需要自己處理
相容性。以現有 10 張圖實測，套用上述參數後：

| | 大小 |
|---|---|
| 原圖合計 | 571,979 bytes |
| 轉換後合計 | 185,099 bytes |
| **省下** | **67%** |

其中一張 711px 的小截圖被 Cloudflare 判定轉換無益而原樣回傳 PNG —— 這正是
`format=auto` 的安全機制。

Free 方案每月 5,000 次**唯一**轉換免費（同一組參數 + 同一張圖只算一次，之後走快取
不重複計次）。超過額度時新的轉換會回錯誤，但不會計費。以本站規模不會構成問題，
但這是 plugin 全站套用的唯一風險。

## 快取

`static.rex-tsou.com` 的內容由 Cloudflare 邊緣快取，不需要額外設定 Cache Rule。
`.png` / `.svg` / `.webp` 等圖片副檔名本來就在預設快取清單內。

上傳時帶的 `Cache-Control: public, max-age=31536000, immutable` 會把邊緣與瀏覽器
的快取時間從 Cloudflare 預設的 4 小時延長為 1 年，所以請照上面的指令帶上它。

> 驗證快取時**要用 GET，不要用 `curl -I`**。R2 custom domain 對 HEAD 請求一律
> 回報 `cf-cache-status: DYNAMIC`，會讓人誤以為快取沒生效。正確的測法是：
>
> ```sh
> curl -s -D - -o /dev/null https://static.rex-tsou.com/blog/<post-slug>/foo.png | grep -i cf-cache-status
> ```

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
