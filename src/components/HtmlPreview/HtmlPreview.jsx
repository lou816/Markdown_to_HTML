/**
 * HtmlPreview 元件
 * 接收 Markdown 文字，轉換並顯示為 HTML
 */

import { useMemo } from 'react'
import { parseMarkdown } from '../../utils/markdownParser'

// 導入 highlight.js 樣式
import 'highlight.js/styles/github-dark.css'

function HtmlPreview({ markdown }) {
  // 使用 useMemo 優化效能，避免重複轉換相同內容
  const htmlContent = useMemo(() => {
    if (!markdown) return ''
    return parseMarkdown(markdown)
  }, [markdown])

  return (
    <div className="bg-gray-50 flex flex-col">
      {/* 標題區 */}
      <div className="px-6 py-4 border-b bg-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">HTML 預覽</h2>
          <p className="text-xs text-gray-500 mt-0.5">即時顯示轉換結果</p>
        </div>
      </div>

      {/* 內容區 */}
      <div
        className="flex-1 p-6 overflow-y-auto prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        aria-live="polite"
      />
    </div>
  )
}

export default HtmlPreview
