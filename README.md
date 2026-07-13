# 小工具集合網站

React + TypeScript + Vite + shadcn/ui 打造的線上小工具集合，仿照 [tool.lifehacker.tw](https://tool.lifehacker.tw/) 的概念。

## 開發

```bash
npm install
npm run dev
```

## 如何新增一個小工具

1. 在 `src/tools/<工具名稱>/` 建立一個資料夾，寫一個預設匯出的 React 元件（例如 `src/tools/word-counter/WordCounter.tsx`）。
2. 到 `src/lib/tools.ts` 的 `tools` 陣列中新增一筆設定：

   ```ts
   {
     slug: 'my-tool',            // 網址路徑 /tools/my-tool
     name: '我的工具',
     description: '工具說明',
     icon: SomeLucideIcon,        // 從 lucide-react 匯入
     category: '分類名稱',
     Component: lazy(() => import('@/tools/my-tool/MyTool')),
   }
   ```

3. 存檔後首頁會自動出現新工具卡片，點擊即可進入 `/tools/my-tool` 頁面。

每個工具元件都是獨立 lazy-loaded 模組，彼此不互相影響，新增工具不需要改動其他工具的程式碼。

## 專案結構

```
src/
  components/       # 共用 UI（Layout、shadcn 元件）
  pages/            # 路由頁面（Home、ToolPage）
  tools/            # 各個小工具的實作，一個資料夾一個工具
  lib/tools.ts       # 工具註冊表
```

目前後端尚未建立；若未來有工具需要伺服器運算或資料儲存，規劃使用 Node.js + SQLite，屆時會新增 `server/` 目錄。
