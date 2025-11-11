/**
 * Markdown to HTML Parser
 * 使用 marked 和 highlight.js 轉換 Markdown 為 HTML
 */

import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import DOMPurify from 'dompurify'

// 導入常用語言
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

// 註冊語言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('c++', cpp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('xml', html)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)

// 設定 marked
marked.setOptions({
  breaks: true,      // 支援 GFM 換行
  gfm: true,         // 啟用 GitHub Flavored Markdown
  headerIds: false,  // 不產生 header id
})

// 自訂 renderer
const renderer = new marked.Renderer()

/**
 * 驗證 URL 協議是否安全
 * @param {string} url - 要驗證的 URL
 * @returns {boolean} 是否為安全的 URL
 */
function isValidUrl(url) {
  if (!url) return false

  // 允許的協議白名單
  const allowedProtocols = ['http:', 'https:', 'mailto:']

  try {
    // 處理相對路徑
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return true
    }

    // 處理絕對 URL
    const parsed = new URL(url)
    return allowedProtocols.includes(parsed.protocol)
  } catch {
    // URL 解析失敗，視為不安全
    return false
  }
}

// 禁止原生 HTML（安全性防護）
renderer.html = () => {
  return '' // 完全移除原生 HTML
}

// 自訂程式碼區塊渲染（語法高亮）
renderer.code = (code, language) => {
  // 檢查語言是否有效
  const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext'

  try {
    // 如果是 plaintext，不高亮
    if (validLanguage === 'plaintext') {
      return `<pre class="hljs bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"><code>${escapeHtml(code)}</code></pre>`
    }

    // 語法高亮
    const highlighted = hljs.highlight(code, { language: validLanguage }).value

    return `<pre class="hljs bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"><code class="language-${validLanguage}">${highlighted}</code></pre>`
  } catch (err) {
    // 高亮失敗時返回原始程式碼
    return `<pre class="hljs bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"><code>${escapeHtml(code)}</code></pre>`
  }
}

// 自訂連結渲染（新視窗開啟 + target="_blank" + URL 驗證）
renderer.link = (href, title, text) => {
  // 驗證 URL 協議
  if (!isValidUrl(href)) {
    // 不安全的 URL，回傳純文字
    return `<span class="text-gray-500">${text}</span>`
  }

  const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
  return `<a href="${escapeHtml(href)}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${text}</a>`
}

// 自訂標題渲染
renderer.heading = (text, level) => {
  const sizes = {
    1: 'text-3xl font-bold mb-4 text-gray-900',
    2: 'text-2xl font-bold mb-3 text-gray-800',
    3: 'text-xl font-semibold mb-2 text-gray-700',
  }
  const className = sizes[level] || 'text-lg font-semibold mb-2 text-gray-700'
  return `<h${level} class="${className}">${text}</h${level}>`
}

// 自訂段落渲染
renderer.paragraph = (text) => {
  return `<p class="mb-4 leading-relaxed text-gray-700">${text}</p>`
}

// 自訂行內程式碼渲染
renderer.codespan = (code) => {
  return `<code class="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-gray-800">${escapeHtml(code)}</code>`
}

// 自訂粗體渲染
renderer.strong = (text) => {
  return `<strong class="font-bold text-gray-900">${text}</strong>`
}

// 自訂斜體渲染
renderer.em = (text) => {
  return `<em class="italic text-gray-700">${text}</em>`
}

// 自訂圖片渲染（URL 驗證）
renderer.image = (href, title, text) => {
  // 驗證圖片 URL 協議
  if (!isValidUrl(href)) {
    // 不安全的 URL，回傳 alt 文字
    return `<span class="text-gray-500">[圖片: ${escapeHtml(text)}]</span>`
  }

  const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
  const altAttr = text ? ` alt="${escapeHtml(text)}"` : ' alt=""'
  return `<img src="${escapeHtml(href)}"${altAttr}${titleAttr} class="max-w-full h-auto rounded">`
}

// 使用自訂 renderer
marked.use({ renderer })

/**
 * HTML 特殊字元轉義
 * @param {string} text - 要轉義的文字
 * @returns {string} 轉義後的文字
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * 使用 DOMPurify 清理 HTML，移除潛在的危險內容
 * @param {string} html - 要清理的 HTML
 * @returns {string} 清理後的 HTML
 */
function sanitizeHtml(html) {
  if (!html) return ''

  // 使用 DOMPurify 進行安全清理
  return DOMPurify.sanitize(html, {
    // 允許的標籤白名單
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br',
      'strong', 'em', 'code', 'pre',
      'a', 'img',
      'ul', 'ol', 'li',
      'blockquote',
      'span', 'div'
    ],
    // 允許的屬性白名單
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'rel',
      'src', 'alt',
      'class'
    ],
    // 允許的 URL 協議（與 isValidUrl 一致）
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):|^[/.]/i,
    // 允許的 CSS class 前綴（Tailwind + highlight.js）
    ALLOW_DATA_ATTR: false,
    // 保留安全的內聯樣式（語法高亮需要）
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  })
}

/**
 * 將 Markdown 文字轉換為 HTML
 * @param {string} markdown - Markdown 文字
 * @returns {string} HTML 字串
 */
export function parseMarkdown(markdown) {
  try {
    // 處理 null、undefined 或非字串輸入
    if (!markdown || typeof markdown !== 'string') {
      return ''
    }

    // 處理空字串
    if (markdown.trim() === '') {
      return ''
    }

    // 使用 marked 轉換
    const rawHtml = marked.parse(markdown)

    // 清理並確保安全性
    const cleanHtml = sanitizeHtml(rawHtml)

    return cleanHtml
  } catch (error) {
    console.error('Markdown 轉換錯誤:', error)
    return '<p class="text-red-600">轉換失敗，請檢查 Markdown 語法</p>'
  }
}

export default parseMarkdown
