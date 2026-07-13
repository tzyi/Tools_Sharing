import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Languages, Ruler } from 'lucide-react'

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
    slug: 'unit-converter',
    name: '單位轉換器',
    description: '長度、重量、溫度等單位互相轉換',
    icon: Ruler,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    category: '轉換工具',
    Component: lazy(() => import('@/tools/unit-converter/UnitConverter')),
  },
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export const categories = Array.from(new Set(tools.map((tool) => tool.category)))
