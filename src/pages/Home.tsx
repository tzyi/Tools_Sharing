import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { tools } from '@/lib/tools'

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-background to-background px-6 pb-20 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">PIZZA的</h1>
        <h1 className="mt-2 bg-gradient-to-r from-sky-500 via-teal-400 to-amber-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          實用小工具
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          免費使用，瀏覽器直接跑，不收集任何資料。
        </p>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${tool.iconBg} ${tool.iconColor}`}
              >
                <tool.icon className="h-7 w-7" />
              </span>

              <h3 className="text-lg font-bold">{tool.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              <Link
                to={`/tools/${tool.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700"
              >
                開始使用
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
