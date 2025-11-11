/**
 * Header 元件
 * 應用程式頂部導航列
 */

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 w-full py-4 px-6 shadow-md">
      <h1 className="text-3xl font-bold text-white">
        Markdown to HTML Converter
      </h1>
      <p className="text-sm text-gray-200 mt-1">
        即時轉換 Markdown 為 HTML 預覽
      </p>
    </header>
  )
}

export default Header
