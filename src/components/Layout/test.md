# Layout.jsx - 測試規範

## 元件職責
管理應用程式的主要版面配置和狀態（markdownText），整合 Header、MarkdownEditor、HtmlPreview。

---

## Props 規範
```typescript
{
  children?: ReactNode  // 可選的子元件（目前未使用）
}
```

---

## 測試項目

### 1. 渲染測試

- [ ] **L-1.1**：基本渲染
  - 測試：元件可正常渲染
  - 預期：顯示完整布局

- [ ] **L-1.2**：Header 渲染
  - 測試：Header 元件正確渲染
  - 預期：頂部顯示 header

- [ ] **L-1.3**：MarkdownEditor 渲染
  - 測試：MarkdownEditor 正確渲染
  - 預期：左側顯示編輯區

- [ ] **L-1.4**：HtmlPreview 渲染
  - 測試：HtmlPreview 正確渲染
  - 預期：右側顯示預覽區

---

### 2. 狀態管理測試

- [ ] **L-2.1**：初始狀態
  - 測試：元件掛載時有預設 markdown 內容
  - 預期：編輯區和預覽區顯示範例文字

- [ ] **L-2.2**：狀態更新
  - 操作：在 MarkdownEditor 輸入文字
  - 預期：markdownText 狀態更新

- [ ] **L-2.3**：狀態傳遞
  - 測試：markdownText 傳遞給 HtmlPreview
  - 預期：HtmlPreview 接收到更新

---

### 3. 資料流測試

- [ ] **L-3.1**：單向資料流
  - 操作：MarkdownEditor 觸發 onChange
  - 預期：Layout 更新狀態 → HtmlPreview 更新

- [ ] **L-3.2**：編輯到預覽同步
  - 操作：在編輯區輸入 "# Title"
  - 預期：預覽區即時顯示 `<h1>Title</h1>`

- [ ] **L-3.3**：快速輸入同步
  - 操作：快速連續輸入
  - 預期：預覽正確同步最終內容

---

### 4. 布局測試

- [ ] **L-4.1**：左右分欄（桌面版）
  - 螢幕：>1024px
  - 預期：編輯區和預覽區並排顯示
  - 預期：各佔 50% 寬度

- [ ] **L-4.2**：上下堆疊（手機版）
  - 螢幕：<768px
  - 預期：編輯區和預覽區上下堆疊
  - 預期：各佔全寬

- [ ] **L-4.3**：高度分配
  - 檢查：內容區高度為 `calc(100vh - 64px)`
  - 檢查：扣除 header 高度

---

### 5. 響應式測試

- [ ] **L-5.1**：桌面版佈局（>1024px）
  - 檢查：使用 `grid-cols-2`
  - 檢查：50/50 分割

- [ ] **L-5.2**：平板版佈局（768-1024px）
  - 檢查：使用 `md:grid-cols-2`
  - 檢查：適當分割

- [ ] **L-5.3**：手機版佈局（<768px）
  - 檢查：單欄顯示
  - 檢查：無 `grid-cols-2`

---

### 6. 初始內容測試

- [ ] **L-6.1**：預設範例文字
  - 測試：首次載入有範例內容
  - 預期：展示所有支援的 Markdown 語法

- [ ] **L-6.2**：範例內容完整性
  - 檢查：包含標題範例（# ##）
  - 檢查：包含粗體範例（**text**）
  - 檢查：包含斜體範例（_text_）
  - 檢查：包含程式碼區塊範例
  - 檢查：包含超連結範例

---

### 7. 效能測試

- [ ] **L-7.1**：狀態更新效能
  - 操作：快速連續輸入
  - 預期：無明顯延遲

- [ ] **L-7.2**：重新渲染優化
  - 測試：使用 React DevTools 檢查
  - 預期：不必要的重新渲染最小化

---

### 8. 整合測試

- [ ] **L-8.1**：端到端流程
  - 操作：輸入 Markdown → 檢查預覽
  - 預期：完整流程無錯誤

- [ ] **L-8.2**：多次編輯
  - 操作：編輯 → 刪除 → 重新編輯
  - 預期：狀態正確管理

- [ ] **L-8.3**：清空內容
  - 操作：刪除所有文字
  - 預期：預覽顯示空白（不崩潰）

---

## 狀態設計

```javascript
const initialMarkdown = `# 歡迎使用 Markdown 編輯器

## 功能介紹
這是一個**即時預覽**的 Markdown 編輯器。

### 支援的語法
- 標題 (# ~ ##)
- **粗體** 和 _斜體_
- \`\`\`程式碼區塊\`\`\`
- [超連結](https://example.com)
`

const [markdownText, setMarkdownText] = useState(initialMarkdown)
```

---

## UI 規範

### 容器
```css
min-h-screen bg-gray-100 flex flex-col
```

### 內容區
```css
grid md:grid-cols-2 gap-0 h-[calc(100vh-64px)]
```

---

## 完成標準

### 必須通過（MVP）
- 渲染測試（L-1.1 ~ L-1.4）
- 狀態管理測試（L-2.1 ~ L-2.3）
- 資料流測試（L-3.1 ~ L-3.3）
- 布局測試（L-4.1 ~ L-4.3）
- 響應式測試（L-5.1 ~ L-5.3）
- 初始內容測試（L-6.1 ~ L-6.2）

### 加分項目
- 效能測試（L-7.1 ~ L-7.2）
- 整合測試（L-8.1 ~ L-8.3）

---

## 測試方法

**手動測試**：
1. 在瀏覽器中開啟應用程式
2. 測試編輯和預覽功能
3. 調整視窗大小測試響應式
4. 使用 React DevTools 檢查狀態

**自動化測試**（選用）：
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import Layout from './Layout'

test('L-3.2: 編輯到預覽同步', () => {
  render(<Layout />)

  const editor = screen.getByRole('textbox')
  fireEvent.change(editor, { target: { value: '# Title' } })

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title')
})
```

---

## 參考設計
見 `claude.md` 的完整設計規範。
