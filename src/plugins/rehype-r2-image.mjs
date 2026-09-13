import { visit } from 'unist-util-visit';

/**
 * 把指向圖床的 <img> 網址改寫成 Cloudflare Image Transformations 的形式。
 *
 * 文章裡一律寫原始網址：
 *   ![說明](https://static.rex-tsou.com/blog/<slug>/foo.png)
 *
 * build 時自動變成：
 *   https://static.rex-tsou.com/cdn-cgi/image/<參數>/blog/<slug>/foo.png
 *
 * 這樣 Markdown 內容不必綁死 Cloudflare 的語法，日後要換 CDN 或調整參數
 * 都只改這個檔案，191 篇文章一個字都不用動。
 */

const IMAGE_HOST = 'static.rex-tsou.com';
const TRANSFORM_PREFIX = '/cdn-cgi/image/';

/**
 * width 是「上限」而非固定值 —— Cloudflare 預設的 fit=scale-down 不會放大圖片，
 * 所以小於此寬度的圖只會被轉檔、尺寸原封不動。
 *
 * 1232 = 文章容器寬度（--breakpoint-sm 640px 扣掉 padding 後約 616px）的 2 倍，
 * 供 retina 螢幕使用。
 *
 * 不要改成接近實際顯示寬度的數值：強制縮放小截圖有可能讓檔案反而變大。
 */
const PARAMS = 'width=1232,format=auto,quality=85';

export function rehypeR2Image() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;

      const src = node.properties?.src;
      if (typeof src !== 'string') return;

      let url;
      try {
        url = new URL(src);
      } catch {
        return; // 相對路徑或非法網址，不處理
      }

      if (url.hostname !== IMAGE_HOST) return;
      if (url.pathname.startsWith(TRANSFORM_PREFIX)) return; // 已經手動指定過參數

      url.pathname = `${TRANSFORM_PREFIX}${PARAMS}${url.pathname}`;
      node.properties.src = url.toString();
    });
  };
}
