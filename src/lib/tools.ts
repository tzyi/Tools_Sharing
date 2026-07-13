import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'
import type { LucideIcon } from 'lucide-react'
import { FileText, Ruler } from 'lucide-react'

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
    slug: 'word-counter',
    name: '文字字數統計',
    description: '即時計算字數、字元數與段落數',
    icon: FileText,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    category: '文字工具',
    Component: lazy(() => import('@/tools/word-counter/WordCounter')),
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
