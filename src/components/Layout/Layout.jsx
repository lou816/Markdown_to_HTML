/**
 * Layout 元件
 * 管理應用程式的版面配置和狀態
 */

import { useState } from 'react'
import Header from '../Header/Header'
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor'
import HtmlPreview from '../HtmlPreview/HtmlPreview'

// 預設範例文字
const initialMarkdown = `# 歡迎使用 Markdown 編輯器

## 功能介紹
這是一個**即時預覽**的 Markdown 編輯器。

### 支援的語法

#### 1. 標題
使用 \`#\` 符號建立標題（支援 # 和 ##）

#### 2. 粗體與斜體
- **粗體文字** 使用 \`**text**\`
- _斜體文字_ 使用 \`_text_\` 或 \`*text*\`

#### 3. 程式碼區塊
\`\`\`javascript
function hello() {
  console.log('Hello World!')
}
\`\`\`

#### 4. 超連結
[點擊訪問 Google](https://www.google.com)

---

開始在左側編輯，右側將即時預覽結果！
`

function Layout() {
  // 管理 Markdown 文字狀態
  const [markdownText, setMarkdownText] = useState(initialMarkdown)

  // 處理文字變更
  const handleMarkdownChange = (newText) => {
    setMarkdownText(newText)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* 主要內容區：左右分欄 */}
      <div className="grid grid-cols-2 gap-0 h-[calc(100vh-64px)]">
        {/* 左側：Markdown 編輯區 */}
        <MarkdownEditor
          value={markdownText}
          onChange={handleMarkdownChange}
        />

        {/* 右側：HTML 預覽區 */}
        <HtmlPreview markdown={markdownText} />
      </div>
    </div>
  )
}

export default Layout
