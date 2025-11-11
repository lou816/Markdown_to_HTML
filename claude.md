# Markdown to HTML Converter - 專案全域設計文件

## 專案概述

基於面試要求開發的 Markdown 即時預覽編輯器，使用 React + Vite + Tailwind CSS 技術棧。

## 核心需求（來自 spec.document.xml）

### 功能需求
1. **React 開發**：使用 Vite 作為工具鏈
2. **左右分欄布局**：
   - 左側：Markdown 輸入區
   - 右側：HTML 即時預覽
3. **支援 Markdown 語法**：
   - 標題（# ~ ##）
   - 粗體與斜體（**bold**、_italic_）
   - 程式碼區塊（\`\`\`code\`\`\`）
   - 超連結（[text](url)）
4. **預覽區樣式**：使用 Tailwind CSS

### 技術約束
1. 可使用 AI 工具輔助開發
2. 必須使用 npm 套件進行 UI 優化

### 交付物
1. 程式碼
2. 線上 Demo（GitHub Pages）
3. README.md（包含專案簡介、AI 使用紀錄、品質判斷）

---

## 專案架構

```
src/
├── components/
│   ├── Header/              # 頂部導航
│   ├── Layout/              # 版面配置（狀態管理）
│   ├── MarkdownEditor/      # Markdown 輸入
│   └── HtmlPreview/         # HTML 預覽
├── utils/
│   └── markdownParser.js    # Markdown 轉換邏輯
├── App.jsx                  # 根元件
├── main.jsx                 # 入口
└── index.css                # 全域樣式
```

---

## 資料流設計

```
App
 └─> Layout (管理 markdownText 狀態)
      ├─> Header (純展示)
      ├─> MarkdownEditor (value, onChange)
      │    └─> 使用者輸入 → onChange → 更新 Layout 狀態
      └─> HtmlPreview (markdown)
           └─> parseMarkdown(markdown) → 渲染 HTML
```

---

## 專案級測試項目

### 1. Spec Document 符合性測試

#### 1.1 功能需求測試
- [ ] **FR-1**：使用 React + Vite 開發
  - 檢查：`package.json` 包含 react, vite
  - 檢查：專案可正常啟動 `npm run dev`

- [ ] **FR-2**：左右分欄布局
  - 檢查：桌面版顯示左右並排
  - 檢查：手機版顯示上下堆疊
  - 檢查：左側有 textarea 可輸入
  - 檢查：右側有預覽區域

- [ ] **FR-3a**：支援標題語法（# ~ ##）
  - 輸入：`# H1\n## H2`
  - 預期：渲染為 `<h1>H1</h1><h2>H2</h2>`

- [ ] **FR-3b**：支援粗體與斜體
  - 輸入：`**bold** _italic_`
  - 預期：渲染為 `<strong>bold</strong> <em>italic</em>`

- [ ] **FR-3c**：支援程式碼區塊
  - 輸入：\`\`\`javascript\ncode\n\`\`\`
  - 預期：渲染為語法高亮的程式碼區塊

- [ ] **FR-3d**：支援超連結
  - 輸入：`[text](url)`
  - 預期：渲染為 `<a href="url">text</a>`

- [ ] **FR-4**：預覽區有基本樣式
  - 檢查：使用 Tailwind CSS
  - 檢查：標題有適當字體大小
  - 檢查：連結有顏色區分

#### 1.2 技術約束測試
- [ ] **TC-1**：使用 AI 工具輔助開發
  - 檢查：README.md 有 AI 使用紀錄

- [ ] **TC-2**：使用 npm 套件進行 UI 優化
  - 檢查：`package.json` 包含 tailwindcss
  - 檢查：Tailwind 正確運作

#### 1.3 交付物測試
- [ ] **D-1**：程式碼完整
  - 檢查：所有元件都已實作（.jsx 檔案存在）
  - 檢查：無 console.error
  - 檢查：可正常 build（`npm run build`）

- [ ] **D-2**：線上 Demo
  - 檢查：GitHub Pages 部署成功
  - 檢查：Demo 可正常訪問
  - 檢查：Demo 功能完整運作

- [ ] **D-3**：README.md
  - 檢查：包含專案簡介
  - 檢查：包含 AI 工具使用紀錄
  - 檢查：包含 AI 品質判斷
  - 檢查：包含創新功能構想
  - 檢查：包含 AI 優缺點分析

---

### 2. 整合測試

#### 2.1 即時同步測試
- [ ] **IT-1**：輸入與預覽即時同步
  - 操作：在左側輸入任何文字
  - 預期：右側立即更新（無明顯延遲）

- [ ] **IT-2**：狀態管理正確
  - 操作：連續輸入多次
  - 預期：每次輸入都正確更新
  - 預期：無遺漏或重複更新

#### 2.2 響應式測試
- [ ] **IT-3**：桌面版布局（>1024px）
  - 檢查：左右並排顯示
  - 檢查：各佔 50% 寬度

- [ ] **IT-4**：平板版布局（768-1024px）
  - 檢查：左右並排或上下堆疊
  - 檢查：布局合理

- [ ] **IT-5**：手機版布局（<768px）
  - 檢查：上下堆疊
  - 檢查：文字可閱讀
  - 檢查：無水平捲軸

#### 2.3 效能測試
- [ ] **IT-6**：大量文字效能
  - 操作：輸入 1000 行文字
  - 預期：無明顯卡頓
  - 預期：預覽更新流暢

- [ ] **IT-7**：快速輸入效能
  - 操作：快速連續輸入
  - 預期：無輸入遺漏
  - 預期：預覽最終正確

---

### 3. 安全性測試

- [ ] **S-1**：XSS 防護
  - 輸入：`<script>alert('xss')</script>`
  - 預期：不執行腳本
  - 預期：顯示為純文字或過濾

- [ ] **S-2**：HTML 注入防護
  - 輸入：`<img src=x onerror=alert(1)>`
  - 預期：不執行惡意程式碼

---

### 4. 使用者體驗測試

- [ ] **UX-1**：預設範例文字
  - 檢查：首次載入有範例內容
  - 檢查：範例展示所有支援語法

- [ ] **UX-2**：錯誤處理
  - 操作：輸入無效語法
  - 預期：不崩潰
  - 預期：顯示合理內容

- [ ] **UX-3**：載入狀態
  - 檢查：頁面載入時無白屏
  - 檢查：有適當的載入提示

---

### 5. 瀏覽器相容性測試

- [ ] **BC-1**：Chrome 最新版
- [ ] **BC-2**：Firefox 最新版
- [ ] **BC-3**：Safari 最新版（Mac）
- [ ] **BC-4**：Edge 最新版

---

### 6. 建置與部署測試

- [ ] **BD-1**：開發環境
  - 指令：`npm run dev`
  - 預期：成功啟動
  - 預期：HMR 運作正常

- [ ] **BD-2**：生產建置
  - 指令：`npm run build`
  - 預期：無錯誤
  - 預期：產生 dist 目錄

- [ ] **BD-3**：預覽建置結果
  - 指令：`npm run preview`
  - 預期：可正常訪問
  - 預期：功能完整

- [ ] **BD-4**：GitHub Pages 部署
  - 檢查：GitHub Actions 執行成功
  - 檢查：可透過 URL 訪問
  - 檢查：功能正常運作

---

## 元件依賴關係

```
App.jsx
 └─ Layout.jsx
     ├─ Header.jsx（無依賴）
     ├─ MarkdownEditor.jsx（無依賴）
     └─ HtmlPreview.jsx
         └─ markdownParser.js
             ├─ marked（npm 套件）
             └─ highlight.js（npm 套件）
```

**開發順序建議**：
1. markdownParser.js（無依賴，核心邏輯）
2. MarkdownEditor.jsx（無依賴）
3. HtmlPreview.jsx（依賴 markdownParser）
4. Header.jsx（無依賴）
5. Layout.jsx（整合 2, 3, 4）
6. App.jsx（使用 Layout）

---

## 完成標準

### 最小可行產品（MVP）標準
所有 Spec Document 符合性測試通過（FR-1 ~ D-3）

### 完整版標準
- MVP 標準通過
- 整合測試通過（IT-1 ~ IT-7）
- 安全性測試通過（S-1 ~ S-2）
- 使用者體驗測試通過（UX-1 ~ UX-3）
- 建置與部署測試通過（BD-1 ~ BD-4）

### 優秀標準
- 完整版標準通過
- 瀏覽器相容性測試通過（BC-1 ~ BC-4）
- 所有元件測試通過（見各元件 test.md）
- 程式碼品質優良（無 console.error, 無 warning）

---

## 測試執行順序

1. **單元測試**：先測試各元件（見各元件 test.md）
2. **整合測試**：測試元件間互動（IT-1 ~ IT-7）
3. **系統測試**：測試整體功能（FR-1 ~ D-3）
4. **驗收測試**：對照 spec.document.xml 逐項檢查

---

## 風險與注意事項

### 高風險項目
1. **Markdown 轉換準確性**：需確保 marked 套件正確轉換所有語法
2. **XSS 安全性**：必須過濾 HTML 標籤
3. **效能問題**：大量文字時可能卡頓

### 緩解措施
1. 使用 marked 官方 API，參考文件
2. 使用 DOMPurify 或自訂過濾函式
3. 實作 debounce，避免頻繁更新

---

## 參考資源

- [Spec Document](./spec.document.xml)
- [Marked 官方文件](https://marked.js.org/)
- [Highlight.js 官方文件](https://highlightjs.org/)
- [Tailwind CSS 文件](https://tailwindcss.com/)
- [React 官方文件](https://react.dev/)

---

## 版本歷史

- **v1.0** (2025-11-10)：初始版本，定義專案架構與測試標準
