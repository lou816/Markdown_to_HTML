# Header.jsx - 測試規範

## 元件職責
顯示應用程式標題和簡短說明。

---

## Props 規範
無（純展示元件）

---

## 測試項目

### 1. 渲染測試

- [ ] **H-1.1**：基本渲染
  - 測試：元件可正常渲染
  - 預期：顯示 header 元素

- [ ] **H-1.2**：標題顯示
  - 測試：顯示「Markdown to HTML Converter」
  - 預期：標題可見且正確

- [ ] **H-1.3**：副標題顯示
  - 測試：顯示副標題或說明文字
  - 預期：副標題可見

---

### 2. 樣式測試

- [ ] **H-2.1**：背景顏色
  - 檢查：使用漸層或深色背景
  - 檢查：與主內容區有視覺區隔

- [ ] **H-2.2**：文字顏色
  - 檢查：標題使用白色或淺色
  - 檢查：文字清晰可讀

- [ ] **H-2.3**：字體大小
  - 檢查：標題使用大字體（text-2xl 或 text-3xl）
  - 檢查：副標題使用較小字體（text-sm）

- [ ] **H-2.4**：間距
  - 檢查：有適當的 padding（py-4 px-6）
  - 檢查：高度約 64px

- [ ] **H-2.5**：陰影效果
  - 檢查：有 shadow-md 或類似效果
  - 檢查：提供深度感

---

### 3. 響應式測試

- [ ] **H-3.1**：桌面版（>1024px）
  - 檢查：標題字體大（text-3xl）
  - 檢查：佔全寬

- [ ] **H-3.2**：平板版（768-1024px）
  - 檢查：標題字體適中（text-2xl）
  - 檢查：佔全寬

- [ ] **H-3.3**：手機版（<768px）
  - 檢查：標題字體較小但清晰
  - 檢查：不換行或適當換行

---

### 4. 無障礙測試（選用）

- [ ] **H-4.1**：語意化 HTML
  - 檢查：使用 `<header>` 標籤
  - 檢查：標題使用 `<h1>` 標籤

- [ ] **H-4.2**：螢幕閱讀器
  - 測試：可正確讀取標題

---

## UI 規範

### 容器
```css
bg-gradient-to-r from-blue-600 to-purple-600
w-full py-4 px-6 shadow-md
```

### 標題
```css
text-2xl md:text-3xl font-bold text-white
```

### 副標題
```css
text-sm text-gray-200
```

---

## 完成標準

### 必須通過（MVP）
- 渲染測試（H-1.1 ~ H-1.3）
- 樣式測試（H-2.1 ~ H-2.5）
- 響應式測試（H-3.1 ~ H-3.3）

### 加分項目
- 無障礙測試（H-4.1 ~ H-4.2）

---

## 測試方法

**手動測試**：
1. 在瀏覽器中開啟應用程式
2. 檢查 header 顯示
3. 調整瀏覽器視窗大小測試響應式
4. 使用開發者工具檢查樣式

**自動化測試**（選用）：
```javascript
import { render, screen } from '@testing-library/react'
import Header from './Header'

test('H-1.2: 標題顯示', () => {
  render(<Header />)

  const title = screen.getByRole('heading', { level: 1 })
  expect(title).toHaveTextContent('Markdown to HTML Converter')
})
```

---

## 參考設計
見 `claude.md` 的完整設計規範。
