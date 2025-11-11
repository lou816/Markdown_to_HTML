/**
 * MarkdownEditor 元件
 * 提供 Markdown 文字輸入介面
 */

function MarkdownEditor({ value, onChange }) {
  // 處理輸入變更
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div className="bg-white border-r border-gray-300 flex flex-col">
      {/* 標題區 */}
      <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Markdown 編輯區</h2>
          <p className="text-xs text-gray-500 mt-0.5">支援基本 Markdown 語法</p>
        </div>
      </div>

      {/* 輸入區 */}
      <textarea
        className="flex-1 w-full p-6 font-mono text-sm resize-none outline-none leading-relaxed text-gray-800 focus:ring-0"
        value={value || ''}
        onChange={handleChange}
        placeholder="在此輸入 Markdown...

範例：
# 標題
## 副標題
**粗體** 和 _斜體_
```javascript
const code = 'Hello World'
```
[超連結](https://example.com)"
        spellCheck={false}
        aria-label="Markdown 編輯器"
      />
    </div>
  )
}

export default MarkdownEditor
