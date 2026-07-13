import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getToolBySlug } from '@/lib/tools'

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = slug ? getToolBySlug(slug) : undefined

  if (!tool) {
    return (
      <div className="space-y-4 text-center">
        <p>找不到這個工具。</p>
        <Link to="/" className="text-primary underline">
          回首頁
        </Link>
      </div>
    )
  }

  const ToolComponent = tool.Component

  return (
    <div className="space-y-6">
      <Link to="/" className="text-muted-foreground flex items-center gap-1 text-sm hover:underline">
        <ArrowLeft className="h-4 w-4" />
        回首頁
      </Link>

      <div>
        <h1 className="text-2xl font-bold">{tool.name}</h1>
        <p className="text-muted-foreground">{tool.description}</p>
      </div>

      <Suspense fallback={<div className="text-muted-foreground">載入中...</div>}>
        <ToolComponent />
      </Suspense>
    </div>
  )
}
