import { useMemo, useState } from 'react'
import * as OpenCC from 'opencc-js'
import { ArrowRightLeft, Check, Copy, Eraser } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Direction = 's2t' | 't2s'

const converters = {
  s2t: OpenCC.Converter({ from: 'cn', to: 'twp' }),
  t2s: OpenCC.Converter({ from: 'twp', to: 'cn' }),
}

const labels: Record<Direction, { from: string; to: string }> = {
  s2t: { from: '简体中文', to: '繁體中文' },
  t2s: { from: '繁體中文', to: '简体中文' },
}

export default function ZhConverter() {
  const [direction, setDirection] = useState<Direction>('s2t')
  const [source, setSource] = useState('')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => converters[direction](source), [direction, source])

  const swap = () => {
    setDirection((d) => (d === 's2t' ? 't2s' : 's2t'))
    setSource(result)
  }

  const copyResult = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-sky-50 via-white to-teal-50 shadow-xl shadow-sky-100/60">
      <CardContent className="p-0">
        {/* 語言切換列 */}
        <div className="flex items-center justify-center gap-4 border-b bg-white/70 px-6 py-4 backdrop-blur">
          <LangTab active>{labels[direction].from}</LangTab>

          <button
            onClick={swap}
            title="交換方向"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-md shadow-sky-200 transition-transform hover:scale-110 active:scale-95"
          >
            <ArrowRightLeft className="h-4 w-4 transition-transform group-hover:rotate-180" />
          </button>

          <LangTab active>{labels[direction].to}</LangTab>
        </div>

        {/* 雙欄面板 */}
        <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* 輸入 */}
          <div className="relative bg-white/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600">
                {labels[direction].from}
              </span>
              <button
                onClick={() => setSource('')}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground',
                  !source && 'invisible',
                )}
              >
                <Eraser className="h-3.5 w-3.5" />
                清除
              </button>
            </div>
            <Textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="在這裡輸入或貼上文字，立即轉換⋯"
              className="min-h-72 resize-none border-none bg-transparent p-0 text-base leading-relaxed shadow-none focus-visible:ring-0"
            />
            <div className="mt-2 text-right text-xs text-muted-foreground">{source.length} 字</div>
          </div>

          {/* 輸出 */}
          <div className="relative bg-gradient-to-br from-sky-50/80 to-teal-50/80 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                {labels[direction].to}
              </span>
              <button
                onClick={copyResult}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors',
                  copied
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-muted-foreground hover:bg-white hover:text-foreground',
                  !result && 'invisible',
                )}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? '已複製' : '複製'}
              </button>
            </div>
            <div className="min-h-72 whitespace-pre-wrap text-base leading-relaxed">
              {result || <span className="text-muted-foreground/60">轉換結果會即時顯示在這裡</span>}
            </div>
            <div className="mt-2 text-right text-xs text-muted-foreground">{result.length} 字</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LangTab({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'rounded-full px-5 py-2 text-sm font-semibold',
        active
          ? 'bg-gradient-to-r from-sky-100 to-teal-100 text-slate-800'
          : 'text-muted-foreground',
      )}
    >
      {children}
    </span>
  )
}
