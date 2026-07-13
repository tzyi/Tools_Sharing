import { useMemo, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const lines = text === '' ? 0 : text.split(/\n/).length
    const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length

    return { words, chars, charsNoSpaces, lines, paragraphs }
  }, [text])

  return (
    <div className="space-y-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="在這裡貼上或輸入文字..."
        className="min-h-64"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="字數" value={stats.words} />
        <StatCard label="字元數" value={stats.chars} />
        <StatCard label="字元數（不含空白）" value={stats.charsNoSpaces} />
        <StatCard label="行數" value={stats.lines} />
        <StatCard label="段落數" value={stats.paragraphs} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-muted-foreground text-sm">{label}</div>
      </CardContent>
    </Card>
  )
}
