import { Link, Outlet } from 'react-router-dom'
import { Mountain, Coffee } from 'lucide-react'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-teal-100 text-teal-600">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold">PIZZA實用工具集</span>
              <span className="text-xs text-muted-foreground">一頁讓你省時省力</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">關於</a>
            <a href="#social" className="transition-colors hover:text-foreground">社群媒體</a>
          </nav>

          <a
            href="#support"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
          >
            <Coffee className="h-4 w-4" />
            請喝咖啡
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        PIZZA實用工具集 | @2026
      </footer>
    </div>
  )
}
