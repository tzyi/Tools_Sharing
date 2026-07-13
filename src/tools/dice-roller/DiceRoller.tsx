import { useEffect, useRef, useState } from 'react'
import { Dices } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'rolling' | 'done'

const MIN_DICE = 1
const MAX_DICE = 5
const ROLL_DURATION = 1600
const SHUFFLE_INTERVAL = 90

// 骰子每個點數對應的點位（3x3 格子索引）
const PIP_LAYOUT: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

function randomFace() {
  return Math.floor(Math.random() * 6) + 1
}

function DieFace({ value, rolling, delay }: { value: number; rolling: boolean; delay: number }) {
  const pips = PIP_LAYOUT[value] ?? []
  return (
    <div
      className={cn(
        'grid h-20 w-20 grid-cols-3 grid-rows-3 place-items-center rounded-2xl border border-slate-200 bg-white p-3 shadow-lg transition-transform sm:h-24 sm:w-24',
        rolling ? 'animate-dice-roll' : 'animate-dice-land',
      )}
      style={{ animationDelay: rolling ? `${delay}ms` : '0ms' }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-3 w-3 rounded-full sm:h-3.5 sm:w-3.5',
            pips.includes(i) ? 'bg-slate-800' : 'bg-transparent',
          )}
        />
      ))}
    </div>
  )
}

export default function DiceRoller() {
  const [count, setCount] = useState(2)
  const [faces, setFaces] = useState<number[]>([1, 1])
  const [phase, setPhase] = useState<Phase>('idle')
  const timersRef = useRef<number[]>([])

  useEffect(() => () => timersRef.current.forEach(clearInterval), [])

  const selectCount = (n: number) => {
    if (phase === 'rolling') return
    setCount(n)
    setFaces(Array.from({ length: n }, randomFace))
    setPhase('idle')
  }

  const roll = () => {
    if (phase === 'rolling') return
    setPhase('rolling')
    // 滾動期間快速切換點數，營造翻滾感
    const shuffle = window.setInterval(() => {
      setFaces(Array.from({ length: count }, randomFace))
    }, SHUFFLE_INTERVAL)
    const stop = window.setTimeout(() => {
      clearInterval(shuffle)
      setFaces(Array.from({ length: count }, randomFace))
      setPhase('done')
    }, ROLL_DURATION)
    timersRef.current = [shuffle, stop]
  }

  const total = faces.reduce((sum, f) => sum + f, 0)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <style>{`
        @keyframes dice-roll {
          0% { transform: rotate(0deg) translateY(0) scale(1); }
          25% { transform: rotate(90deg) translateY(-14px) scale(1.08); }
          50% { transform: rotate(180deg) translateY(0) scale(0.95); }
          75% { transform: rotate(270deg) translateY(-10px) scale(1.05); }
          100% { transform: rotate(360deg) translateY(0) scale(1); }
        }
        @keyframes dice-land {
          0% { transform: scale(1.25); }
          60% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .animate-dice-roll { animation: dice-roll 0.5s linear infinite; }
        .animate-dice-land { animation: dice-land 0.35s ease-out; }
      `}</style>

      <Card>
        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium text-slate-500">選擇骰子數量（{MIN_DICE}–{MAX_DICE} 顆）</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: MAX_DICE - MIN_DICE + 1 }, (_, i) => MIN_DICE + i).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => selectCount(n)}
                  disabled={phase === 'rolling'}
                  className={cn(
                    'h-11 w-11 rounded-xl border text-sm font-semibold transition-colors',
                    n === count
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600',
                    phase === 'rolling' && 'cursor-not-allowed opacity-60',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-32 flex-wrap items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
            {faces.map((value, i) => (
              <DieFace key={i} value={value} rolling={phase === 'rolling'} delay={i * 80} />
            ))}
          </div>

          <div className="space-y-4 text-center">
            <Button
              size="lg"
              onClick={roll}
              disabled={phase === 'rolling'}
              className="gap-2 bg-emerald-600 px-8 text-base hover:bg-emerald-700"
            >
              <Dices className={cn('h-5 w-5', phase === 'rolling' && 'animate-spin')} />
              {phase === 'rolling' ? '骰子滾動中…' : '開始擲骰子'}
            </Button>

            {phase === 'done' && (
              <div className="animate-dice-land space-y-1">
                <p className="text-sm text-slate-500">
                  骰出的點數：{faces.join('、')}
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  總和 {total} 點
                </p>
              </div>
            )}
            {phase === 'rolling' && (
              <p className="text-sm text-slate-400">命運正在滾動中，屏息以待…</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
