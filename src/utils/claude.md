# markdownParser 工具模組設計文件

## 模組概述
markdownParser 是核心的 Markdown 轉 HTML 邏輯模組，負責解析並轉換 Markdown 語法。

## 職責
- 將 Markdown 文字轉換為 HTML
- 支援基本 Markdown 語法（標題、粗體、斜體、程式碼、連結）
- 處理程式碼區塊的語法高亮
- 確保輸出的 HTML 安全性

## 使用的套件

### marked
- **用途**：主要的 Markdown 解析器
- **版本**：^12.0.0
- **優點**：輕量、快速、標準化
- **設定**：
  ```javascript
  import { marked } from 'marked'

  marked.setOptions({
    breaks: true,      // 支援 GFM 換行
    gfm: true,         // 啟用 GitHub Flavored Markdown
    headerIds: false,  // 不產生 header id（簡化輸出）
  })
  ```

### highlight.js
- **用途**：程式碼區塊語法高亮
- **版本**：^11.9.0
- **語言支援**：javascript, python, html, css, bash 等常用語言
- **主題**：使用 github-dark 或 atom-one-dark

## API 設計

### 主函式：parseMarkdown
```javascript
/**
 * 將 Markdown 文字轉換為 HTML
 * @param {string} markdown - 要轉換的 Markdown 文字
 * @returns {string} 轉換後的 HTML 字串
 */
export function parseMarkdown(markdown) {
  if (!markdown) return ''

  // 1. 使用 marked 轉換
  const rawHtml = marked.parse(markdown)

  // 2. 清理並確保安全性
  const cleanHtml = sanitizeHtml(rawHtml)

  return cleanHtml
}
```

### 輔助函式：sanitizeHtml
```javascript
/**
 * 清理 HTML，移除潛在的危險內容
 * @param {string} html - 要清理的 HTML
 * @returns {string} 清理後的 HTML
 */
function sanitizeHtml(html) {
  // 基礎版本：移除 script 標籤
  // 未來可整合 DOMPurify 套件做更完整的清理
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}
```

### 自訂 Renderer
```javascript
import { Renderer } from 'marked'

const renderer = new Renderer()

// 自訂程式碼區塊渲染
renderer.code = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
  const highlighted = hljs.highlight(code, { language: validLanguage }).value

  return `
    <pre class="hljs bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
      <code class="language-${validLanguage}">${highlighted}</code>
    </pre>
  `
}

// 自訂連結渲染（新視窗開啟）
renderer.link = (href, title, text) => {
  return `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${text}</a>`
}

marked.use({ renderer })
```

## 支援的 Markdown 語法

### 1. 標題 (Headings)
```markdown
# H1 標題
## H2 標題
### H3 標題
```

### 2. 粗體與斜體
```markdown
**粗體文字**
*斜體文字*
_也是斜體_
***粗斜體***
```

### 3. 程式碼
```markdown
行內程式碼：`const x = 10`

程式碼區塊：
\`\`\`javascript
function hello() {
  console.log('Hello World')
}
\`\`\`
```

### 4. 超連結
```markdown
[顯示文字](https://example.com)
[有標題的連結](https://example.com "這是標題")
```

## 效能優化
- 使用 debounce 避免頻繁轉換（在元件層處理）
- 快取轉換結果（使用 useMemo）
- 延遲載入 highlight.js 的語言包

## 錯誤處理
```javascript
export function parseMarkdown(markdown) {
  try {
    if (!markdown || typeof markdown !== 'string') {
      return ''
    }

    const html = marked.parse(markdown)
    return sanitizeHtml(html)
  } catch (error) {
    console.error('Markdown 轉換錯誤:', error)
    return '<p class="text-red-600">轉換失敗，請檢查 Markdown 語法</p>'
  }
}
```

## 測試案例
```javascript
// 測試範例
const testMarkdown = `
# 測試標題
這是**粗體**和*斜體*的測試。

## 程式碼測試
\`\`\`javascript
const test = 'Hello'
\`\`\`

[測試連結](https://example.com)
`

console.log(parseMarkdown(testMarkdown))
```

## 未來擴展
- 支援更多 Markdown 語法（表格、清單、引用等）
- 支援 Markdown 擴展語法（emoji、腳註等）
- 新增 LaTeX 數學公式支援
- 整合 DOMPurify 提升安全性
- 支援自訂 Markdown 規則
