# Header 元件設計文件

## 元件概述
Header 是應用程式的頂部導航列，顯示應用程式標題和簡短說明。

## 職責
- 顯示應用程式名稱
- 提供視覺上的頁面分隔
- 可選：顯示工具列按鈕（清除、匯出等）

## Props
無（純展示元件）

## 狀態管理
無內部狀態

## UI 設計
- 使用 Tailwind CSS 設計
- 背景色：深色系（bg-gray-800 或 bg-blue-600）
- 文字：白色，大字體
- 高度：固定高度（約 64px）
- 陰影效果：提供深度感

## 樣式規範
```css
- 容器：w-full, py-4, px-6, shadow-md
- 標題：text-2xl md:text-3xl, font-bold, text-white
- 副標題：text-sm, text-gray-200
```

## 範例結構
```jsx
<header className="bg-gradient-to-r from-blue-600 to-purple-600">
  <div className="container mx-auto">
    <h1>Markdown to HTML Converter</h1>
    <p>即時轉換 Markdown 為 HTML 預覽</p>
  </div>
</header>
```

## 未來擴展
- 新增主題切換按鈕（深色/淺色模式）
- 新增匯出 HTML 功能按鈕
- 新增設定選單
