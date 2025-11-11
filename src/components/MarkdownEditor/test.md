# MarkdownEditor.jsx - 測試規範

## 元件職責
提供 Markdown 文字輸入介面，即時回傳輸入內容給父元件。

---

## Props 規範
```typescript
{
  value: string              // 當前的 Markdown 文字
  onChange: (text: string) => void  // 文字變更回調
}
```

---

## 測試項目

### 1. 渲染測試

- [ ] **ME-1.1**：基本渲染
  - 測試：元件可正常渲染
  - 預期：顯示 textarea

- [ ] **ME-1.2**：標題顯示
  - 測試：顯示「Markdown 編輯區」標題
  - 預期：標題可見

- [ ] **ME-1.3**：提示文字
  - 測試：有 placeholder 或提示
  - 預期：引導使用者輸入

---

### 2. Props 測試

- [ ] **ME-2.1**：接收 value
  - Props：`value="test"`
  - 預期：textarea 顯示 "test"

- [ ] **ME-2.2**：value 變更更新顯示
  - 操作：父元件更新 value
  - 預期：textarea 內容即時更新

- [ ] **ME-2.3**：onChange 觸發
  - 操作：在 textarea 輸入文字
  - 預期：呼叫 onChange 並傳遞新文字

---

### 3. 使用者互動測試

- [ ] **ME-3.1**：輸入文字
  - 操作：輸入 "Hello"
  - 預期：onChange 回傳 "Hello"

- [ ] **ME-3.2**：刪除文字
  - 操作：刪除已輸入的文字
  - 預期：onChange 回傳更新後的文字

- [ ] **ME-3.3**：貼上文字
  - 操作：貼上剪貼簿內容
  - 預期：onChange 正確回傳貼上的文字

- [ ] **ME-3.4**：多行輸入
  - 操作：輸入多行文字（按 Enter）
  - 預期：支援換行，正確回傳

---

### 4. 樣式測試

- [ ] **ME-4.1**：全高度顯示
  - 檢查：textarea 佔滿容器高度
  - 檢查：可正常捲動

- [ ] **ME-4.2**：等寬字體
  - 檢查：使用 `font-mono` 或等寬字體
  - 檢查：程式碼易於對齊

- [ ] **ME-4.3**：適當間距
  - 檢查：有 padding
  - 檢查：行高適中（leading-relaxed）

- [ ] **ME-4.4**：無 resize 控制桿
  - 檢查：`resize-none` 樣式生效
  - 檢查：無法手動調整大小

- [ ] **ME-4.5**：無 outline
  - 檢查：focus 時無藍色外框
  - 檢查：`outline-none` 生效

---

### 5. 響應式測試

- [ ] **ME-5.1**：桌面版（>1024px）
  - 檢查：佔左側 50% 寬度
  - 檢查：全高度顯示

- [ ] **ME-5.2**：平板版（768-1024px）
  - 檢查：佔適當寬度
  - 檢查：可正常使用

- [ ] **ME-5.3**：手機版（<768px）
  - 檢查：佔全寬
  - 檢查：文字可閱讀
  - 檢查：虛擬鍵盤不遮擋內容

---

### 6. 效能測試

- [ ] **ME-6.1**：大量文字輸入
  - 操作：輸入 1000 行文字
  - 預期：無明顯卡頓

- [ ] **ME-6.2**：快速連續輸入
  - 操作：快速打字
  - 預期：無輸入遺漏
  - 預期：onChange 正確觸發

---

### 7. 邊界測試

- [ ] **ME-7.1**：空 value
  - Props：`value=""`
  - 預期：顯示空 textarea（不崩潰）

- [ ] **ME-7.2**：null value
  - Props：`value={null}`
  - 預期：不崩潰（應處理或使用預設值）

- [ ] **ME-7.3**：超長文字
  - Props：`value="很長的文字..."`（10000+ 字元）
  - 預期：可正常顯示和捲動

---

### 8. 無障礙測試（選用）

- [ ] **ME-8.1**：鍵盤導航
  - 測試：可用 Tab 鍵 focus
  - 測試：可用 Shift+Tab 離開

- [ ] **ME-8.2**：螢幕閱讀器
  - 測試：有適當的 label 或 aria-label
  - 測試：螢幕閱讀器可讀取內容

---

## UI 規範

### 容器
```css
bg-white border-r border-gray-300 flex flex-col
```

### 標題區
```css
px-6 py-4 border-b bg-gray-50 flex items-center justify-between
標題：text-lg font-semibold text-gray-800
副標題：text-xs text-gray-500 mt-0.5
```

### Textarea
```css
flex-1 w-full p-6 font-mono text-sm resize-none outline-none leading-relaxed
```

---

## 完成標準

### 必須通過（MVP）
- 渲染測試（ME-1.1 ~ ME-1.3）
- Props 測試（ME-2.1 ~ ME-2.3）
- 使用者互動測試（ME-3.1 ~ ME-3.4）
- 樣式測試（ME-4.1 ~ ME-4.5）
- 響應式測試（ME-5.1 ~ ME-5.3）

### 加分項目
- 效能測試（ME-6.1 ~ ME-6.2）
- 邊界測試（ME-7.1 ~ ME-7.3）
- 無障礙測試（ME-8.1 ~ ME-8.2）

---

## 測試方法

**手動測試**：
1. 在瀏覽器中開啟應用程式
2. 在編輯區輸入測試案例
3. 使用開發者工具檢查 DOM 結構
4. 調整瀏覽器視窗大小測試響應式

**自動化測試**（選用）：
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import MarkdownEditor from './MarkdownEditor'

test('ME-3.1: 輸入文字', () => {
  const onChange = jest.fn()
  render(<MarkdownEditor value="" onChange={onChange} />)

  const textarea = screen.getByRole('textbox')
  fireEvent.change(textarea, { target: { value: 'Hello' } })

  expect(onChange).toHaveBeenCalledWith('Hello')
})
```

---

## 參考設計
見 `claude.md` 的完整設計規範。
