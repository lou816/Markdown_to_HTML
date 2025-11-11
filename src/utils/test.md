# markdownParser.js - 測試規範

## 元件職責
將 Markdown 文字轉換為 HTML，支援標題、粗體、斜體、程式碼區塊、超連結。

---

## 測試項目

### 1. 基礎功能測試

#### 1.1 標題轉換（FR-3a）
- [ ] **MP-1.1.1**：H1 標題
  - 輸入：`# H1 Title`
  - 預期：`<h1>H1 Title</h1>`

- [ ] **MP-1.1.2**：H2 標題
  - 輸入：`## H2 Title`
  - 預期：`<h2>H2 Title</h2>`

- [ ] **MP-1.1.3**：多層級標題
  - 輸入：`# H1\n## H2`
  - 預期：正確渲染兩層標題

#### 1.2 粗體與斜體（FR-3b）
- [ ] **MP-1.2.1**：粗體（**）
  - 輸入：`**bold text**`
  - 預期：`<strong>bold text</strong>`

- [ ] **MP-1.2.2**：斜體（_）
  - 輸入：`_italic text_`
  - 預期：`<em>italic text</em>`

- [ ] **MP-1.2.3**：斜體（*）
  - 輸入：`*italic text*`
  - 預期：`<em>italic text</em>`

- [ ] **MP-1.2.4**：混合使用
  - 輸入：`**bold** and _italic_`
  - 預期：正確渲染粗體和斜體

#### 1.3 程式碼區塊（FR-3c）
- [ ] **MP-1.3.1**：行內程式碼
  - 輸入：\`code\`
  - 預期：`<code>code</code>`

- [ ] **MP-1.3.2**：程式碼區塊（無語言）
  - 輸入：\`\`\`\ncode\n\`\`\`
  - 預期：渲染為 `<pre><code>` 區塊

- [ ] **MP-1.3.3**：程式碼區塊（指定語言）
  - 輸入：\`\`\`javascript\nconst x = 1;\n\`\`\`
  - 預期：渲染並套用語法高亮

#### 1.4 超連結（FR-3d）
- [ ] **MP-1.4.1**：基本連結
  - 輸入：`[link text](https://example.com)`
  - 預期：`<a href="https://example.com">link text</a>`

- [ ] **MP-1.4.2**：帶標題的連結
  - 輸入：`[link](https://example.com "title")`
  - 預期：包含 title 屬性

---

### 2. 邊界測試

- [ ] **MP-2.1**：空字串
  - 輸入：`""`
  - 預期：回傳 `""`（不崩潰）

- [ ] **MP-2.2**：null/undefined
  - 輸入：`null` 或 `undefined`
  - 預期：回傳 `""`（不崩潰）

- [ ] **MP-2.3**：純文字（無 Markdown）
  - 輸入：`plain text`
  - 預期：包裹在 `<p>` 標籤中

- [ ] **MP-2.4**：特殊字元
  - 輸入：`< > & " '`
  - 預期：正確轉義 HTML 實體

---

### 3. 安全性測試

- [ ] **MP-3.1**：XSS 攻擊防護
  - 輸入：`<script>alert('xss')</script>`
  - 預期：不執行腳本，顯示為純文字或過濾

- [ ] **MP-3.2**：HTML 注入防護
  - 輸入：`<img src=x onerror=alert(1)>`
  - 預期：不執行惡意程式碼

- [ ] **MP-3.3**：事件處理器防護
  - 輸入：`<div onclick="alert(1)">text</div>`
  - 預期：過濾 onclick 等事件處理器

---

### 4. 效能測試

- [ ] **MP-4.1**：小文字（<100 字元）
  - 測試：轉換時間 < 10ms

- [ ] **MP-4.2**：中等文字（1000 字元）
  - 測試：轉換時間 < 50ms

- [ ] **MP-4.3**：大文字（10000 字元）
  - 測試：轉換時間 < 200ms

---

### 5. 錯誤處理測試

- [ ] **MP-5.1**：語法錯誤處理
  - 輸入：不完整的 Markdown 語法
  - 預期：不崩潰，顯示合理輸出

- [ ] **MP-5.2**：錯誤回傳
  - 測試：轉換失敗時有適當錯誤訊息
  - 測試：不會回傳 undefined

---

## API 規範

```javascript
/**
 * 將 Markdown 文字轉換為 HTML
 * @param {string} markdown - Markdown 文字
 * @returns {string} HTML 字串
 */
export function parseMarkdown(markdown)
```

---

## 完成標準

### 必須通過（MVP）
- 所有基礎功能測試（MP-1.1.1 ~ MP-1.4.2）
- 邊界測試（MP-2.1 ~ MP-2.4）
- 安全性測試（MP-3.1 ~ MP-3.3）

### 加分項目
- 效能測試（MP-4.1 ~ MP-4.3）
- 錯誤處理測試（MP-5.1 ~ MP-5.2）

---

## 測試工具

**手動測試**：
1. 在 MarkdownEditor 輸入測試案例
2. 檢查 HtmlPreview 輸出
3. 使用瀏覽器開發者工具檢查 HTML 結構

**自動化測試**（選用）：
- Jest + React Testing Library
- 建立 `markdownParser.test.js`

---

## 已知問題與限制

1. 僅支援基本 Markdown 語法（符合 spec）
2. 不支援表格、清單等進階語法
3. 語法高亮依賴 highlight.js

---

## 參考資源

- [Marked.js 文件](https://marked.js.org/)
- [Highlight.js 文件](https://highlightjs.org/)
- [CommonMark Spec](https://commonmark.org/)
