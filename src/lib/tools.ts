import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Dices, Languages } from 'lucide-react'

export interface ToolMeta {
  slug: string
  name: string
  description: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  category: string
  Component: LazyExoticComponent<ComponentType>
}

export const tools: ToolMeta[] = [
  {
    slug: 'zh-converter',
    name: '簡繁中文轉換',
    description: '簡體與繁體中文即時互相轉換，雙欄對照顯示',
    icon: Languages,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    category: '文字工具',
    Component: lazy(() => import('@/tools/zh-converter/ZhConverter')),
  },
  {
    slug: 'dice-roller',
    name: '擲骰子',
    description: '選擇 1–5 顆骰子，享受滾動動畫並揭曉點數結果',
    icon: Dices,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    category: '趣味工具',
    Component: lazy(() => import('@/tools/dice-roller/DiceRoller')),
  },
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export const categories = Array.from(new Set(tools.map((tool) => tool.category)))
