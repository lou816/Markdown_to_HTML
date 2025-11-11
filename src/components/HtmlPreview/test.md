# HtmlPreview.jsx - 測試規範

## 元件職責
接收 Markdown 文字，呼叫 parseMarkdown 轉換，並以樣式化的 HTML 呈現。

---

## Props 規範
```typescript
{
  markdown: string  // 要轉換的 Markdown 文字
}
```

---

## 測試項目

### 1. 渲染測試

- [ ] **HP-1.1**：基本渲染
  - 測試：元件可正常渲染
  - 預期：顯示預覽容器

- [ ] **HP-1.2**：標題顯示
  - 測試：顯示「HTML 預覽」標題
  - 預期：標題可見

- [ ] **HP-1.3**：空內容渲染
  - Props：`markdown=""`
  - 預期：顯示空預覽區（不崩潰）

---

### 2. Markdown 轉換測試

- [ ] **HP-2.1**：標題轉換
  - Props：`markdown="# H1\n## H2"`
  - 預期：渲染 `<h1>` 和 `<h2>` 標籤

- [ ] **HP-2.2**：粗體轉換
  - Props：`markdown="**bold**"`
  - 預期：渲染 `<strong>bold</strong>`

- [ ] **HP-2.3**：斜體轉換
  - Props：`markdown="_italic_"`
  - 預期：渲染 `<em>italic</em>`

- [ ] **HP-2.4**：程式碼區塊轉換
  - Props：`markdown="```js\ncode\n```"`
  - 預期：渲染語法高亮的程式碼區塊

- [ ] **HP-2.5**：超連結轉換
  - Props：`markdown="[link](url)"`
  - 預期：渲染 `<a href="url">link</a>`

---

### 3. 即時更新測試

- [ ] **HP-3.1**：Props 變更觸發更新
  - 操作：父元件更新 markdown prop
  - 預期：預覽內容即時更新

- [ ] **HP-3.2**：連續更新
  - 操作：快速連續更新 markdown
  - 預期：最終顯示最新內容

- [ ] **HP-3.3**：從空到有內容
  - 操作：從 `""` 更新為 `"# Title"`
  - 預期：正確渲染標題

- [ ] **HP-3.4**：從有到空內容
  - 操作：從 `"# Title"` 更新為 `""`
  - 預期：顯示空預覽

---

### 4. 樣式測試

- [ ] **HP-4.1**：標題樣式
  - 檢查：h1 有較大字體（text-3xl）
  - 檢查：h2 有適中字體（text-2xl）
  - 檢查：標題有粗體（font-bold）

- [ ] **HP-4.2**：粗體樣式
  - 檢查：`<strong>` 有 `font-bold`
  - 檢查：文字顏色深色（text-gray-900）

- [ ] **HP-4.3**：斜體樣式
  - 檢查：`<em>` 有 `italic`
  - 檢查：文字顏色（text-gray-700）

- [ ] **HP-4.4**：程式碼區塊樣式
  - 檢查：深色背景（bg-gray-900）
  - 檢查：白色文字（text-white）
  - 檢查：圓角（rounded-lg）
  - 檢查：語法高亮生效

- [ ] **HP-4.5**：超連結樣式
  - 檢查：藍色文字（text-blue-600）
  - 檢查：hover 效果（hover:text-blue-800）
  - 檢查：底線（underline）

- [ ] **HP-4.6**：段落樣式
  - 檢查：適當間距（mb-4）
  - 檢查：行高（leading-relaxed）

---

### 5. 響應式測試

- [ ] **HP-5.1**：桌面版（>1024px）
  - 檢查：佔右側 50% 寬度
  - 檢查：全高度顯示
  - 檢查：可正常捲動

- [ ] **HP-5.2**：平板版（768-1024px）
  - 檢查：佔適當寬度
  - 檢查：內容可閱讀

- [ ] **HP-5.3**：手機版（<768px）
  - 檢查：佔全寬
  - 檢查：字體大小適中
  - 檢查：無水平捲軸

---

### 6. 安全性測試

- [ ] **HP-6.1**：XSS 防護
  - Props：`markdown="<script>alert('xss')</script>"`
  - 預期：不執行腳本

- [ ] **HP-6.2**：HTML 注入防護
  - Props：`markdown="<img src=x onerror=alert(1)>"`
  - 預期：不執行惡意程式碼

- [ ] **HP-6.3**：dangerouslySetInnerHTML 安全性
  - 檢查：HTML 內容經過 sanitize
  - 檢查：無惡意標籤

---

### 7. 效能測試

- [ ] **HP-7.1**：大量內容渲染
  - Props：1000 行 Markdown
  - 預期：渲染時間 < 500ms

- [ ] **HP-7.2**：複雜 HTML 渲染
  - Props：包含多種語法的 Markdown
  - 預期：正確渲染所有元素

- [ ] **HP-7.3**：捲動效能
  - 操作：捲動大量內容
  - 預期：流暢，無卡頓

---

### 8. 邊界測試

- [ ] **HP-8.1**：null markdown
  - Props：`markdown={null}`
  - 預期：不崩潰（應處理或使用預設值）

- [ ] **HP-8.2**：undefined markdown
  - Props：`markdown={undefined}`
  - 預期：不崩潰

- [ ] **HP-8.3**：無效 Markdown
  - Props：語法錯誤的 Markdown
  - 預期：顯示合理輸出（不崩潰）

---

## UI 規範

### 容器
```css
bg-gray-50 flex flex-col
```

### 標題區
```css
px-6 py-4 border-b bg-white flex items-center justify-between
標題：text-lg font-semibold text-gray-800
副標題：text-xs text-gray-500 mt-0.5
```

### 內容區
```css
flex-1 p-6 overflow-y-auto prose prose-slate max-w-none
```

---

## 完成標準

### 必須通過（MVP）
- 渲染測試（HP-1.1 ~ HP-1.3）
- Markdown 轉換測試（HP-2.1 ~ HP-2.5）
- 即時更新測試（HP-3.1 ~ HP-3.4）
- 樣式測試（HP-4.1 ~ HP-4.6）
- 響應式測試（HP-5.1 ~ HP-5.3）
- 安全性測試（HP-6.1 ~ HP-6.3）

### 加分項目
- 效能測試（HP-7.1 ~ HP-7.3）
- 邊界測試（HP-8.1 ~ HP-8.3）

---

## 測試方法

**手動測試**：
1. 在 MarkdownEditor 輸入測試案例
2. 檢查 HtmlPreview 輸出
3. 使用瀏覽器開發者工具檢查 HTML 結構
4. 使用 Elements 面板驗證樣式

**自動化測試**（選用）：
```javascript
import { render, screen } from '@testing-library/react'
import HtmlPreview from './HtmlPreview'

test('HP-2.1: 標題轉換', () => {
  render(<HtmlPreview markdown="# H1 Title" />)

  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent('H1 Title')
})
```

---

## 參考設計
見 `claude.md` 的完整設計規範。
