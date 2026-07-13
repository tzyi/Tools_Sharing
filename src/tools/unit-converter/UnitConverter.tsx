import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type UnitDef = { label: string; toBase: number }
type Category = { label: string; units: Record<string, UnitDef> }

const categories: Record<string, Category> = {
  length: {
    label: '長度',
    units: {
      m: { label: '公尺 (m)', toBase: 1 },
      km: { label: '公里 (km)', toBase: 1000 },
      cm: { label: '公分 (cm)', toBase: 0.01 },
      mile: { label: '英里 (mi)', toBase: 1609.344 },
      ft: { label: '英尺 (ft)', toBase: 0.3048 },
    },
  },
  weight: {
    label: '重量',
    units: {
      kg: { label: '公斤 (kg)', toBase: 1 },
      g: { label: '公克 (g)', toBase: 0.001 },
      lb: { label: '磅 (lb)', toBase: 0.453592 },
      oz: { label: '盎司 (oz)', toBase: 0.0283495 },
    },
  },
}

export default function UnitConverter() {
  const [categoryKey, setCategoryKey] = useState('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('1')

  const category = categories[categoryKey]
  const units = Object.entries(category.units)

  const result = useMemo(() => {
    const num = parseFloat(value)
    if (Number.isNaN(num)) return ''
    const base = num * category.units[fromUnit].toBase
    const converted = base / category.units[toUnit].toBase
    return Number(converted.toFixed(6)).toString()
  }, [value, fromUnit, toUnit, category])

  return (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <Label>類別</Label>
        <select
          className="border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm"
          value={categoryKey}
          onChange={(e) => {
            const key = e.target.value
            setCategoryKey(key)
            const firstUnits = Object.keys(categories[key].units)
            setFromUnit(firstUnits[0])
            setToUnit(firstUnits[1] ?? firstUnits[0])
          }}
        >
          {Object.entries(categories).map(([key, c]) => (
            <option key={key} value={key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>數值</Label>
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>從</Label>
          <select
            className="border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {units.map(([key, u]) => (
              <option key={key} value={key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>到</Label>
          <select
            className="border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {units.map(([key, u]) => (
              <option key={key} value={key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-md border p-4 text-center">
        <div className="text-muted-foreground text-sm">結果</div>
        <div className="text-2xl font-semibold">{result || '—'}</div>
      </div>
    </div>
  )
}
