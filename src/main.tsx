import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'

const isExport = window.location.pathname === '/export'

if (isExport) {
  import('./Export.tsx').then(({ default: ExportPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ExportPage />
      </StrictMode>,
    )
  })
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
