# Layout 元件設計文件

## 元件概述
Layout 是應用程式的主要版面配置元件，負責管理左右分欄的響應式布局。

## 職責
- 建立左右分欄結構（編輯區 + 預覽區）
- 響應式設計：桌面版並排，手機版上下堆疊
- 管理 Markdown 文字的狀態
- 在子元件間傳遞資料

## Props
```typescript
{
  children?: ReactNode  // 可選的子元件
}
```

## 狀態管理
```javascript
const [markdownText, setMarkdownText] = useState(initialMarkdown)

// initialMarkdown 提供預設範例文字
const initialMarkdown = `# 歡迎使用 Markdown 編輯器

## 功能介紹
這是一個**即時預覽**的 Markdown 編輯器。

### 支援的語法
- 標題 (# ~ ##)
- **粗體** 和 _斜體_
- \`\`\`程式碼區塊\`\`\`
- [超連結](https://example.com)
`
```

## UI 設計
- 使用 CSS Grid 或 Flexbox
- 桌面版：50/50 分割
- 平板版：40/60 或 60/40 可調
- 手機版：上下堆疊

## 響應式斷點
```css
- Mobile: < 768px (上下堆疊)
- Tablet: 768px - 1024px (彈性比例)
- Desktop: > 1024px (固定 50/50)
```

## 元件結構
```jsx
<div className="grid md:grid-cols-2 gap-0 h-[calc(100vh-64px)]">
  <MarkdownEditor
    value={markdownText}
    onChange={setMarkdownText}
  />
  <HtmlPreview
    markdown={markdownText}
  />
</div>
```

## 資料流
```
Layout (管理狀態 markdownText)
  ├─> MarkdownEditor (接收 value, 發送 onChange)
  └─> HtmlPreview (接收 markdown, 轉換並顯示)
```

## 未來擴展
- 新增可拖拉分割線調整比例
- 新增全螢幕模式（只顯示編輯區或預覽區）
- 儲存用戶的版面偏好到 localStorage
