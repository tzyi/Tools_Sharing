import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import ToolPage from '@/pages/ToolPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/:slug" element={<ToolPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
