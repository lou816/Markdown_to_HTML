# MarkdownEditor 元件設計文件

## 元件概述
MarkdownEditor 是左側的 Markdown 文字輸入區域，提供使用者編輯 Markdown 的介面。

## 職責
- 提供文字輸入介面
- 即時回傳輸入內容給父元件
- 顯示輸入區標題和提示
- 提供良好的編輯體驗（行號、自動調整高度等）

## Props
```typescript
{
  value: string              // 當前的 Markdown 文字
  onChange: (text: string) => void  // 文字變更時的回調函式
}
```

## 狀態管理
- 無內部狀態（Controlled Component）
- 所有狀態由父元件 Layout 管理

## UI 設計
- 全高度 textarea
- 等寬字體（font-mono）
- 適當的 padding 和行高
- 淺色背景，深色文字
- 捲軸樣式優化

## 樣式規範
```css
容器：
  - bg-white border-r border-gray-300
  - flex flex-col

標題區：
  - px-6 py-4 border-b
  - bg-gray-50 flex items-center justify-between
  - 標題：text-lg font-semibold text-gray-800
  - 副標題：text-xs text-gray-500 mt-0.5

輸入區 (textarea)：
  - flex-1 w-full p-6
  - font-mono text-sm
  - resize-none outline-none
  - leading-relaxed
```

## 元件結構
```jsx
<div className="editor-container">
  <div className="editor-header">
    <h2>Markdown 編輯區</h2>
    <span className="hint">支援基本 Markdown 語法</span>
  </div>
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="在此輸入 Markdown..."
  />
</div>
```

## 使用者體驗優化
- 使用 `spellCheck={false}` 關閉拼字檢查（程式碼編輯）
- Tab 鍵插入空格而非跳離欄位
- 適當的行高（leading-relaxed）提升可讀性

## 未來擴展
- 新增 Markdown 語法快捷鈕（粗體、斜體、連結等）
- 新增行號顯示
- 新增語法高亮（使用 CodeMirror 或 Monaco Editor）
- 新增自動儲存到 localStorage
- 支援鍵盤快捷鍵（Ctrl+B 粗體等）
