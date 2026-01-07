# 履歷網站結構說明

這份文件簡要說明各檔案的用途，方便後續維護與擴充。

## 入口檔案
- `index.html`：頁面骨架與導覽列，載入 CSS 與各個 JavaScript 模組。
- `app.js`：初始化入口，負責啟動主題、最後更新日期與路由模組。

## JavaScript 模組
- `theme.js`：主題切換與偏好保存（localStorage）。
- `last-updated.js`：讀取 `document.lastModified` 並更新頁尾日期。
- `router.js`：Hash 路由與 section 載入，切換後回到頁面頂部。
- `notes-carousel.js`：學習筆記輪播的組裝與互動控制。
- `parse.js`：從 `ul[data-link-carousel]` 中解析分組資料，供輪播使用。
- `analytics.js`：簡單的頁面瀏覽追蹤請求。

## CSS 樣式
- `base.css`：全域變數與基礎樣式（字體、背景、通用元素）。
- `layout.css`：版面與區塊布局（topbar、footer、content）。
- `components.css`：共用元件樣式（按鈕、badge、KV 區塊等）。
- `notes-carousel.css`：學習筆記輪播的專屬樣式。

## 其他資源
- `favicon.ico`：網站小圖示。
- `sections/`：各頁面區塊的 HTML 片段，供路由載入。
