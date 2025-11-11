# HtmlPreview 元件設計文件

## 元件概述
HtmlPreview 是右側的 HTML 預覽區域，即時顯示轉換後的 Markdown 內容。

## 職責
- 接收 Markdown 文字
- 呼叫轉換工具將 Markdown 轉為 HTML
- 以樣式化的 HTML 呈現內容
- 確保安全性（防止 XSS 攻擊）

## Props
```typescript
{
  markdown: string  // 要轉換的 Markdown 文字
}
```

## 狀態管理
```javascript
const [htmlContent, setHtmlContent] = useState('')

useEffect(() => {
  // 當 markdown 改變時，重新轉換
  const html = parseMarkdown(markdown)
  setHtmlContent(html)
}, [markdown])
```

## UI 設計
- 全高度容器
- 文章風格排版
- 適當的內距和行高
- 捲軸樣式優化
- 背景色區分輸入區

## 樣式規範
```css
容器：
  - bg-gray-50 flex flex-col

標題區：
  - px-6 py-4 border-b
  - bg-white flex items-center justify-between
  - 標題：text-lg font-semibold text-gray-800
  - 副標題：text-xs text-gray-500 mt-0.5

內容區：
  - flex-1 p-6 overflow-y-auto
  - prose prose-slate max-w-none
  - 使用 Tailwind Typography plugin
```

## Markdown 樣式對應

### 標題
- h1: text-3xl font-bold mb-4 text-gray-900
- h2: text-2xl font-bold mb-3 text-gray-800
- h3: text-xl font-semibold mb-2 text-gray-700

### 文字樣式
- strong (粗體): font-bold text-gray-900
- em (斜體): italic text-gray-700

### 程式碼
- 行內 code: bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm
- 程式碼區塊: bg-gray-900 text-white p-4 rounded-lg overflow-x-auto
  - 使用 highlight.js 進行語法高亮

### 連結
- a: text-blue-600 hover:text-blue-800 underline

### 段落
- p: mb-4 leading-relaxed text-gray-700

## 元件結構
```jsx
<div className="preview-container">
  <div className="preview-header">
    <h2>HTML 預覽</h2>
  </div>
  <div
    className="preview-content prose"
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
</div>
```

## 安全性考量
- 使用 DOMPurify 清理 HTML（防止 XSS）
- 限制允許的 HTML 標籤
- 不允許執行 JavaScript

## 未來擴展
- 新增複製 HTML 原始碼功能
- 新增列印預覽模式
- 新增匯出為 PDF
- 支援自訂 CSS 主題
- 新增深色模式預覽
